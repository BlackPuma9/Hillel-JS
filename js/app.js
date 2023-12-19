'use strict'
;(function () {
    const controller = {
        todoFormSelector: '#todoForm',
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
            model.addLineThoughElementById(todoId, checked)
            view.addLineThough(lineThoughElement)
        },

        loadedHandler() {
            model.initId()
            const form = document.querySelector(this.todoFormSelector)
            form.addEventListener('submit', this.formHandler.bind(this))
            model.get().forEach((item) => {
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
        todoFormSelector: '#todoForm',
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
            document.querySelector(this.todoFormSelector).reset()
        },

        removeElement(todoId) {
            document.querySelector(`[data-todo-item="${todoId}"]`).remove()
        },

        addLineThough(lineThoughElement) {
            lineThoughElement.classList.toggle('text-decoration-line-through')
        },
    }

    const model = {
        dataKey: 'formData',
        currentId: 1,
        save(data) {
            const dataCopy = { id: this.currentId, checked: false, ...data }
            const savedData = this.get()
            savedData.push(dataCopy)

            try {
                localStorage.setItem(this.dataKey, JSON.stringify(savedData))
                this.currentId += 1
                return this.get().at(-1)
            } catch (e) {
                return false
            }
        },

        get() {
            const saveData = JSON.parse(localStorage.getItem(this.dataKey))
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
                    this.dataKey,
                    JSON.stringify(savedElements)
                )
                return removedElement
            } catch (e) {
                console.log('Can not remove element', removedElement)
                return false
            }
        },

        addLineThoughElementById(todoId, checked) {
            const savedElements = this.get()
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
        },

        initId() {
            const items = this.get()
            if (!items.length) return
            this.currentId = +items.at(-1).id
        },
    }
    controller.init()
})()
