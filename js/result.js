'use strict'
;(() => {
    let data = localStorage.getItem('formData')
    data = JSON.parse(data)
    if (data === null)
        return alert(
            'Local Storage is Empty. Submit the form to show the data on the page.'
        )

    const ul = document.querySelector('[data-list]')

    for (let key in data) {
        const li = document.createElement('li')
        li.className = 'list-group-item'
        li.textContent = `${key}: ${data[key]}`
        ul.appendChild(li)
    }
})()
