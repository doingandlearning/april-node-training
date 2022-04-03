function f(n = 99) {
  //   if (n === 0) throw Error();
  if (n === 1) {
    console.log("All done now");
    process.exit();
  }
  f(n - 1);
}
f();
