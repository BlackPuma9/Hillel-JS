'use strict'

const storage = new WeakSet()
function trackObjects(obj) {
    if (!storage.has(obj)) {
        storage.add(obj)
        return false
    }
    return true
}

const obj = { name: 'Yul' }
const result1 = trackObjects(obj)
const result2 = trackObjects(obj)
const result3 = trackObjects({ name: 'Alla' })

console.log(result1)
console.log(result2)
console.log(result3)
console.log(storage)
