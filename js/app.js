'use strict'
;(function () {
    const user = {
        name: 'Yuliia',
    }
    Object.defineProperty(user, 'name', {
        writable: false,
    })

    Object.defineProperty(user, 'age', {
        value: 28,
        writable: true,
        enumerable: false,
        configurable: true,
    })

    for (let key in user) {
        console.log(key, user[key])
    }

    console.log(Object.keys(user))

    // Object.defineProperties(user, {
    //     surname: {
    //         value: 'Yavorska',
    //         writable: true,
    //         enumerable: true,
    //         configurable: true,
    //     },
    //     fullName: {
    //         get() {
    //             return this.name + ' ' + this.surname
    //         },
    //         set(value) {
    //             this.name = value.split(' ')[0]
    //             this.surname = value.split(' ')[1]
    //         },
    //     },
    // })
    // console.log(`Before the change: ${user.fullName}`)
    // user.name = 'Maria'
    // user.surname = 'Pertivna'
    // console.log(`After the change: ${user.fullName}`)

    // const user2 = {
    //     name: 'Katia',
    //     surname: 'Kalyna',
    //     age: 30,
    // }
    // Object.freeze(user2)
    //
    // Object.defineProperties(user2, {
    //     name: {
    //         writable: true,
    //         enumerable: false,
    //         configurable: false,
    //     },
    //     age: {
    //         value: 25,
    //     },
    // })
    //
    // let descriptor = Object.getOwnPropertyDescriptor(user2, 'name')
    // let descriptor2 = Object.getOwnPropertyDescriptor(user2, 'age')
    // console.log(descriptor)
    // console.log(descriptor2)
})()
