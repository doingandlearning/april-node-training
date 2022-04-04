function f(n = 99) {
  if (n === 10) throw Error();
  debugger;
  if (n === 1) {
    console.log("All done now");
    process.exit();
  }
  f(n - 1);
}
f();
