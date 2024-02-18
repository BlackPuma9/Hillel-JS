class AlbumView {
    #albumListSelector = null
    #list = null
    #loaderSelector = null
    constructor(selectors) {
        this.#albumListSelector = selectors.albumList
        this.#loaderSelector = selectors.loaderSelector
        this.#list = document.querySelector(this.#albumListSelector)
    }

    renderAlbums(data) {
        for (const value of data) {
            const anchor = this.createListItem(value)
            this.#list.append(anchor)
        }
        document.querySelector(this.#loaderSelector).replaceWith(this.#list)
        return this.#list
    }

    createListItem(album) {
        const anchor = document.createElement('a')
        anchor.setAttribute('href', `./pages/photos.html?albumId=${album.id}`)
        // anchor.setAttribute('data-id', album.id)
        anchor.setAttribute('target', '_blank')
        anchor.className = 'list-group-item list-group-item-action'
        anchor.innerHTML = `${album.id}. ${album.title}`
        return anchor
    }
}
