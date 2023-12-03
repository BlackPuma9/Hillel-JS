'use strict'
;(function () {
    const restoreFromState = () => {
        const data = getLocalStore()
        const btns = document.querySelectorAll('[data-id]')
        btns.forEach((btn) => {
            const id = btn.getAttribute('data-id')
            if (data.hasOwnProperty(id)) {
                console.log(data)
                btn.classList.toggle('disabled')
            }
        })
    }

    const getLocalStore = () => {
        const result = localStorage.getItem('result')
        return result === null ? {} : JSON.parse(result)
    }

    const changingBtnsState = (event) => {
        const parentElement = event.target.parentNode
        const btns = parentElement.querySelectorAll('.btn')
        btns.forEach((btn) => {
            btn.classList.toggle('disabled')
        })
    }

    const addBtnHandler = (event) => {
        const { target } = event
        if (
            target.classList.contains('btn-success') ||
            target.classList.contains('btn-danger')
        ) {
            let data = getLocalStore()
            const id = event.target.getAttribute('data-id')
            if (data.hasOwnProperty(id)) {
                for (let key in data) {
                    if (id === key) {
                        delete data[key]
                    }
                }
            } else {
                data[id] = target.textContent
            }
            changingBtnsState(event)
            localStorage.setItem('result', JSON.stringify(data))
        }
    }

    const loadedHandler = (event) => {
        restoreFromState()
        const ul = document.querySelector('[data-list-group]')
        ul.addEventListener('click', addBtnHandler)
    }

    document.addEventListener('DOMContentLoaded', loadedHandler)
})()
