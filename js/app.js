'use strict'

const cat = {
    name: 'Busia',
    surname: 'Kote',
}

const dog = {
    name: 'Biba',
    surname: 'Boba',
}

function getFullName(age) {
    return console.log(
        `Hi! I am ${this.name} ${this.surname} and I have ${age}`
    )
}

function bind(func, context, ...rest) {
    return function (...args) {
        context.addFunc = func
        const cumulatedArg = rest.concat(args)
        const result = context.addFunc(...cumulatedArg)
        delete context.addFunc
        return result
    }
}

bind(getFullName, cat, 10)()
bind(getFullName, cat)(2)
bind(getFullName, dog, 7)()
