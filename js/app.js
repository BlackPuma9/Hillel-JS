'use strict'

function analyzeText(phrase) {
    const newArr = phrase
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .split(' ')
    const uniqueSet = new Set(newArr)
    return {
        uniqueWordsCount: uniqueSet.size,
        uniqueWords: [...uniqueSet],
    }
}
const result = analyzeText('Hi Dear, my name Dear dear Olha hi my!')
console.log(result.uniqueWordsCount)
console.log(result.uniqueWords)
