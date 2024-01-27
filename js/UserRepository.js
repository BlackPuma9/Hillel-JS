class UserRepository {
    create(user) {
        console.log('repository create')
        console.log(user)
        const data = this.getAll()
        data.unshift(user)
        localStorage.setItem('users', JSON.stringify(data))
    }

    getAll() {
        const data = JSON.parse(localStorage.getItem('users'))
        return data ? data : []
    }

    findById(userId) {
        return this.getAll().find(({ id }) => id === userId)
    }

    delete(id) {
        const data = this.getAll().filter((user) => user.id !== id)
        localStorage.setItem('users', JSON.stringify(data))
    }

    search(params) {
        return this.getAll().filter(
            (user) =>
                user.name?.includes(params) ||
                user.phone?.includes(params) ||
                user.email?.includes(params)
        )
    }
}
