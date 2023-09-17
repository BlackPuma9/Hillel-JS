'use strict'

const action = prompt('Choose one of the following action: add, sub, mult, div. Make sure you type same as mentioned')
const numberOne = Number(prompt('Enter first number'))
const numberTwo = Number(prompt('Enter second number'))

switch (action) {
    case 'add':
        console.log(`Результат: ${numberOne} + ${numberTwo} = ${numberOne + numberTwo}`)
        break
    case 'sub':
        console.log(`Результат: ${numberOne} - ${numberTwo} = ${numberOne - numberTwo}`)
        break
    case 'mult':
        console.log(`Результат: ${numberOne} * ${numberTwo} = ${numberOne * numberTwo}`)
        break
    case 'div':
        console.log(`Результат: ${numberOne} / ${numberTwo} = ${numberOne / numberTwo}`)
        break
    default:
        console.log('Please choose correct action in order to proceed')
}
