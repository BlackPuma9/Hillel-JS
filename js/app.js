'use strict'

const cache = new WeakMap()
function cacheComplexCalculations(obj, func) {
    if (!cache.has(obj)) {
        let result = func()

        cache.set(obj, result)
        return result
    }
    return cache.get(obj)
}

const obj = { name: 'Ira' }

const calc1 = cacheComplexCalculations(obj, () => {
    return Math.floor(Math.random() * 10)
})
const calc2 = cacheComplexCalculations(obj, () => {
    return Math.floor(Math.random() * 100)
})
const calc3 = cacheComplexCalculations({ name: 'Yan' }, () => {
    return Math.floor(Math.random() * 20)
})

console.log(calc1)
console.log(calc2)
console.log(calc3)
