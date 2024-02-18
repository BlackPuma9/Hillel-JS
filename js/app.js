'use strict'

const domSelectors = {
    albumList: '[data-albums]',
    loaderSelector: '[data-loading]',
}

new AlbumController(
    'https://jsonplaceholder.typicode.com/albums',
    'https://jsonplaceholder.typicode.com/photos?albumId=',
    domSelectors
)
