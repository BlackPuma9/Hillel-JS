'use strict'

const numberOne = Number(prompt("Enter first number"))
const numberTwo = Number(prompt("Enter second number"))

// add, sub, mult, div


const add = (num1, num2) => console.log(`Результат: ${num1} + ${num2} = ${num1 + num2}`)

// function add(num1, num2) {
//     console.log(`Результат: ${num1} + ${num2} = ${num1 + num2}`)
// }

const sub = (num1, num2) => console.log(`Результат: ${num1} - ${num2} = ${num1 - num2}`)


// function sub(num1, num2) {
//     console.log(`Результат: ${num1} - ${num2} = ${num1 - num2}`)
// }

const mult = (num1, num2) => console.log(`Результат: ${num1} * ${num2} = ${num1 * num2}`)

// function mult(num1, num2) {
//     console.log(`Результат: ${num1} * ${num2} = ${num1 * num2}`)
// }

const div = (num1, num2) => console.log(`Результат: ${num1} / ${num2} = ${num1 / num2}`)

// function div(num1, num2) {
//     console.log(`Результат: ${num1} / ${num2} = ${num1 / num2}`)
// }

add(numberOne, numberTwo)
sub(numberOne, numberTwo)
mult(numberOne, numberTwo)
div(numberOne, numberTwo)
