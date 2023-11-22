'use strict'

const input = document.querySelector('[data-input]')

input.addEventListener('focus', () => {
    document.querySelector('[data-msg-error]').style.display = 'inline-block'
})

input.addEventListener('blur', () => {
    document.querySelector('[data-msg-error]').style.display = 'none'
})
