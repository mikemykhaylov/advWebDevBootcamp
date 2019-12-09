function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
Vehicle.prototype.start = () => 'VROOM!';
Vehicle.prototype.toString = () => `The make, model, and year are ${this.make} ${this.model} ${this.year}`;
function Car(...args) {
  Vehicle.apply(this, args);
  this.numWheels = 4;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
function Motorcycle(...args) {
  Vehicle.apply(this, args);
  this.numWheels = 2;
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;
