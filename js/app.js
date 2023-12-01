'use strict'
;(function () {
    const saveData = (data = null) => {
        localStorage.setItem('formData', JSON.stringify(data))
    }
    const formHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const { target } = event
        const data = {}
        target
            .querySelectorAll('input, textarea, select')
            .forEach((item) => (data[item.name] = item.value))
        saveData(data)
        target.reset()
    }

    const loadedHandler = (event) => {
        const form = document.querySelector('#form')
        form.addEventListener('submit', formHandler)
    }

    document.addEventListener('DOMContentLoaded', loadedHandler)
})()
