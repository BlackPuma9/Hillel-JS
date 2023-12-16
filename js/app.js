'use strict'
;(function () {
    const CONSTANTS = {
        todoFormSelector: '#todoForm',
        todoContainerSelector: '#todoItems',
        dataKey: 'formData',
    }

    const controller = {
        formHandler(e) {
            e.preventDefault()
            e.stopPropagation()
            const { target } = e

            const data = {}
            Array.from(target.querySelectorAll('input')).forEach(
                ({ name, value }) => {
                    data[name] = value
                }
            )

            // const data = Array.from(
            //     target.querySelectorAll('input, textarea')
            // ).reduce((acc, item) => {
            //     acc[item.name] = item.value
            //     return acc
            // }, {})

            const savedData = model.save(data)

            if (savedData) {
                view.renderElement(savedData)
                view.resetForm()
            }
        },

        removeTodoItemHandler: (e) => {
            e.stopPropagation()
            const { target } = e
            if (!target.hasAttribute('data-remove-btn')) return
            const todoId = +target
                .closest('[data-todo-item]')
                .getAttribute('data-todo-item')
            const removedElement = model.removeElementById(todoId)

            if (removedElement) {
                view.removeElement(todoId)
                return
            }
            alert('Can not remove element' + removedElement.title)
        },

        loadedHandler() {
            model.initId()
            const form = document.querySelector(CONSTANTS.todoFormSelector)
            form.addEventListener('submit', this.formHandler.bind(this))
            model.get().forEach((item) => {
                view.renderElement(item)
            })
            const todoContainer = document.querySelector(
                CONSTANTS.todoContainerSelector
            )
            todoContainer.addEventListener(
                'click',
                this.removeTodoItemHandler.bind(this)
            )
        },

        init() {
            document.addEventListener(
                'DOMContentLoaded',
                this.loadedHandler.bind(this)
            )
        },
    }

    const view = {
        renderElement(data) {
            const template = this.createTemplate(data)
            this.renderTodoItem(template)
        },

        renderTodoItem(elementToRender) {
            const todoContainer = document.querySelector('#todoItems')
            todoContainer.prepend(elementToRender)
            return elementToRender
        },

        createTemplate(data) {
            const wrapper = document.createElement('div')
            wrapper.className = 'col-12'
            wrapper.setAttribute('data-todo-item', data.id)

            wrapper.innerHTML = `
             <div class="taskWrapper">
                  <div class="taskHeading">${data.title}</div>
                  <button class="btn btn-close" data-remove-btn aria-label='Close'></button>
             </div>
            `
            return wrapper
        },

        resetForm() {
            document.querySelector(CONSTANTS.todoFormSelector).reset()
        },

        removeElement(todoId) {
            document.querySelector(`[data-todo-item="${todoId}"]`).remove()
        },
    }

    const model = {
        currentId: 0,
        save(data) {
            ++this.currentId
            const dataCopy = { id: this.currentId, ...data }

            const savedData = this.get()
            savedData.push(dataCopy)

            try {
                localStorage.setItem(
                    CONSTANTS.dataKey,
                    JSON.stringify(savedData)
                )
                return this.get().at(-1)
            } catch (e) {
                return false
            }
        },

        get() {
            const saveData = JSON.parse(localStorage.getItem(CONSTANTS.dataKey))
            return saveData ? saveData : []
        },

        removeElementById(todoId) {
            const savedElements = this.get()
            const index = savedElements.findIndex(({ id }) => {
                return todoId === id
            })
            const [removedElement] = savedElements.splice(index, 1)
            try {
                localStorage.setItem(
                    CONSTANTS.dataKey,
                    JSON.stringify(savedElements)
                )
                return removedElement
            } catch (e) {
                console.log('Can not remove element', removedElement)
                return false
            }
        },

        initId() {
            const items = this.get()
            if (!items.length) return
            this.currentId = +items.at(-1).id
        },
    }
    controller.init()
})()
