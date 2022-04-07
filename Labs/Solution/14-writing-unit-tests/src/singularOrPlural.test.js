const getSinguralOrPlural = require("./singularOrPlural");

// Exercise 4
test("Will return singular for value of 1", () => {
  expect(getSinguralOrPlural(1, "man", "men")).toBe("man");
});
test("Will return plural for value of 0", () => {
  expect(getSinguralOrPlural(0, "car", "cars")).toBe("cars");
});

test("Will throw for a negative", () => {
  expect(() => getSinguralOrPlural(-1, "house", "houses")).toThrowError();
});

test("Will throw for a non-numeric value", () => {
  expect(() => getSinguralOrPlural({}, "giant", "giants")).toThrowError();
});
