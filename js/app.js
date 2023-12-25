'use strict'
;(function () {
    const todoFormSelector = '#todoForm'

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
            const savedData = model.save(data)

            if (!savedData) {
                return
            }

            view.renderElement(savedData)
            view.resetForm()
        },

        removeTodoItemHandler: (e) => {
            e.stopPropagation()
            const { target } = e
            if (!target.hasAttribute('data-remove-btn')) return
            const todoId = +target
                .closest('[data-todo-item]')
                .getAttribute('data-todo-item')
            model.removeElementById(todoId)

            view.removeElement(todoId)
        },

        checkedInput: (e) => {
            e.stopPropagation()
            const { target } = e
            const { checked } = e.target
            if (!target.hasAttribute('data-check-input')) return
            const lineThoughElement = target
                .closest('.taskWrapper')
                .querySelector('.taskHeading')
            const todoId = +target
                .closest('[data-todo-item]')
                .getAttribute('data-todo-item')
            const lineThough = model.addLineThoughElementById(todoId, checked)

            if (lineThough) {
                view.addLineThough(lineThoughElement)
                return
            }

            alert('Can not perform addLineThoughElementById function')
        },

        loadedHandler() {
            model.initId()
            const form = document.querySelector(todoFormSelector)
            form.addEventListener('submit', this.formHandler.bind(this))
            model.all.forEach((item) => {
                view.renderElement(item)
            })
            const todoContainer = document.querySelector('#todoItems')
            todoContainer.addEventListener(
                'click',
                this.removeTodoItemHandler.bind(this)
            )
            todoContainer.addEventListener(
                'click',
                this.checkedInput.bind(this)
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
                 <div class='d-flex align-items-center mt-0'>
                      <input class="form-check-input" type="checkbox" data-check-input>
                      <div class="taskHeading ${
                          data.checked ? 'text-decoration-line-through' : ''
                      }">${data.title}</div>
                 </div>
                      <button class="btn btn-close" data-remove-btn aria-label='Close'></button>
             </div>
            `
            if (data.checked) {
                const tick = wrapper.querySelector('[data-check-input]')
                tick.setAttribute('checked', '')
            }
            return wrapper
        },

        resetForm() {
            document.querySelector(todoFormSelector).reset()
        },

        removeElement(todoId) {
            document.querySelector(`[data-todo-item="${todoId}"]`).remove()
        },

        addLineThough(lineThoughElement) {
            lineThoughElement.classList.toggle('text-decoration-line-through')
        },
    }

    const model = {
        get dataKey() {
            return 'formData'
        },
        currentId: 1,
        get nextId() {
            return this.currentId
        },
        set nextId(id) {
            this.currentId = id
        },

        save(data) {
            const dataCopy = { id: this.nextId, checked: false, ...data }
            const savedData = this.all
            savedData.push(dataCopy)

            localStorage.setItem(this.dataKey, JSON.stringify(savedData))
            this.nextId += 1
            return this.all.at(-1)
        },

        get all() {
            const saveData = JSON.parse(localStorage.getItem(this.dataKey))
            return saveData ? saveData : []
        },

        removeElementById(todoId) {
            const data = this.all.filter((item) => item.id !== todoId)

            localStorage.setItem(this.dataKey, JSON.stringify(data))
        },

        addLineThoughElementById(todoId, checked) {
            const savedElements = this.all

            try {
                savedElements.forEach((item) => {
                    if (item.id === todoId && checked === true) {
                        item['checked'] = true
                        localStorage.setItem(
                            this.dataKey,
                            JSON.stringify(savedElements)
                        )
                    }
                    if (item.id === todoId && checked === false) {
                        delete item['checked']
                        localStorage.setItem(
                            this.dataKey,
                            JSON.stringify(savedElements)
                        )
                    }
                })
                return true
            } catch (e) {
                console.log('Not able to update line though in element')
                return false
            }
        },

        initId() {
            const items = this.all
            if (!items.length) return
            this.nextId = items.at(-1).id + 1
        },
    }
    controller.init()
})()
