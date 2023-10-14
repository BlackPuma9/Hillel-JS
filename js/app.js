'use strict'

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')

function generateKey(length, characters) {
    const randomise = [...characters].sort(() => 0.5 - Math.random())

    return randomise.slice(0, length).join('')
}

const key = generateKey(16, characters)

console.log(key) // eg599gb60q926j8i
