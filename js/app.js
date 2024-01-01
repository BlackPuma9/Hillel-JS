'use strict'
;(() => {
    const reverseIterator = (array) => {
        let nextIndex = array.length
        return {
            next: () => {
                nextIndex--
                const done = nextIndex < 0
                return {
                    value: !done ? array[nextIndex] : null,
                    done: done,
                }
            },
            [Symbol.iterator]() {
                return this
            },
        }
    }

    const arr = reverseIterator([11, 12, 13, 14, 15])
    console.log(arr.next().value)
    console.log(arr.next().value)
    console.log(arr.next().value)
    console.log(arr.next().value)
    console.log(arr.next().value)
    console.log(arr.next().done)

    for (let item of reverseIterator([16, 17, 18, 19, 20])) {
        console.log(item)
    }
})()
