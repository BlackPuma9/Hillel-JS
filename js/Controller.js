class Controller {
    #model = null
    #view = null
    #list = null

    constructor(apiUrl, apiPhotosUrl, domSelectors) {
        this.#list = document.querySelector(domSelectors.albumList)
        this.#model = new Model(apiUrl, apiPhotosUrl)
        this.#view = new View(domSelectors)

        this.#setEvents()
    }

    #setEvents() {
        document.addEventListener('DOMContentLoaded', this.#loadedHandler)
        this.#list.addEventListener('click', this.#viewDataHandler)
    }

    #loadedHandler = async () => {
        try {
            const albums = await this.#model.getAlbums()
            this.#view.renderAlbums(albums)
        } catch (error) {
            console.log(error)
        }
    }

    #viewDataHandler = async ({ target }) => {
        const albumId = target.getAttribute('data-id')
        try {
            const album = await this.#model.getAlbumById(albumId)
            console.log(album)
            // this.#view.renderAlbums(album)
        } catch (error) {
            console.log(error)
        }
    }
}
