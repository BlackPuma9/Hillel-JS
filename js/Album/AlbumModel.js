class AlbumModel {
    #apiUrl
    #apiPhotosUrl
    constructor(apiUrl, apiPhotosUrl) {
        this.#apiUrl = apiUrl
        this.#apiPhotosUrl = apiPhotosUrl
    }

    async getAlbums() {
        const data = await fetch(this.#apiUrl, { method: 'GET' })
        return await data.json()
    }
}
