'use strict'

const arr = [1, 2, 3, 4, {}, [1, 2, 3], [1, 2, 3], [3, 4, [5, 6, 7]]]

const flat = (arr) => {
    return arr.reduce((prev, current) => {
        if (Array.isArray(current)) {
            prev = prev.concat(flat(current))
        } else {
            prev.push(current)
        }

        return prev
    }, [])
}

console.log(flat(arr))
console.log(flat(arr))

// Second version more similar to what we have in the task

//
// const outerFlat = (array) => {
//     const res = []
//     const flat = (arr) => {
//         for (let i = 0; i < arr.length; i++) {
//             if (Array.isArray(arr[i])) {
//                 flat(arr[i])
//             } else {
//                 res.push(arr[i])
//             }
//         }
//     }
//     flat(array)
//     return res
// }
//
// console.log(outerFlat(arr))
// console.log(outerFlat(arr))
