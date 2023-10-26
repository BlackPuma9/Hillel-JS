'use strict'

const input = prompt('Enter a list of items separated by commas:')
const arr = input.split(', ')
arr.length = +prompt('Enter length of that array')
console.log(`Array created by user: ${arr}`)

arr.sort((a, b) => {
    let x = a.toLowerCase()
    let y = b.toLowerCase()
    return x === y ? 0 : x > y ? 1 : -1
})
console.log(`Array sorted in ascending order: ${arr}`)

arr.splice(2, 3)
console.log(`Array without elements from 2 to 4: ${arr}`)
