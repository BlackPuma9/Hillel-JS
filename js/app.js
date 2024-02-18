'use strict'

const domSelectors = {
    albumList: '[data-albums]',
    loaderSelector: '[data-loading]',
}

// const fieldsToOutput = ['id', 'title']

new Controller(
    'https://jsonplaceholder.typicode.com/albums',
    'https://jsonplaceholder.typicode.com/photos?albumId=',
    domSelectors
)
