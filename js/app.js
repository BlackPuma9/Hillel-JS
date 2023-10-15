'use strict'

const padString = function (str, num, symbol = '*', fromStart = true) {
    if (typeof str !== 'string') {
        return 'First argument should be string'
    }
    if (typeof num !== 'number') {
        return 'Second argument should be number'
    }
    if (typeof symbol !== 'string') {
        return 'Third argument should be string'
    }
    if (symbol.length > 1) {
        return 'Third argument should be one symbol'
    }
    if (typeof fromStart !== 'boolean') {
        return 'Last argument should be boolean'
    }

    let result = str.split('')
    const rounds = num - result.length

    if (str.length >= num) {
        buildResult(fromStart, symbol, result)
    } else {
        for (let i = 1; i <= rounds; i++) {
            buildResult(fromStart, symbol, result)
        }
    }

    return result.slice(0, num).join('')
}

function buildResult(side, symbol, argOne) {
    side ? argOne.push(symbol) : argOne.unshift(symbol)
}

console.log(padString('hello', 2, '*', false))
// console.log(padString('hello', 2, '*', true))
// console.log(padString('hello', 18))
