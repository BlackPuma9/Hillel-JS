'use strict'

function insertWordInto(phrase = '') {
    const cash = []
    const creatingNew = (word) => {
        const insertStart = `${word} ${phrase}`
        if (!cash.includes(insertStart)) {
            cash.push(insertStart)
            return insertStart
        }
        const insertBack = `${phrase} ${word}`
        if (!cash.includes(insertBack)) {
            cash.push(insertBack)
            return insertBack
        }

        for (let i = 0; i < phrase.length; i++) {
            if (phrase[i] === ' ') {
                const newPhrase = `${phrase.substring(
                    0,
                    i
                )} ${word} ${phrase.substring(i + 1)}`
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
const fifth = insert('Odesa')

console.log(result)
console.log(secondResult)
console.log(thirdResult)
console.log(fifth)
