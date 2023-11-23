'use strict'

;(() => {
    const random = Math.floor(Math.random() * 10 + 1)
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('[data-img]').src = `./img/${random}.jpg`
    })
})()

// Version 2
// ;(() => {
//     const random = Math.floor(Math.random() * 10 + 1)
//     document.querySelector('[data-img]').src = `./img/${random}.jpg`
// })()
