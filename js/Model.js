class Model {
    #apiUrl
    constructor(apiUrl) {
        this.#apiUrl = apiUrl
    }

    async getAlbums(queryParams = null) {
        let data = await fetch(this.#apiUrl, { method: 'GET' })
        return await data.json()
    }
}
