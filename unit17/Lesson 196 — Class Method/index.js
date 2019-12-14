class Human {
  constructor(firstName, isCool) {
    this.firstName = firstName;
    this.isCool = isCool;
  }

  sayHi() {
    return `Hello, I'm ${this.firstName} and I'm ${this.isCool ? 'cool!' : 'not cool...'}`;
  }

  static isHuman(obj) {
    return obj.constructor === Human;
  }
}

const elie = new Human('Elie', true);
console.log(Human.isHuman(elie));
