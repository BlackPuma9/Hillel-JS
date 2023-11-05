'use strict'

const counter = (val = 0) => {
    return {
        counter: val,
        valueCounter: 0,
        increaseCounter: 0,
        decreaseCounter: 0,
        value() {
            this.valueCounter++
            return this.counter
        },
        increase() {
            this.increaseCounter++
            this.counter++
        },
        decrease() {
            this.decreaseCounter++
            this.counter--
        },
        getStatistic() {
            return {
                increase: this.increaseCounter,
                decrease: this.decreaseCounter,
                value: this.valueCounter,
            }
        },
        reset() {
            this.counter = 0
            this.valueCounter = 0
            this.increaseCounter = 0
            this.decreaseCounter = 0
        },
    }
}

const counter1 = counter(9)
console.log(counter1.value())
counter1.decrease()
console.log(counter1.value())
console.log(counter1.getStatistic())
counter1.reset()
console.log(counter1.getStatistic())
