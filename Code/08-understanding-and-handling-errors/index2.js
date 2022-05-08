class OddError extends Error {
  constructor(message = "") {
    super(`Must be even. ${message}`);
    this.code = "ERR_MUST_BE_EVEN";
  }

  get name() {
    return "DontBeEven";
  }
}

function halfAmount(amount) {
  if (typeof amount !== "number") {
    const err = new Error("Amount must be a number");
    err.code = "ERR_MUST_BE_NUMBER";
    throw err;
  }
  if (amount % 2 !== 0) {
    throw new OddError();
  }
  if (amount < 0) {
    throw new RangeError("Must be greater 0");
  }
  return amount / 2;
}

try {
  const result = halfAmount(3);
  console.log(result);
} catch (error) {
  if (error.code === "ERR_MUST_BE_NUMBER") {
    console.log("You must use a number.");
    console.log(error);
    //
  } else if (error instanceof OddError) {
    console.log("Your number must be even");
    console.log(error);
  } else {
    console.log("Failed for an unknown reason.");
    console.log(error);
  }
}
