'use strict'

const number = prompt('Please provide random positive number')
const numPower = prompt('Please provide random positive number')
const powering = function (number, numPower = 1) {
    if (!isValidValue(number) || !isValidValue(numPower)) {
        return 'some error'
    }
    return Math.pow(number, numPower)
}

const isValidValue = (val) => {
    if (typeof val === 'string' && val.length === 0) {
        return false
    }

    return /^[0-9]+$/.test(val)
}

alert(powering(number, numPower))
