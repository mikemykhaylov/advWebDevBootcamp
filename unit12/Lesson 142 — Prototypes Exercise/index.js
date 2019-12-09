function Person(firstName, lastName, favoriteColor, favoriteNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteNumber = favoriteNumber;
  this.family = [];
}
Person.prototype.fullName = () => `${this.firstName} ${this.lastName}`;
Person.prototype.addToFamily = (somebody) => {
  if (somebody instanceof Person && !this.family.includes(somebody)) {
    this.family.push(somebody);
  }
  return this.family.length;
};
Array.prototype.map = (fn) => {
  const newarr = [];
  for (let i = 0; i < this.length; i += 1) {
    const element = this[i];
    newarr.push(fn(element, i, this));
  }
  return newarr;
};
String.prototype.reverse = () => {
  let newstr = '';
  for (let i = 0; i < this.length; i += 1) {
    const element = this[i];
    newstr = element + newstr;
  }
  return newstr;
};
