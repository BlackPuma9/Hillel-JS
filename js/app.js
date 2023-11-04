'use strict'

const getFactorial = (n) => {
    return n !== 1 ? n * getFactorial(n - 1) : 1
}

console.log(getFactorial(3))

const pow = (num, degree) => {
    return degree !== 1 ? num * pow(num, degree - 1) : num
}

console.log(pow(2, 4))

const sum = (a, b) => {
    return b !== 0 ? sum(a + 1, b - 1) : a
}

console.log(sum(20, 10))
