'use strict'

class TaskManager {
    #nextId = 1
    #tasks = new Map()
    addTask(description) {
        const id = this.#nextId
        if (this.#tasks.has(id)) {
            throw new Error(`Map already contains task with ${id} id`)
        }
        this.#tasks.set(id, description)
        ++this.#nextId
        return id
    }
    deleteTask(id) {
        if (!this.#tasks.has(id)) {
            throw new Error(`There is no such task with ${id} id`)
        }
        return this.#tasks.delete(id)
    }
    findTask(id) {
        if (!this.#tasks.has(id)) {
            throw new Error(`There is no such task with ${id} id`)
        }
        return this.#tasks.get(id)
    }
    displayTasks() {
        for (const [key, value] of this.#tasks) {
            console.log(`${key}: ${value}`)
        }
    }
    updateTaskDescription(id, newDescription) {
        if (!this.#tasks.has(id)) {
            throw new Error(`There is no such task with ${id} id`)
        }
        this.#tasks.set(id, newDescription)
    }
}

const taskManager = new TaskManager()

const taskId1 = taskManager.addTask('Buy products')
const taskId2 = taskManager.addTask('Buy crypto')
const taskId3 = taskManager.addTask('Buy car')
console.log(taskId1)
console.log(taskId2)
console.log(taskId3)

try {
    console.log(taskManager.deleteTask(taskId2))
    console.log(taskManager)

    console.log(taskManager.findTask(taskId3))

    taskManager.displayTasks()

    taskManager.updateTaskDescription(1, 'Buy new products')
    taskManager.updateTaskDescription(2, 'Buy new ...')
    console.log(taskManager)
} catch (e) {
    console.log(e)
}
