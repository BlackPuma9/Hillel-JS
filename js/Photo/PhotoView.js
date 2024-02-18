class PhotoView {
    #loaderSelector = '[data-loading]'

    renderPhotos(photos) {
        const photosDiv = document.getElementById('photos')
        const imgs = photos.map(this.createImg)
        photosDiv.append(...imgs)
        document.querySelector(this.#loaderSelector).replaceWith(photosDiv)
    }
    createImg(photo) {
        const img = document.createElement('img')
        img.className = 'rounded mb-3'
        img.setAttribute('src', photo.url)
        img.style.maxWidth = '200px'
        img.style.maxHeight = '200px'
        return img
    }

    pageNotFound() {
        const photosDiv = document.getElementById('photos')
        photosDiv.innerHTML = 'Page not found.....'
    }
}
