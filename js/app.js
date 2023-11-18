'use strict'

function insertWordInto(str) {
    const cash = []
    const creatingNew = (word) => {
        const indexes = [0, str.length - 1]
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') {
                indexes.push(i)
            }
        }

        const randomIndexes = indexes.sort(() => Math.random() - 0.5)

        if (typeof word !== 'string') {
            throw new TypeError('Argument should be a string')
        }
        if (word.length === 0) {
            throw new Error('Argument can not be empty')
        }

        for (let i = 0; i < randomIndexes.length; i++) {
            if (randomIndexes[i] === 0) {
                const insertStart = `${word} ${str}`
                if (!cash.includes(insertStart)) {
                    cash.push(insertStart)
                    return insertStart
                }
            }

            if (randomIndexes[i] === str.length - 1) {
                const insertBack = `${str} ${word}`
                if (!cash.includes(insertBack)) {
                    cash.push(insertBack)
                    return insertBack
                }
            }

            if (randomIndexes[i] !== 0 && randomIndexes[i] !== str.length - 1) {
                const newPhrase = `${str.substring(
                    0,
                    randomIndexes[i]
                )} ${word}${str.substring(randomIndexes[i])}`

                if (!cash.includes(newPhrase)) {
                    cash.push(newPhrase)
                    return newPhrase
                }
            }
        }

        cash.length = 0
        return creatingNew(word)
    }
    return creatingNew
}

const insert = insertWordInto('hello world')
const result = insert('Odesa')
const secondResult = insert('Odesa')
const thirdResult = insert('Odesa')
const fourthResult = insert('Odesa')

console.log(result)
console.log(secondResult)
console.log(thirdResult)
console.log(fourthResult)
