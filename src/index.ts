// class User {
//   constructor(
//     public name: string,
//   ) {}
// }

// const user = new User("Egor");

// console.log(user);

function Log(target: object, propertyKey: string | symbol) {
  console.log(`Decorator: ${String(propertyKey)}`);
}

class User {
  @Log
  name = "Egor";
}

new User();

const foo = 5;

const user = { name: "Egor" };
