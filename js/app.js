'use strict'
;(() => {
    const tab = document.querySelector('[data-tab]')
    tab.addEventListener('click', (event) => {
        const tabContentId = event.target.getAttribute('href')

        document.querySelectorAll('.tabContent').forEach((item) => {
            item.style.display = 'none'
        })

        const newId = tabContentId.slice(1)
        document.getElementById(newId).style.display = 'block'
    })
})()
