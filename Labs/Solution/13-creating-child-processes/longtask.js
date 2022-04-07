function getNextPrime(num) {
  const isPrime = (num) => {
    let sqrtnum = Math.floor(Math.sqrt(num));
    let prime = num !== 1;
    for (let i = 2; i < sqrtnum + 1; i++) {
      if (num % i === 0) {
        prime = false;
        break;
      }
    }
    return prime;
  };
  const nextPrime = (num = 1) => {
    while (!isPrime(++num)) {}
    return num;
  };

  return nextPrime(num);
}

// Tried with this but it was too good!

// export function fib(n, a = 0, b = 1) {
//   if (n === 0) return a;
//   if (n === 1) return b;
//   return fib(n - 1, b, a + b);
// }

process.send("ready");

process.on("message", (message) => {
  if (message === "start") {
    const result = getNextPrime(parseInt(process.argv[2]));
    process.send(result);
  }
});
