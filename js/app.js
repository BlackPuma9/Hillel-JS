'use strict'
;(() => {
    const saveData = (key, data = null) => {
        localStorage.setItem(key, JSON.stringify(data))
        return data
    }

    const getData = (key) => {
        let data = localStorage.getItem(key)
        data = JSON.parse(data)
        return data
    }

    const changeBackground = (body) => {
        const data = getData('background')
        if (data === null) return
        const { background } = data
        body.classList.add(...background.split(' '))
    }

    const selectHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const {
            target: { value },
        } = event
        const data = {}
        data['background'] = value
        saveData('background', data)
    }
    const loadedHandler = (event) => {
        const select = document.querySelector('select')
        const body = document.querySelector('body')
        changeBackground(body)
        select.addEventListener('change', selectHandler)
    }

    document.addEventListener('DOMContentLoaded', loadedHandler)
})()
