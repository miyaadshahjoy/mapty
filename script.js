'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exercises :
/*
// # What happens when we call a function using "new" keyword

// 1. New {} is created
// 2. Function is called and this = {}
// 3. {} is linked to prototype (prototype of the constructor function)
// 4. Function automatically returns the {}

// Constructor Function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};

const joy = new Person('miyaad', 1999);
console.log(joy);
console.log(joy.calcAge());
Person.hey = function () {
  console.log('Hey there!👋');
  console.log(this);
};
Person.hey();

console.log(joy.__proto__.__proto__.__proto__);
console.log(Person.prototype.constructor);

// const arr = [1, 2, 3, 4, 5];

const arr = new Array(1, 2, 3, 4, 5, 6, 3, 7, 5, 9);
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(arr)];
};

console.log(arr.unique());
const button = document.querySelector('button'); // HTMLButtonElement -> HTMLElement -> Element -> Node -> EventTarget
console.log(button.__proto__);
console.dir(x => x + 1);
///////////////////////////////////////
// Coding Challenge #1
*/
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.brake();
car2.brake();
car2.accelerate();
*/

// ES6 class
/*
const PersonCl = class {
  #pin = '12597';
  #calcAge() {
    console.log(2037 - this.birthYear);
  }
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }

  greet() {
    console.log(`Hi ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  get fullName() {
    return this._fullName;
  }
  // static function
  static hey() {
    console.log('Hey there! 👋');
  }
};
const jessica = new PersonCl('Jessica', 1998);
console.log(jessica);
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);
jessica.fullName = 'Jessica Davis';
jessica.greet();
jessica.sayHi = function () {
  console.log('Hi There');
};

jessica.sayHi();

// Setters & Getters in an Object
const account = {
  owner: 'Miyaad',
  movements: [200, 530, 120, 300],

  set latest(movement) {
    this.movements.push(movement);
  },
  get latest() {
    return this.movements.at(-1);
  },
};

// Getter
console.log(account.latest);
// Setter
account.latest = 500;
console.log(account.movements);
*/

// Object.create()
/*
const prototypeObj = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
};

const newObj = Object.create(prototypeObj);

newObj.name = 'miyaad';
newObj.birthYear = 1999;

console.log(newObj);
newObj.calcAge();

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const matilda = Object.create(PersonProto);
console.log(matilda);
matilda.init('matilda', 1998);
console.log(matilda);
matilda.calcAge();
*/
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
