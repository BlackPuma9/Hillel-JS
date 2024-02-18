class AlbumController {
    #model = null
    #view = null
    #list = null

    constructor(apiUrl, apiPhotosUrl, domSelectors) {
        this.#list = document.querySelector(domSelectors.albumList)
        this.#model = new AlbumModel(apiUrl, apiPhotosUrl)
        this.#view = new AlbumView(domSelectors)

        this.#setEvents()
    }

    #setEvents() {
        document.addEventListener('DOMContentLoaded', this.#loadedHandler)
    }

    #loadedHandler = async () => {
        try {
            const albums = await this.#model.getAlbums()
            this.#view.renderAlbums(albums)
        } catch (error) {
            console.log(error)
        }
    }
}
