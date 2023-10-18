'use strict'

const exponentiation = (number, power) => {
    const result = Math.pow(number, power)
    alert(`Powering ${result}`)
}

const multiply = (number1, number2) => {
    const result = number1 * number2
    alert(`Multiply ${result}`)
}

const division = (number1, number2) => {
    const result = number1 / number2
    alert(`Division  ${result}`)
}

const modulo = (number1, number2) => {
    const result = number1 % number2
    alert(`Remainder  ${result}`)
}

const mainFunction = (cb1, cb2, cb3, cb4) => {
    const number1 = prompt('Please enter first number')
    const number2 = prompt('Please enter second number')
    cb1(number1, number2)
    cb2(number1, number2)
    cb3(number1, number2)
    cb4(number1, number2)
}

mainFunction(exponentiation, multiply, division, modulo)
