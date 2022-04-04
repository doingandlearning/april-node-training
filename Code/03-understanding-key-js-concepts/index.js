function init(type) {
  var id = 0;
  return (name) => {
    id += 1;
    return { id, type, name };
  };
}

const createUser = init("user");
const createBook = init("book");

const dan = createUser("Dan");
const danBook = createBook("Microfrontends in Action");

const paul = createUser("Paul");
const paulBook = createBook("Space Marines Codex");

const andrey = createUser("Andrey");
const andreyBook = createBook("When America Stopped Being Great");

console.group();
console.log(dan, danBook);
console.groupEnd();
console.group();
console.log(paul, paulBook);
console.groupEnd();
console.group();
console.log(andrey, andreyBook);
console.groupEnd();
