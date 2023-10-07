'use strict'

// Вивести на сторінку в один рядок через кому числа від 10 до 20.
let result = ''
for (let i = 10; i <= 20; i++) {
    result = result + (i === 20 ? i : i + ', ')
}
console.log(result)

// Вивести квадрати чисел від 10 до 20.
// for (let i = 10; i <= 20; i++) {
//     console.log(i * i)
// }

// Вивести таблицю множення на 7.
// for (let i = 1; i <= 10; i++) {
//     console.log(`7 * ${i} = ${7 * i}`)
// }

// Знайти суму всіх цілих чисел від 1 до 15.
// let sum = 0
// for (let i = 1; i <= 15; i++) {
//     sum += i
// }
// console.log(sum)

// Знайти добуток усіх цілих чисел від 15 до 35.
// let sum = 15
// for (let i = 16; i <= 35; i++) {
//     sum *= i
// }
// console.log(sum)

// Знайти середнє арифметичне всіх цілих чисел від 1 до 500.
// let sum = 0
// for (let i = 1; i <= 500; i++) {
//     sum += i
// }
// console.log(sum / 500)

// Вивести суму лише парних чисел в діапазоні від 30 до 80.
// let sum = 0
// for (let i = 30; i <= 80; i++) {
//     if (i % 2 === 0) {
//         sum += i
//     }
// }
// console.log(sum)

// Вивести всі числа в діапазоні від 100 до 200 кратні 3.
// for (let i = 100; i <= 200; i++) {
//     if (i % 3 === 0) {
//         console.log(i)
//     }
// }
// Дано натуральне число. Знайти та вивести на сторінку всі його дільники.
// const result = []
// let num = 10
//
// for (let i = 1; i <= num; i++) {
//     if (num % i === 0) {
//         result.push(i)
//     }
// }
// console.log(`Amount of numbers in array: ${result}`)

// Визначити кількість його парних дільників.
// let count = 0
// for (let i = 0; i <= result.length - 1; i++) {
//     if (result[i] % 2 === 0) {
//         count++
//     }
// }
// console.log(`Amount of even numbers in array: ${count}`)

// Знайти суму його парних дільників.
// let sum = 0
//
// for (const value of result) {
//     sum += value
// }
//
// console.log(`Sum of even numbers in array: ${sum}`)

// Надрукувати повну таблицю множення від 1 до 10.
// for (let j = 1; j <= 10; j++) {
//     for (let i = 1; i <= 10; i++) {
//         console.log(`${j} * ${i} = ${j} * ${i}`)
//     }
// }
