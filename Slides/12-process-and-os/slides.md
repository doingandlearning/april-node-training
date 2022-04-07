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

# Process and Operating System

---

By the end of this section, you should be able to:

- Explain process input and output.
- Exit a process, exit codes and respond to a process closing.
- Gather information about the process.
- Gather information about the Operating System.

<!--

A Node.js process is the program that is currently running our code. We can control and gather information about a process using the global process object. The Operating System is the host system on which a process runs, we can find out information about the Operating System of a running process using the core os module. In this chapter we'll explore both.

-->


--- 

# STDIO

The ability to interact with terminal input and output is known as standard input/output, or STDIO. The process object exposes three streams:

**process.stdin**:  A Readable stream for process input.

**process.stdout**: A Writable stream for process output.

**process.stderr**: A Writable stream for process error output.

<!--

In order to interface with process.stdin some input is needed. We'll use a simple command that generates random bytes in hex format:

node -p "crypto.randomBytes(100).toString('hex')"

Since bytes are randomly generated, this will produce different output every time, but it will always be 200 alphanumeric characters.

Let's jump into the example

-->

---

# Exiting

<v-clicks>

When a process has nothing left to do, it exits by itself. 

To force a process to exit at any point, we can call `process.exit()`.

We can set exit codes with `process.exitCode = code` or with `process.exit(code)`.

We can detect when the process is closing and perform final actions.

</v-clicks>

---

# Process Info

The process object also contains information about the process, we'll look at a few here:

- The current working directory of the process
- The platform on which the process is running
- The Process ID
- The environment variables that apply to the process

---

# Process Stats

The process object has methods which allow us to query resource usage, we're going to look at the process.uptime(), process.cpuUsage and process.memoryUsage functions.

---

# System Stats

Operating System stats can also be gathered, let's look at:

- Uptime
- Free memory
- Total memory

---

# Exercises

1. Open the exercise file and fill in the right calls in console.log statements.