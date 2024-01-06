'use strict'
;(function () {
    function Person(name, age) {
        this.name = name
        this.age = age
    }

    Person.prototype.showInfo = function () {
        return `Name: ${this.name}, Age: ${this.age}`
    }

    const person1 = new Person('Yuli', 27)
    const person2 = new Person('Ola', 15)

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
            : console.log(`The person\`s ${person.name} must be over 18 old.`)
    }

    Car.prototype.showInfo = function () {
        if (this.owner) {
            console.log(this.owner.showInfo())
            console.log(
                `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Licence Plate: ${this.licencePlate}, Owner: ${this.owner.name}`
            )
        } else {
            console.log(
                `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Licence Plate: ${this.licencePlate}, No owner provided`
            )
        }
    }

    const car1 = new Car('BMD', 'X5', 2023, 'AA2065XP')
    const car2 = new Car('Porshe', 'MK', 2024, 'AA2015SV')

    console.log(person1)
    console.log(person2)
    car1.assignOwner(person1)
    car2.assignOwner(person2)
    console.log(car1)
    console.log(car2)
    car1.showInfo()
    car2.showInfo()
})()
