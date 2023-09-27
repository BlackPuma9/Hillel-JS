'use strict'

// Task #1

const user = {}
user.name = 'John'
user.surname = 'Smith'

user.name = 'Pete'

delete user.name

// Task #2
//
// Чи можна змінити об'єкт, оголошений за допомогою const?
//
// const user = {
//     name: "John"
// };
//
// // Це працюватиме?
//
// user.name = "Pete";

// так, можемо змінити властивість об'єкту оголошеного через const

// Task #3

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130,
}

// Version 1
// let sum = 0
// for (const key in salaries) {
//     sum += salaries[key]
// }

// Version 2
const sum = Object.values(salaries).reduce((total, current) => total + current)

console.log(sum)
