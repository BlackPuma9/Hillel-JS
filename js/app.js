'use strict'

const generateList = (array) => {
    const ul = document.createElement('ul')

    for (let i = 0; i < array.length; i++) {
        const li = document.createElement('li')

        if (Array.isArray(array[i])) {
            li.appendChild(generateList(array[i]))
        } else {
            li.textContent = `Element ${array[i]}`
        }

        ul.appendChild(li)
    }
    return ul
}
const nestedList = generateList([1, 2, [1.1, 1.2, 1.3], 3])
document.body.prepend(nestedList)
