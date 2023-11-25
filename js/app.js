'use strict'
;(() => {
    const modalWindow = document.getElementById('modalWindow')
    const container = document.getElementById('container')
    const modalImg = document.getElementById('modalImage')
    const imgText = document.getElementById('imgText')

    container.addEventListener('click', (event) => {
        modalWindow.style.display = 'block'
        modalImg.src = event.target.src
        imgText.innerHTML = event.target.alt
    })

    const closeBtn = document.getElementById('closeBtn')

    closeBtn.addEventListener('click', () => {
        modalWindow.style.display = 'none'
    })
})()
