'use strict'

const input = prompt('Enter a list of items separated by commas:')
const arr = input.split(', ')
arr.length = +prompt('Enter length of that array')
console.log(`Array created by user: ${arr}`)

arr.sort()
console.log(`Array sorted in ascending order: ${arr}`)

arr.splice(1, 3)
console.log(`Array without elements from 2 to 4: ${arr}`)
