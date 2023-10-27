'use strict'

const arr = [
    16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54,
    76, -4, 12, -35, 4, 47,
]

const positiveArr = arr.filter((num) => num > -1)
const length = positiveArr.length
const sum = positiveArr.reduce((prev, current) => prev + current)
console.log(`Amount of positive elements: ${length}`)
console.log(`Sum of positive elements: ${sum}`)

const minValue = Math.min(...arr)
console.log(`Min element in array: ${minValue}`)
console.log(`Index of min element in array: ${arr.indexOf(minValue)}`)

const maxValue = Math.max(...arr)
console.log(`Max element in array: ${maxValue}`)
console.log(`Index of max element in array: ${arr.indexOf(maxValue)}`)

const negativeAmount = arr.filter((num) => num < 0)
console.log(`Amount of negative elements in array: ${negativeAmount.length}`)

const odd = positiveArr.filter((num) => num % 2 !== 0)
console.log(`Amount of odd positive elements: ${odd.length}`)

const even = positiveArr.filter((num) => num % 2 === 0)
console.log(`Amount of even positive elements in array: ${even.length}`)

let positiveSum = 0
even.forEach((element) => {
    positiveSum += element
})
console.log(`Sum of even positive elements: ${positiveSum}`)

let negativeSum = 0
odd.forEach((element) => {
    negativeSum += element
})
console.log(`Sum of odd positive elements: ${negativeSum}`)

let product = 1
positiveArr.forEach((element) => {
    product *= element
})
console.log(`Product of positive array elements: ${product}`)

arr.map((number, index) => {
    number !== maxValue ? (arr[index] = 0) : (arr[index] = maxValue)
})

console.log(arr)
