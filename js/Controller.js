class Controller {
    #model = null
    #view = null

    constructor(apiUrl) {
        this.#model = new Model(apiUrl)
        this.#view = new View()

        this.#setEvents()
    }

    #setEvents() {
        document.addEventListener('DOMContentLoaded', this.#loadedHandler)
    }

    #loadedHandler = async () => {
        try {
            const albums = await this.#model.getAlbums()
            console.log(albums)
        } catch (error) {
            console.log(error)
        }
    }
}
