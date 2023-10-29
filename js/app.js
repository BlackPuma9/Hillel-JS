'use strict'

const indexOf = (arr, searchElement, fromIndex = 0) => {
    if (arr.length === 0) return -1
    for (let i = fromIndex; i < arr.length; i++) {
        if (arr[i] === searchElement) {
            return i
        }
    }
    return -1
}
console.log(indexOf([2, 5, 9, 12, 15, 2], 9, 2))

const lastIndex = (arr, searchElement, fromIndex = 0) => {
    let index = -1

    for (let i = fromIndex; i < arr.length; i++) {
        if (arr[i] === searchElement) {
            index = i
        }
    }
    return index
}

console.log(lastIndex([2, 5, 9, 12, 15, 2, 3, 8, 2], 2, 0))

const find = (arr, fn) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Your callback should be a function')
    }

    for (const number of arr) {
        if (fn(number)) {
            return number
        }
    }
    return undefined
}

const callback = (number) => number > 10

console.log(find([2, 11, 5, 9, 12, 15, 2], callback))

const findIndex = (arr, fn) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Your callback should be a function')
    }

    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            return i
        }
    }
    return -1
}

const callbackFind = (number) => number > 14

console.log(findIndex([2, 11, 5, 9, 12, 15, 2], callbackFind))

const includes = (arr, searchElement, fromIndex = 0) => {
    for (let i = fromIndex; i < arr.length; i++) {
        if (arr[i] === searchElement) {
            return true
        }
    }
    return false
}
console.log(includes([2, 5, 9, 12, 15, 2], 15, 1))

const every = (arr, fn) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Your callback should be a function')
    }

    for (let i = 0; i < arr.length; i++) {
        if (!fn(arr[i])) {
            return false
        }
    }
    return true
}
const callbackEvery = (number) => number > 10

console.log(every([2, 11, 5, 9, 12, 15, 22], callbackEvery))

const some = (arr, fn) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Your callback should be a function')
    }

    for (const number of arr) {
        if (fn(number)) {
            return true
        }
    }
    return false
}

const callbackSome = (number) => number > 10

console.log(some([2, 11, 5, 9, 12, 15, 2], callbackSome))
