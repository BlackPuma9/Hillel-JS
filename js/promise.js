'use strict'

function checkPost(e) {
    e.preventDefault()
    const input = +document.getElementById('postId').value
    const error = document.getElementById('error')
    error.innerHTML = ''
    const form = document.getElementById('form')
    form.reset()
    if (isNaN(input) || input >= 100 || input <= 0) {
        error.innerHTML = 'Number is not valid. Provide number from 1 to 100'
        return
    }
    fetch(`https://jsonplaceholder.typicode.com/posts/${input}`)
        .then((response) => {
            if (response.status >= 400) {
                if (response.status === 404) {
                    error.innerHTML = `Post with ${input} not found`
                } else {
                    error.innerHTML = 'Something went wrong'
                }
                return null
            }
            return response.json()
        })
        .then((postResponse) => {
            if (postResponse !== null) {
                const post = document.getElementById('post')
                const li = document.createElement('li')
                li.setAttribute('data-item-post-id', postResponse.id)
                li.innerHTML = `<p>${postResponse.id}: ${postResponse.body}</p>
                    <button type='button' data-post-id='${postResponse.id}'>
                      Load comments
                    </button>
                    `
                post.append(li)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

function loadComment(event) {
    if (event.target.hasAttribute('data-post-id')) {
        const id = event.target.getAttribute('data-post-id')
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((response) => response.json())
            .then((comments) => {
                const commentList = document.createElement('ul')
                comments.forEach((comment) => {
                    const li = document.createElement('li')
                    li.innerHTML = comment.body
                    commentList.append(li)
                })
                document
                    .querySelector(`[data-item-post-id="${id}"]`)
                    .append(commentList)
                document.querySelector(`[data-post-id="${id}"]`).style.display =
                    'none'
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const submitBtn = document.getElementById('post-btn')
submitBtn.addEventListener('click', checkPost)
document.querySelector('main').addEventListener('click', loadComment)
