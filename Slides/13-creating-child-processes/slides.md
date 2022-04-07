---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# Creating Child Processes

---

By the end of this section, you should be able to:

- Discuss various ways to create child processes.
- Understand key relevant configuration options when starting child processes.
- Discover different ways to handle child process input and output.
- Communicate with child processes.

<!--

The Node.js core child_process module allows the creation of new processes with the current process as the parent. A child process can be any executable written in any language, it doesn't have to be a Node.js process. In this chapter, we'll learn different ways to start and control child processes.

-->

---

# Child Process Creation

The child_process module has the following methods, all of which spawn a process some way or another:

- exec & execSync
- spawn & spawnSync
- execFile & execFileSync
- fork



---

# execFile & execFileSync Methods

<v-clicks>

The execFile and execFileSync methods are variations of the exec and execSync methods. 

Rather than defaulting to executing a provided command in a shell, it attempts to execute the provided path to a binary executable directly. 

This is slightly more efficient but at the cost of some features. 

See the [execFile Documentation](https://nodejs.org/dist/latest-v12.x/docs/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) for more information.

</v-clicks>

---

# fork Method

<v-clicks>

The fork method is a specialization of the spawn method.

By default, it will spawn a new Node process of the currently executing JavaScript file (although a different JavaScript file to execute can be supplied).
 
It also sets up Interprocess Communication (IPC) with the subprocess by default. 

See [fork Documentation](https://nodejs.org/dist/latest-v12.x/docs/api/child_process.html#child_process_child_process_fork_modulepath_args_options) to learn more.

</v-clicks>

---

# exec & execSync Methods

<v-clicks>

The child_process.execSync method is the simplest way to execute a command.

It returns a buffer containing the output of the command. This is both the STDOUT and STDERR output.

```js
'use strict'
const { execSync } = require('child_process')
const output = execSync(
node -e "console.log('subprocess stdio output')"
)
console.log(output.toString())
```


</v-clicks>
<!--

The execSync method returns a buffer containing the output of the command. This is both STDOUT and STDERR output.

Let's change the code so that the subprocess prints to STDERR instead like so:

```js
'use strict'
const { execSync } = require('child_process')
const output = execSync(`node -e "console.error('subprocess stdio output')"`)
console.log(output.toString())
```

`process.execPath` is the full path of the node binary currently executing the Node process. Using this ensure that the subprocess will be executing the same version of Node.

-->
---

# Errors with exec

```js
'use strict'
const { execSync } = require('child_process')

try {
  execSync("${process.execPath}" -e "process.exit(1)")
} catch (err) {
  console.error('CAUGHT ERROR:', err)
}
```


---

# spawn & spawnSync

While exec and execSync take a full shell command, spawn takes the executable path as the first argument and then an array of flags that should be passed to the command as second argument.

```js
'use strict'  
const { spawnSync } = require('child_process')  
const result = spawnSync(  
process.execPath,  
['-e', `console.log('subprocess stdio output')`]  
)  
console.log(result)
```

<!--

While the execSync function returns a buffer containing the child process output, the spawnSync function returns an object containing information about the process that was spawned. We assigned this to the result constant and logged it out. This object contains the same properties that are attached to the error object when execSync throws. The result.stdout property (and result.output[1]) contains a buffer of our processes STDOUT output, which should be 'subprocess stdio output'. Let's find out by updating the console.log(result) line to

- Status code is set to the exit code.

- The spawn method returns a ChildProcess instance which we assigned to the sp constant. The sp.pid (Process ID) is immediately available so we console.log this right away. To get the STDOUT of the child process we pipe sp.stdout to the parent process.stdout. This results in our second line of output which says subprocess stdio output. To get the status code, we listen for a close event. When the child process exits, the event listener function is called, and passes the exit code as the first and only argument. This is where we print our third line of output indicating the exit code of the subprocess.

The spawn method and the exec method both returning a ChildProcess instance can be misleading. There is one highly important differentiator between spawn and the other three methods we've been exploring (namely exec, execSync and spawnSync): the spawn method is the only method of the four that doesn't buffer child process output. Even though the exec method has stdout and stderr streams, they will stop streaming once the subprocess output has reached 1 mebibyte (or 1024 * 1024 bytes). This can be configured with a maxBuffer option, but no matter what, the other three methods have an upper limit on the amount of output a child process can generate before it is truncated. Since the spawn method does not buffer at all, it will continue to stream output for the entire lifetime of the subprocess, no matter how much output it generates. Therefore, for long running child processes it's recommended to use the spawn method.




-->

---

# Process Configuration

An options object can be passed as a third argument in the case of spawn and spawnSync or the second argument in the case of exec and execSync.

```js
'use strict'

const { spawn } = require('child_process')

process.env.A_VAR_WE = 'JUST SET'

const sp = spawn(process.execPath, ['-p', 'process.env'], {  
env: {SUBPROCESS_SPECIFIC: 'ENV VAR'} ,
// cwd: we can also set the cwd of the process
})

sp.stdout.pipe(process.stdout)
```

---

# Child STDIO

Asynchronous child creation methods (exec and spawn) return a ChildProcess instance which has stdin, stdout and stderr streams representing the I/O of the subprocess.

This is the default behavior, but it can be altered.

---

# Exercises

1. In exercise 1, you need to modify the exercise function so that it returns a child process. This child process should have a single environment variable called MY_ENV_VAR. 

Running node exercise1 should return passed.

2. STDIO Redirection. In exercise2, Complete the exercise function so that the returned child process

- has no ability to read STDIN
- redirects its STDOUT to the parent process' STDOUT
- exposes STDERR as a readable stream

The folder also contains a test.js file. To verify that the exercise was completed successfully run node test.js, if the implementation is correct the process will output: passed!