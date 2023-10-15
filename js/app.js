'use strict'

const padString = function (str, num, symbol, side = true) {
    if (arguments.length < 4 || arguments.length > 4) {
        console.log('4 parameters requested')
    }
    if (typeof arguments[0] !== 'string' || typeof arguments[2] !== 'string') {
        return 'First and third argument should be string'
    }
    if (typeof arguments[1] !== 'number') {
        return 'Second argument should be number'
    }
    if (typeof arguments[3] !== 'boolean') {
        console.log('Last argument should be boolean')
    }

    let argOne = arguments[0].split('')
    const rounds = num - argOne.length

    if (argOne.length >= num) {
        booleanValidation(side, symbol, argOne)
        return argOne.slice(0, num).join('')
    }
    for (let i = 1; i <= rounds; i++) {
        booleanValidation(side, symbol, argOne)
    }
    return argOne.slice(0, num).join('')
}

function booleanValidation(side, symbol, argOne) {
    return side === true ? argOne.push(symbol) : argOne.unshift(symbol)
}

console.log(padString('hello', '-', '*', false, 8))
