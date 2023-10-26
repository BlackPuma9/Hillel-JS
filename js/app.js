'use strict'

// Створити масив, довжину та елементи якого задає користувач.
// Відсортувати масив за зростанням.
// Видалити елементи з масиву з 2 по 4 (включно!).
// У міру змін виводити вміст масиву на сторінку.

const arr = prompt('Please create array').split(', ')
arr.length = +prompt('Array length')
alert(`Array created by user: ${arr}`)

const arrSort = arr.sort()
alert(`Array sorted in ascending order: ${arrSort}`)

arr.splice(2, 3)
alert(`Array without elements from 2 to 4: ${arr}`)
