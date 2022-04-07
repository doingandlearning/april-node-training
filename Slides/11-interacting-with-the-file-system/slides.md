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

# Interacting with the file system

--- 

By the end of this section, you should be able to:

- Understand path manipulation in Node.
- Query files and directories for meta-data and permissions controls.
- Dynamically respond to file system changes.
- Discover various ways to write files and read files and directories.


<!--

When it was created, JavaScript was a browser-side language, so there are no in-built JavaScript primitives for interacting with the file system. However the ability to manipulate the file system is central to server-side programming. Node provides these abilities with the **fs** module and, in a supporting role, the **path** module. In this section, we'll take a guided tour of both modules.

-->

---

# File Paths

<v-clicks>

There are two core modules that achieve file system management.

**fs**: provides APIs to deal with reading, writing, file system meta-data and file system watching

**path**: handles path manipulation and normalization across platforms



</v-clicks>

<!--

Management of the file system is really achieved with two core modules, **fs** and **path**. The path module is important for path manipulation and normalization across platforms and the **fs** module provides APIs to deal with the business of reading, writing, file system meta-data and file system watching.

-->

---


# Important variables

<v-clicks>

**__filename** - the absolute path of the currently executing file

**__dirname** - the absolute path to the directory the currently executing path is located in

```js
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(__filename);
console.log(__dirname);
```

</v-clicks>

<!--

Before locating a relative file path, we often need to know where the particular file being executed is located. For this there are two variables that are always present in every module: **__filename** and **__dirname**.

The **__filename** variable holds the absolute path to the currently executing file, and the **__dirname** variable holds the absolute path to the directory that the currently executing file is in.


-->

---
layout: two-cols
---

# path

The most common method used in path is join, as this character is different between Windows and Linux based machines.

There are path constructors/builders (relative, resolve, normalize and format) and path deconstructors (parse, basename, dirname, extname).

::right::

<v-clicks>

```js
'use strict'  
const { join } = require('path')  
console.log('out file:', join(__dirname, 'out.txt'))
```

- path.relative
- path.resolve
- path.normalize
- path.format

- path.parse
- path.extname
- path.dirname
- path.basename

</v-clicks>

<!--

Alongside **path.join** the other path builders are:
- **path.relative**   
    Given two absolute paths, calculates the relative path between them.
- **path.resolve**   
    Accepts multiple string arguments representing paths. Conceptually each path represents navigation to that path. The **path.resolve** function returns a string of the path that would result from navigating to each of the directories in order using the command line **cd** command. For instance **path.resolve('/foo', 'bar', 'baz')** would return **'/foo/bar/baz'**, which is akin to executing **cd /foo** then **cd bar** then **cd baz** on the command line, and then finding out what the current working directory is.
- **path.normalize**   
    Resolves **..** and **.** dot in paths and strips extra slashes, for instance **path.normalize('/foo/../bar//baz')** would return **'/bar/baz'**.
- **path.format**   
    Builds a string from an object. The object shape that **path.format** accepts, corresponds to the object returned from **path.parse** which we'll explore next.

- path.parse
- path.extname
- path.dirname
- path.basename

-->

---

# Reading and Writing

The lower level APIs in `fs` mirror the POSIX system calls - for most cases it's better practice to use the higher level methods.

The higher level methods for reading and writing are provided in four abstraction types:

- Synchronous
- Callback based
- Promise based
- Stream based

---

# Synchronous methods

<v-clicks>

All the names of synchronous methods in the **fs** module end with **Sync**. 

Synchronous methods will block anything else from happening in the process until they have resolved. These are convenient for loading data when a program starts, but should mostly be avoided after that.

```js
'use strict'  
const { readFileSync } = require('fs')  
const contents = readFileSync(__filename)  
console.log(contents)
```

</v-clicks>


<!--


All the names of synchronous methods in the **fs** module end with **Sync**. For instance, **fs.readFileSync**. Synchronous methods will block anything else from happening in the process until they have resolved. These are convenient for loading data when a program starts, but should mostly be avoided after that. If a synchronous method stops anything else from happening, it means the process can't handle or make requests or do any kind of I/O until the synchronous operation has completed.
  
- Reading from a file will return a buffer - so we can see the data by calling the .toString() method

- The optional options object can set the encoding and the flag.
  
const contents = readFileSync(__filename, {encoding: 'utf8'})  

- It works the same for the writeFileSync

```js
  'use strict'  
  const { join } = require('path')  
  const { readFileSync, writeFileSync } = require('fs')  
  const contents = readFileSync(__filename, {encoding: 'utf8'})  
  writeFileSync(join(__dirname, 'out.txt'), contents.toUpperCase())
  ```


An options object can be added, with a **flag** option set to **'a'** to open a file in append mode:
  
 
writeFileSync(join(__dirname, 'out.txt'), contents.toUpperCase(), {  
  flag: 'a'  
  })**
  
  
For a full list of supports flags, see [File System Flags](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_file_system_flags) section of the Node.js Documentation. 
  
If there's a problem with an operation the ***Sync** APIs will throw. So to perform error handling they need to be wrapped in a **try/catch**.
  

  To create this error the **fs.chmodSync** method was used. It generated a permission denied error when the **fs.writeFileSync** method attempted to access it. This triggered the **catch** block with the error where it was logged out with **console.error**. The permissions were then restored at the end using **fs.chmodSync** again. For more on **fs.chmodSync** see [Node.js Documentation](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_fchmodsync_fd_mode).
  
  In the case of the ***Sync**, APIs control flow is very simple because execution is sequential, the chronological ordering maps directly with the order of instructions in the file. However, Node works best when I/O is managed in the background until it is ready to be processed. For this, there's the callback and promise based filesystem APIs. The asynchronous control flow was discussed at length in _Section 8 -_ _"Asynchronous Control Flow"_, the choice on which abstraction to use depends heavily on project context. So let's explore both, starting with callback-based reading and writing.
-->

---
layout: two-cols
---

# fs - callback based

```js
'use strict'  
const { readFile } = require('fs')  
readFile(__filename, {encoding: 'utf8'}, (err, contents) => {  
  if (err) {  
    console.error(err)  
    return  
  }  
})
``` 

::right::
```js
'use strict'  
const { join } = require('path')  

const { readFile, writeFile } = require('fs')  

readFile(__filename, {encoding: 'utf8'}, (err, contents) => {  
  if (err) {  
    console.error(err)  
    return  
  }  
  const out = join(__dirname, 'out.txt')  
  writeFile(out, contents.toUpperCase(), (err) => {  
    if (err) { 
      console.error(err) 
    }  
  })  
})
```
  <!--

  
  The **fs.readFile** equivalent, with error handling, of the **fs.readFileSync** with encoding set to UTF8 example is:
  
  **'use strict'  
  const { readFile } = require('fs')  
  readFile(__filename, {encoding: 'utf8'}, (err, contents) => {  
  if (err) {  
    console.error(err)  
    return  
  }  
  })**
  
When the process is executed this achieves the same objective, it will print the file contents to the terminal.

- This process is non-blocking though!
-->

---
layout: two-cols
---

# fs - Promises

```js
'use strict'  
const { join } = require('path')  
const { readFile, writeFile } = require('fs').promises  
  
async function run () {  
  const contents = await readFile(__filename, {encoding: 'utf8'})  
  const out = join(__dirname, 'out.txt')  
  await writeFile(out, contents.toUpperCase())  
}
  
run().catch(console.error)
```

::right::

or in ESM

```js
import { join, dirname } from "path";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const contents = await readFile(__filename, { encoding: "utf8" });
  const out = join(__dirname, "out.txt");
  await writeFile(out, contents.toUpperCase());
} catch (error) {
  console.log(error);
}
```

<!--




As discussed in _Section 8 -_ _"Asynchronous Control Flow"_, promises are an asynchronous abstraction like callbacks but can be used with **async/await** function to provide the best of both worlds: easy to read sequential instructions plus non-blocking execution.
  
  The **fs.promises** API provides most of the same asynchronous methods that are available on **fs**, but the methods return promises instead of accepting callbacks.
  
  So instead of loading **readFile** and **writeFile** like so:
  
  **const { readFile, writeFile } = require('fs')**
  
  We can load the promise-based versions like so:
  
  **const { readFile, writeFile } = require('fs').promises**
  
  Let's look at the same reading and writing example using **fs.promises** and using **async/await** to resolve the promises:
  
  **'use strict'  
  const { join } = require('path')  
  const { readFile, writeFile } = require('fs').promises  
  async function run () {  
  const contents = await readFile(__filename, {encoding: 'utf8'})  
  const out = join(__dirname, 'out.txt')  
  await writeFile(out, contents.toUpperCase())  
  }**
  
  **run().catch(console.error)**
  
  ![$ node example.js $ node -p "fs.readFileSync('out.txt').toString()" 'USE STRICT' CONST { JOIN } = REQUIRE('PATH') CONST { READFILE, WRITEFILE } = REQUIRE('FS').PROMISES ASYNC FUNCTION RUN () { CONST CONTENTS = AWAIT READFILE(__FILENAME, {ENCODING: 'UTF8'}) CONST OUT = JOIN(__DIRNAME, 'OUT.TXT') AWAIT WRITEFILE(OUT, CONTENTS.TOUPPERCASE()) }  RUN().CATCH(CONSOLE.ERROR)](https://d36ai2hkxl16us.cloudfront.net/course-uploads/e0df7fbf-a057-42af-8a1f-590912be5460/acei22aaz7cw-pastedimage0.png)

-->

---

# fs - streams

The **fs** module has **fs.createReadStream** and **fs.createWriteStream** methods which allow us to read and write files in chunks. Streams are ideal when handling very large files that can be processed incrementally.

```js
'use strict'  
const { pipeline } = require('stream')  
const { join } = require('path')  
const { createReadStream, createWriteStream } = require('fs')**
  
pipeline(  
  createReadStream(__filename),  
  createWriteStream(join(__dirname, 'out.txt')),  
  (err) => {  
    if (err) {  
      console.error(err)  
      return  
    }  
    console.log('finished writing')  
  }  
)
```

<!--

  
  Let's start with by simply copying the file:
  
  **'use strict'  
  const { pipeline } = require('stream')  
  const { join } = require('path')  
  const { createReadStream, createWriteStream } = require('fs')**

  
  This pattern is excellent if dealing with a large file because the memory usage will stay constant as the file is read in small chunks and written in small chunks.
  
  To reproduce the read, uppercase, write scenario we created in the previous section, we will need a transform stream to uppercase the content:
  ```js
  'use strict'  
  const { pipeline } = require('stream')  
  const { join } = require('path')  
  const { createReadStream, createWriteStream } = require('fs')  
  const { Transform } = require('stream')  
  const createUppercaseStream = () => {  
  return new Transform({  
    transform (chunk, enc, next) {  
      const uppercased = chunk.toString().toUpperCase()  
      next(null, uppercased)  
    }  
  })  
  }
  
  pipeline(  
  createReadStream(__filename),  
  createUppercaseStream(),  
  createWriteStream(join(__dirname, 'out.txt')),  
  (err) => {  
    if (err) {  
      console.error(err)  
      return  
    }  
    console.log('finished writing')  
  }  
  )
  ```
  
  Our pipeline now reads chunks from the file read stream, sends them through our transform stream where they are upper-cased and then sent on to the write stream to achieve the same result of upper-casing the content and writing it to **out.txt**:


-->
---

# A server example 

Streams, dirs and servers ... 

--- 

# File Metadata

Metadata about files can be obtained with the following methods:

- fs.stat, fs.statSync, fs.promises.stat
- fs.lstat, fs.lstatSync, fs.promises.lstat

The only difference between the stat and lstat methods is that stat follows symbolic links, and lstat will get meta data for symbolic links instead of following them.

---

# Watching

The fs.watch method is provided by Node core to tap into file system events. It is however, fairly low level and not the most friendly of APIs.

Let's look at an example that watches a directory!

---
layout: two-cols
---

# Exercise 1

The code in exercise1 will generate a project folder and add five files to it. Complete the exercise function so that all the files in the project folder are written to the out.txt file as stored in the out constant. Only the file name should be stored.

So, given a project folder with the following files:
- 0p2ly0dluiw
- 2ftl32u5zu5
- 8t4iilscua6
- 90370mamnse
- zfw8w7f8sm8

The out.txt should then contain:

0p2ly0dluiw,2ftl32u5zu5,8t4iilscua6,90370mamnse,zfw8w7f8sm8

::right::

# Exercise 2

The code in exercise2 will create a folder named project (removing it first if it already exists and then recreating it), and then perform some file system manipulations within the project folder.


The goal is to ensure that the answer variable is set to the newly created file. So when a directory is added, the answer variable should not be set to the directory path. When the preexisting files status is updated via a permissions change, the answer variable should not be set to that preexisting file.

If implemented correctly the process will output: passed!