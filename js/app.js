'use strict';

const action = prompt("Choose one of the following action: add, sub, mult, div. Make sure you type same as mentioned")
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

switch (action) {
    case 'add':
        add(numberOne, numberTwo)
        break
    case 'sub':
        sub(numberOne, numberTwo)
        break
    case 'mult':
        mult(numberOne, numberTwo)
        break
    case 'div':
        div(numberOne, numberTwo)
        break
    default:
        console.log('Please choose correct action in order to process with code')
}

// add(numberOne, numberTwo)
// sub(numberOne, numberTwo)
// mult(numberOne, numberTwo)
// div(numberOne, numberTwo)