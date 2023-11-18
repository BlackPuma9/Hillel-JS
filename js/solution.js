'use strict'
;(() => {
    const listElement = document.querySelectorAll('li')

    for (const element of listElement) {
        console.log(element.textContent)
    }

    const unorderedList = document.querySelector('ul')
    const attributes = unorderedList.attributes
    const attributeValue = []
    const attributeName = []

    for (const item of attributes) {
        attributeValue.push(item.value)
        attributeName.push(item)
    }
    console.log(attributeValue)
    console.log(attributeName)

    const lastLiElement = document.querySelector('ul li:last-child')
    lastLiElement.innerHTML = 'Hi! My name is Yuliia. Nice to me you!'

    const fistLiElement = document.querySelector('ul li:first-child')
    fistLiElement.setAttribute('data-my-name', 'Yuliia')

    const ul = document.querySelector('ul')
    ul.removeAttribute('data-dog-tail')
})()
