const assert = require("assert");

// TODO: create a prefixer function that will return a function with the prefix in place.
function prefixer(prefix) {
  return (text) => `${prefix}${text}`;
}

const sayHiTo = prefixer("Hello ");
const sayByeTo = prefixer("Goodbye ");
console.log(sayHiTo("Kevin")); // prints 'Hello Kevin'
console.log(sayHiTo("Paula")); // prints 'Hello Paula'
console.log(sayByeTo("Kevin")); // prints 'Goodbye Kevin'

assert.equal(sayHiTo("Kevin"), "Hello Kevin"); // prints 'Hello Kevin'
assert.equal(sayHiTo("Paula"), "Hello Paula"); // prints 'Hello Paula'
assert.equal(sayByeTo("Kevin"), "Goodbye Kevin"); // prints 'Goodbye Kevin'
