'use strict';

let numberOne = Number(prompt("Enter first number"))
let numberTwo = Number(prompt("Enter second number"))

// add, sub, mult, div

function add() {
    let sum = numberOne + numberTwo
    console.log(`Результат: ${numberOne} + ${numberTwo} = ${sum}`)
}

function sub() {
    let subtraction = numberOne - numberTwo
    console.log(`Результат: ${numberOne} - ${numberTwo} = ${subtraction}`)
}

function mult() {
    let multiply = numberOne * numberTwo
    console.log(`Результат: ${numberOne} * ${numberTwo} = ${multiply}`)
}

function div() {
    let divide = numberOne / numberTwo
    console.log(`Результат: ${numberOne} / ${numberTwo} = ${divide}`)
}

add(numberOne, numberTwo)
sub(numberOne, numberTwo)
mult(numberOne, numberTwo)
div(numberOne, numberTwo)
