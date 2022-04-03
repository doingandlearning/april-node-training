const arguments = process.argv;
let flags = [];
let args = [];

arguments.forEach((arg) => {
  if (/^--/.test(arg)) {
    flags.push(arg);
  } else if (!arg.includes("/Users")) {
    args.push(arg);
  }
});

console.log(args, flags);
