class Model {
    #apiUrl
    #apiPhotosUrl
    constructor(apiUrl, apiPhotosUrl) {
        this.#apiUrl = apiUrl
        this.#apiPhotosUrl = apiPhotosUrl
    }

    async getAlbums(queryParams = null) {
        let data = await fetch(this.#apiUrl, { method: 'GET' })
        return await data.json()
    }

    async getAlbumById(id) {
        let data = await fetch(this.#apiPhotosUrl + id)
        return await data.json()
    }
}
