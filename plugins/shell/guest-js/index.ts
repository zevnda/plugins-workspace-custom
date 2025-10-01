// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

/**
 * Access the system shell.
 * Allows you to spawn child processes and manage files and URLs using their default application.
 *
 * ## Security
 *
 * This API has a scope configuration that forces you to restrict the programs and arguments that can be used.
 *
 * ### Restricting access to the {@link open | `open`} API
 *
 * On the configuration object, `open: true` means that the {@link open} API can be used with any URL,
 * as the argument is validated with the `^((mailto:\w+)|(tel:\w+)|(https?://\w+)).+` regex.
 * You can change that regex by changing the boolean value to a string, e.g. `open: ^https://github.com/`.
 *
 * ### Restricting access to the {@link Command | `Command`} APIs
 *
 * The plugin permissions object has a `scope` field that defines an array of CLIs that can be used.
 * Each CLI is a configuration object `{ name: string, cmd: string, sidecar?: bool, args?: boolean | Arg[] }`.
 *
 * - `name`: the unique identifier of the command, passed to the {@link Command.create | Command.create function}.
 * If it's a sidecar, this must be the value defined on `tauri.conf.json > bundle > externalBin`.
 * - `cmd`: the program that is executed on this configuration. If it's a sidecar, this value is ignored.
 * - `sidecar`: whether the object configures a sidecar or a system program.
 * - `args`: the arguments that can be passed to the program. By default no arguments are allowed.
 *   - `true` means that any argument list is allowed.
 *   - `false` means that no arguments are allowed.
 *   - otherwise an array can be configured. Each item is either a string representing the fixed argument value
 *     or a `{ validator: string }` that defines a regex validating the argument value.
 *
 * #### Example scope configuration
 *
 * CLI: `git commit -m "the commit message"`
 *
 * Capability:
 * ```json
 * {
 *   "permissions": [
 *     {
 *       "identifier": "shell:allow-execute",
 *       "allow": [
 *         {
 *           "name": "run-git-commit",
 *           "cmd": "git",
 *           "args": ["commit", "-m", { "validator": "\\S+" }]
 *         }
 *       ]
 *     }
 *   ]
 * }
 * ```
 * Usage:
 * ```typescript
 * import { Command } from '@tauri-apps/plugin-shell'
 * Command.create('run-git-commit', ['commit', '-m', 'the commit message'])
 * ```
 *
 * Trying to execute any API with a program not configured on the scope results in a promise rejection due to denied access.
 *
 * @module
 */

import { invoke, Channel } from '@tauri-apps/api/core'

/**
 * @since 2.0.0
 */
interface SpawnOptions {
  /** Current working directory. */
  cwd?: string
  /** Environment variables. set to `null` to clear the process env. */
  env?: Record<string, string>
  /**
   * Character encoding for stdout/stderr
   *
   * @since 2.0.0
   *  */
  encoding?: string
}

/** @ignore */
interface InternalSpawnOptions extends SpawnOptions {
  sidecar?: boolean
}

/**
 * @since 2.0.0
 */
interface ChildProcess<O extends IOPayload> {
  /** Exit code of the process. `null` if the process was terminated by a signal on Unix. */
  code: number | null
  /** If the process was terminated by a signal, represents that signal. */
  signal: number | null
  /** The data that the process wrote to `stdout`. */
  stdout: O
  /** The data that the process wrote to `stderr`. */
  stderr: O
}

/**
 * @since 2.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class EventEmitter<E extends Record<string, any>> {
  /** @ignore */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  private eventListeners: Record<keyof E, Array<(arg: any) => void>> =
    Object.create(null)

  /**
   * Alias for `emitter.on(eventName, listener)`.
   *
   * @since 2.0.0
   */
  addListener<N extends keyof E>(
    eventName: N,
    listener: (arg: E[typeof eventName]) => void
  ): this {
    return this.on(eventName, listener)
  }

  /**
   * Alias for `emitter.off(eventName, listener)`.
   *
   * @since 2.0.0
   */
  removeListener<N extends keyof E>(
    eventName: N,
    listener: (arg: E[typeof eventName]) => void
  ): this {
    return this.off(eventName, listener)
  }

  /**
   * Adds the `listener` function to the end of the listeners array for the
   * event named `eventName`. No checks are made to see if the `listener` has
   * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
   * times.
   *
   * Returns a reference to the `EventEmitter`, so that calls can be chained.
   *
   * @since 2.0.0
   */
  on<N extends keyof E>(
    eventName: N,
    listener: (arg: E[typeof eventName]) => void
  ): this {
    if (eventName in this.eventListeners) {
      // eslint-disable-next-line security/detect-object-injection
      this.eventListeners[eventName].push(listener)
    } else {
      // eslint-disable-next-line security/detect-object-injection
      this.eventListeners[eventName] = [listener]
    }
    return this
  }

  /**
   * Adds a **one-time**`listener` function for the event named `eventName`. The
   * next time `eventName` is triggered, this listener is removed and then invoked.
   *
   * Returns a reference to the `EventEmitter`, so that calls can be chained.
   *
   * @since 2.0.0
   */
  once<N extends keyof E>(
    eventName: N,
    listener: (arg: E[typeof eventName]) => void
  ): this {
    const wrapper = (arg: E[typeof eventName]): void => {
      this.removeListener(eventName, wrapper)
      listener(arg)
    }
    return this.addListener(eventName, wrapper)
  }

  /**
   * Removes the all specified listener from the listener array for the event eventName
   * Returns a reference to the `EventEmitter`, so that calls can be chained.
   *
   * @since 2.0.0
   */
  off<N extends keyof E>(
    eventName: N,
    listener: (arg: E[typeof eventName]) => void
  ): this {
    if (eventName in this.eventListeners) {
      // eslint-disable-next-line security/detect-object-injection
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(
        (l) => l !== listener
      )
    }
    return this
  }

  /**
   * Removes all listeners, or those of the specified eventName.
   *
   * Returns a reference to the `EventEmitter`, so that calls can be chained.
   *
   * @since 2.0.0
   */
  removeAllListeners<N extends keyof E>(event?: N): this {
    if (event) {
      // eslint-disable-next-line security/detect-object-injection
      delete this.eventListeners[event]
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.eventListeners = Object.create(null)
    }
    return this
  }

  /**
   * @ignore
   * Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
   * to each.
   *
   * @returns `true` if the event had listeners, `false` otherwise.
   *
   * @since 2.0.0
   */
  emit<N extends keyof E>(eventName: N, arg: E[typeof eventName]): boolean {
    if (eventName in this.eventListeners) {
      // eslint-disable-next-line security/detect-object-injection
      const listeners = this.eventListeners[eventName]
      for (const listener of listeners) listener(arg)
      return true
    }
    return false
  }

  /**
   * Returns the number of listeners listening to the event named `eventName`.
   *
   * @since 2.0.0
   */
  listenerCount<N extends keyof E>(eventName: N): number {
    if (eventName in this.eventListeners)
      // eslint-disable-next-line security/detect-object-injection
      return this.eventListeners[eventName].length
    return 0
  }

  /**
   * Adds the `listener` function to the _beginning_ of the listeners array for the
   * event named `eventName`. No checks are made to see if the `listener` has
   * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
   * times.
   *
   * Returns a reference to the `EventEmitter`, so that calls can be chained.
   *
   * @since 2.0.0
   */
  prependListener<N extends keyof E>(
    eventName: N,
    listener: (arg: E[typeof eventName]) => void
  ): this {
    if (eventName in this.eventListeners) {
      // eslint-disable-next-line security/detect-object-injection
      this.eventListeners[eventName].unshift(listener)
    } else {
      // eslint-disable-next-line security/detect-object-injection
      this.eventListeners[eventName] = [listener]
    }
    return this
  }

  /**
   * Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
   * listener is removed, and then invoked.
   *
   * Returns a reference to the `EventEmitter`, so that calls can be chained.
   *
   * @since 2.0.0
   */
  prependOnceListener<N extends keyof E>(
    eventName: N,
    listener: (arg: E[typeof eventName]) => void
  ): this {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrapper = (arg: any): void => {
      this.removeListener(eventName, wrapper)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      listener(arg)
    }
    return this.prependListener(eventName, wrapper)
  }
}

/**
 * @since 2.0.0
 */
class Child {
  /** The child process `pid`. */
  pid: number

  constructor(pid: number) {
    this.pid = pid
  }

  /**
   * Writes `data` to the `stdin`.
   *
   * @param data The message to write, either a string or a byte array.
   * @example
   * ```typescript
   * import { Command } from '@tauri-apps/plugin-shell';
   * const command = Command.create('node');
   * const child = await command.spawn();
   * await child.write('message');
   * await child.write([0, 1, 2, 3, 4, 5]);
   * ```
   *
   * @returns A promise indicating the success or failure of the operation.
   *
   * @since 2.0.0
   */
  async write(data: IOPayload | number[]): Promise<void> {
    await invoke('plugin:shell|stdin_write', {
      pid: this.pid,
      buffer: data
    })
  }

  /**
   * Kills the child process.
   *
   * @returns A promise indicating the success or failure of the operation.
   *
   * @since 2.0.0
   */
  async kill(): Promise<void> {
    await invoke('plugin:shell|kill', {
      cmd: 'killChild',
      pid: this.pid
    })
  }
}

interface CommandEvents {
  close: TerminatedPayload
  error: string
}

interface OutputEvents<O extends IOPayload> {
  data: O
}

/**
 * The entry point for spawning child processes.
 * It emits the `close` and `error` events.
 * @example
 * ```typescript
 * import { Command } from '@tauri-apps/plugin-shell';
 * const command = Command.create('node');
 * command.on('close', data => {
 *   console.log(`command finished with code ${data.code} and signal ${data.signal}`)
 * });
 * command.on('error', error => console.error(`command error: "${error}"`));
 * command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
 * command.stderr.on('data', line => console.log(`command stderr: "${line}"`));
 *
 * const child = await command.spawn();
 * console.log('pid:', child.pid);
 * ```
 *
 * @since 2.0.0
 *
 */
class Command<O extends IOPayload> extends EventEmitter<CommandEvents> {
  /** @ignore Program to execute. */
  private readonly program: string
  /** @ignore Program arguments */
  private readonly args: string[]
  /** @ignore Spawn options. */
  private readonly options: InternalSpawnOptions
  /** Event emitter for the `stdout`. Emits the `data` event. */
  readonly stdout = new EventEmitter<OutputEvents<O>>()
  /** Event emitter for the `stderr`. Emits the `data` event. */
  readonly stderr = new EventEmitter<OutputEvents<O>>()

  /**
   * @ignore
   * Creates a new `Command` instance.
   *
   * @param program The program name to execute.
   * It must be configured in your project's capabilities.
   * @param args Program arguments.
   * @param options Spawn options.
   */
  private constructor(
    program: string,
    args: string | string[] = [],
    options?: SpawnOptions
  ) {
    super()
    this.program = program
    this.args = typeof args === 'string' ? [args] : args
    this.options = options ?? {}
  }

  static create(program: string, args?: string | string[]): Command<string>
  static create(
    program: string,
    args?: string | string[],
    options?: SpawnOptions & { encoding: 'raw' }
  ): Command<Uint8Array>
  static create(
    program: string,
    args?: string | string[],
    options?: SpawnOptions
  ): Command<string>

  /**
   * Creates a command to execute the given program.
   * @example
   * ```typescript
   * import { Command } from '@tauri-apps/plugin-shell';
   * const command = Command.create('my-app', ['run', 'tauri']);
   * const output = await command.execute();
   * ```
   *
   * @param program The program to execute.
   * It must be configured in your project's capabilities.
   */
  static create<O extends IOPayload>(
    program: string,
    args: string | string[] = [],
    options?: SpawnOptions
  ): Command<O> {
    return new Command(program, args, options)
  }

  static sidecar(program: string, args?: string | string[]): Command<string>
  static sidecar(
    program: string,
    args?: string | string[],
    options?: SpawnOptions & { encoding: 'raw' }
  ): Command<Uint8Array>
  static sidecar(
    program: string,
    args?: string | string[],
    options?: SpawnOptions
  ): Command<string>

  /**
   * Creates a command to execute the given sidecar program.
   * @example
   * ```typescript
   * import { Command } from '@tauri-apps/plugin-shell';
   * const command = Command.sidecar('my-sidecar');
   * const output = await command.execute();
   * ```
   *
   * @param program The program to execute.
   * It must be configured in your project's capabilities.
   */
  static sidecar<O extends IOPayload>(
    program: string,
    args: string | string[] = [],
    options?: SpawnOptions
  ): Command<O> {
    const instance = new Command<O>(program, args, options)
    instance.options.sidecar = true
    return instance
  }

  /**
   * Executes the command as a child process, returning a handle to it.
   *
   * @returns A promise resolving to the child process handle.
   *
   * @since 2.0.0
   */
  async spawn(): Promise<Child> {
    const program = this.program
    const args = this.args
    const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }

    const onEvent = new Channel<CommandEvent<O>>()
    onEvent.onmessage = (event) => {
      switch (event.event) {
        case 'Error':
          this.emit('error', event.payload)
          break
        case 'Terminated':
          this.emit('close', event.payload)
          break
        case 'Stdout':
          this.stdout.emit('data', event.payload)
          break
        case 'Stderr':
          this.stderr.emit('data', event.payload)
          break
      }
    }

    return await invoke<number>('plugin:shell|spawn', {
      program,
      args,
      options,
      onEvent
    }).then((pid) => new Child(pid))
  }

  /**
   * Executes the command as a child process, waiting for it to finish and collecting all of its output.
   * @example
   * ```typescript
   * import { Command } from '@tauri-apps/plugin-shell';
   * const output = await Command.create('echo', 'message').execute();
   * assert(output.code === 0);
   * assert(output.signal === null);
   * assert(output.stdout === 'message');
   * assert(output.stderr === '');
   * ```
   *
   * @returns A promise resolving to the child process output.
   *
   * @since 2.0.0
   */
  async execute(): Promise<ChildProcess<O>> {
    const program = this.program
    const args = this.args
    const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }

    return await invoke<ChildProcess<O>>('plugin:shell|execute', {
      program,
      args,
      options
    })
  }
}

/**
 * Describes the event message received from the command.
 */
interface Event<T, V> {
  event: T
  payload: V
}

/**
 * Payload for the `Terminated` command event.
 */
interface TerminatedPayload {
  /** Exit code of the process. `null` if the process was terminated by a signal on Unix. */
  code: number | null
  /** If the process was terminated by a signal, represents that signal. */
  signal: number | null
}

/** Event payload type */
type IOPayload = string | Uint8Array

/** Events emitted by the child process. */
type CommandEvent<O extends IOPayload> =
  | Event<'Stdout', O>
  | Event<'Stderr', O>
  | Event<'Terminated', TerminatedPayload>
  | Event<'Error', string>

/**
 * Opens a path or URL with the system's default app,
 * or the one specified with `openWith`.
 *
 * The `openWith` value must be one of `firefox`, `google chrome`, `chromium` `safari`,
 * `open`, `start`, `xdg-open`, `gio`, `gnome-open`, `kde-open` or `wslview`.
 *
 * @example
 * ```typescript
 * import { open } from '@tauri-apps/plugin-shell';
 * // opens the given URL on the default browser:
 * await open('https://github.com/tauri-apps/tauri');
 * // opens the given URL using `firefox`:
 * await open('https://github.com/tauri-apps/tauri', 'firefox');
 * // opens a file using the default program:
 * await open('/path/to/file');
 * ```
 *
 * @param path The path or URL to open.
 * This value is matched against the string regex defined on `tauri.conf.json > plugins > shell > open`,
 * which defaults to `^((mailto:\w+)|(tel:\w+)|(https?://\w+)).+`.
 * @param openWith The app to open the file or URL with.
 * Defaults to the system default application for the specified path type.
 *
 * @since 2.0.0
 */
async function open(path: string, openWith?: string): Promise<void> {
  await invoke('plugin:shell|open', {
    path,
    with: openWith
  })
}

export { Command, Child, EventEmitter, open }
export type {
  IOPayload,
  CommandEvents,
  TerminatedPayload,
  OutputEvents,
  ChildProcess,
  SpawnOptions
}
