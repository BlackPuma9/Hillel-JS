'use strict'
;(() => {
    const tab = document.querySelector('[data-tab]')
    tab.addEventListener('click', (event) => {
        document.querySelectorAll('li a').forEach((element) => {
            element.style.backgroundColor = ''
        })
        event.target.style.backgroundColor = '#303030'

        document.querySelectorAll('.tabContent').forEach((item) => {
            item.style.display = 'none'
        })

        const tabContentId = event.target.getAttribute('href').slice(1)
        document.getElementById(tabContentId).style.display = 'block'
    })
})()
