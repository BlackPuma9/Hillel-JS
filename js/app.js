'use strict'

const padString = (str, num, symbol = '*', fromStart = true) => {
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
        return 'Third argument should be single symbol'
    }
    if (typeof fromStart !== 'boolean') {
        return 'Last argument should be boolean'
    }

    const result = str.split('')
    const rounds = str.length >= num ? 1 : num - result.length

    for (let i = 1; i <= rounds; i++) {
        fromStart ? result.push(symbol) : result.unshift(symbol)
    }

    return result.slice(0, num).join('')
}

console.log(padString('hello', 2))
console.log(padString('hello', 18, '7', false))
