'use strict'
;(function () {
    const restoreFromState = () => {
        const data = getWishes()
        const btns = document.querySelectorAll('[data-id]')
        btns.forEach((btn) => {
            const id = btn.getAttribute('data-id')
            if (data.includes(id)) {
                btn.textContent = 'DELETE'
                toggleClasses(btn)
            }
        })
    }
    const toggleClasses = (element) => {
        element.classList.toggle('btn-success')
        element.classList.toggle('btn-danger')
    }

    const getWishes = () => {
        const wishes = localStorage.getItem('wishes')
        return wishes === null ? [] : JSON.parse(wishes)
    }

    const clickHandler = (event) => {
        const { target } = event
        if (
            target.classList.contains('btn-danger') ||
            target.classList.contains('btn-success')
        ) {
            let data = getWishes()
            const id = event.target.getAttribute('data-id')
            if (data.includes(id)) {
                data = data.filter((item) => item !== id)
                target.textContent = 'ADD'
                toggleClasses(target)
            } else {
                data.push(id)
                target.textContent = 'DELETE'
                toggleClasses(target)
            }
            localStorage.setItem('wishes', JSON.stringify(data))
        }
    }
    const loadedHandler = (event) => {
        restoreFromState()
        const ul = document.querySelector('[data-list-group]')
        ul.addEventListener('click', clickHandler)
    }

    document.addEventListener('DOMContentLoaded', loadedHandler)
})()
