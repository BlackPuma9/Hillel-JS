class PhotoModel {
    #apiUrl
    constructor(apiUrl) {
        this.#apiUrl = apiUrl
    }

    async getAlbumById(id) {
        const data = await fetch(this.#apiUrl + id)
        return await data.json()
    }
}
