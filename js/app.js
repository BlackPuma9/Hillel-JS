'use strict'
;(() => {
    // Task 1
    // const reverseIterator = (array) => {
    //     let nextIndex = array.length
    //     return {
    //         next: () => {
    //             nextIndex--
    //             const done = nextIndex < 0
    //             return {
    //                 value: !done ? array[nextIndex] : null,
    //                 done: done,
    //             }
    //         },
    //         [Symbol.iterator]() {
    //             return this
    //         },
    //     }
    // }
    //
    // const arr = reverseIterator([11, 12, 13, 14, 15])
    // console.log(arr.next().value)
    // console.log(arr.next().value)
    // console.log(arr.next().value)
    // console.log(arr.next().value)
    // console.log(arr.next().value)
    // console.log(arr.next().done)
    //
    // for (let item of reverseIterator([16, 17, 18, 19, 20])) {
    //     console.log(item)
    // }

    // Task 2
    function* fibonacci() {
        let num1 = 0
        let num2 = 1

        while (true) {
            let next = num1 + num2

            yield num2 > 2 ? next : num2

            num1 = num2
            num2 = next
        }
    }

    const sequence = fibonacci()

    for (let i = 0; i < 10; i++) {
        console.log(sequence.next())
    }
})()
