class PhotoController {
    #model = null
    #view = null
    constructor(apiURL) {
        this.#model = new PhotoModel(apiURL)
        this.#view = new PhotoView()

        this.#setEvents()
    }

    #setEvents() {
        document.addEventListener('DOMContentLoaded', this.#getPhotosList)
    }

    #getPhotosList = async () => {
        const searchParams = new URLSearchParams(window.location.search)
        if (!searchParams.has('albumId')) {
            this.#view.pageNotFound()
            return
        }
        const id = searchParams.get('albumId')
        try {
            const photosList = await this.#model.getAlbumById(id)
            this.#view.renderPhotos(photosList)
        } catch (error) {
            console.log(error)
        }
    }
}

new PhotoController('https://jsonplaceholder.typicode.com/photos?albumId=')
