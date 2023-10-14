'use strict'

// Потрібно створити функцію, яка буде зводити число в ступінь
//
// Запитуємо у користувача число (за допомогою prompt)
const number = prompt('Please provide random positive number')
// Запитуємо у користувача ступінь, в який це число потрібно звести (за допомогою prompt)
const numPower = prompt('Please provide random positive number')
// Створюємо функцію, яка приймає 2 аргументи (число, ступінь)
//
const powering = function (number, numPower = 1) {
    if (!isValidValue(number) && !isValidValue(numPower)) {
        return 'some error'
    }
    return Math.pow(number, numPower)
}

const isValidValue = (val) => {
    if (typeof val === 'string' && val.length === 0) {
        return false
    }

    return /^[0-9]*$/.test(val)
}

alert(powering(number, numPower))
// Задаємо аргументу, який приймає ступінь значення за замовчуванням.
//
//Усередині функції потрібно написати перевірку, якщо аргументи не є числами завершити функцію із зазначенням того, що користувач ввів неправильні дані, наприклад (return ‘some error’)
//
// Якщо перевірка пройшла успішно, то звести число до ступеня (працюємо з аргументами функції)
//
// Повернути результат виконання функції та завершити її
//
// Результат виклику функції записати в змінну та вивести користувачеві через alert()
//
// P.S. Для зведення в ступінь можна використовувати
//
// Math.pow() — https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
//
//     Оператор ** приклад (2 ** 8) - зводимо число 2 до 8-го ступеня
