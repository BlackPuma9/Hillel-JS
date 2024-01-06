'use strict'

function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.showInfo = function () {
    return `Name: ${this.name}, Age: ${this.age}`
}

let person1 = new Person('Yuli', 27)
let person2 = new Person('Ola', 15)

function Car(brand, model, year, licencePlate) {
    this.brand = brand
    this.model = model
    this.year = year
    this.licencePlate = licencePlate
    this.owner = null
}

Car.prototype.assignOwner = function (person) {
    return person.age > 18
        ? (this.owner = person)
        : console.log('The person`s age must be over 18.')
}

Car.prototype.showInfo = function () {
    if (this.owner) {
        console.log(this.owner.showInfo())
    }
    console.log(
        `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Licence Plate: ${this.licencePlate}`
    )
}

let car1 = new Car('BMD', 'X5', 2023, 'AA2065XP')
let car2 = new Car('Porshe', 'MK', 2024, 'AA2015SV')
car1.assignOwner(person1)
console.log(car1)
console.log(car2)
car1.assignOwner(person1)
car1.showInfo()
car2.assignOwner(person2)
car2.showInfo()
