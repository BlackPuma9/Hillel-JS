class Call {
    #debugFlag = true
    #connectionTimeout = 2000
    #connectionTimer = null

    #inProgressTimeout = 3000
    #inProgressTimer = null

    static CALL_STATUSES = {
        disconnect: 'disconnect',
        rejected: 'rejected',
        connecting: 'connecting',
        inProgress: 'in progress',
    }
    static changeStatusHandlers = []
    #timerId = null
    #duration = 0
    #startDate = null
    #endDate = null
    #phone = null
    #status = null

    constructor(phoneNumber) {
        if (!Call.validatePhoneNumber(phoneNumber)) {
            throw new Error(`Number ${phoneNumber.phone} is not correct`)
        }

        this.#phone = phoneNumber
        this.#changeCallStatus(Call.CALL_STATUSES.connecting)
    }

    #changeCallStatus(status) {
        this.#status = status
        // this.#debug(this.changeStatusHandlers)

        if (this.#status === Call.CALL_STATUSES.connecting) {
            this.#debug(Call.CALL_STATUSES.connecting)
            this.#startCalcCallDuration()
            this.#startDate = new Date()
            this.#connectionTimer = setTimeout(
                () => this.#changeCallStatus(Call.#getRandomCallStatus()),
                this.#connectionTimeout
            )
        }

        if (this.#status === Call.CALL_STATUSES.inProgress) {
            this.#debug(Call.CALL_STATUSES.inProgress)
            this.#inProgressTimer = setTimeout(
                () => this.#changeCallStatus(Call.CALL_STATUSES.disconnect),
                this.#inProgressTimeout
            )
        }

        if (this.#status === Call.CALL_STATUSES.rejected) {
            this.#debug(Call.CALL_STATUSES.rejected)
            this.#endCall()
        }

        if (this.#status === Call.CALL_STATUSES.disconnect) {
            this.#debug(Call.CALL_STATUSES.disconnect)
            this.#endCall()
        }

        this.#callEventHandlers(this.#status)
    }

    #endCall() {
        clearTimeout(this.#connectionTimer)
        clearTimeout(this.#inProgressTimer)
        this.#connectionTimer = null
        this.#inProgressTimer = null

        this.#endCalcCallDuration()
        this.#endDate = new Date()
    }

    endCallOutside() {
        this.#changeCallStatus(Call.CALL_STATUSES.disconnect)
    }
    static #getRandomCallStatus() {
        const randomNum = Math.floor(Math.random() * 10)
        return randomNum >= 5
            ? Call.CALL_STATUSES.inProgress
            : Call.CALL_STATUSES.rejected
    }

    #startCalcCallDuration() {
        this.#timerId = setInterval(() => {
            this.#duration += 1
        }, 1000)
    }

    #endCalcCallDuration() {
        clearInterval(this.#timerId)
        this.#timerId = null
    }

    #debug(data) {
        if (!this.#debugFlag) return

        if (typeof data === 'object') {
            console.log(data)
        }

        console.log(data)
    }
    static validatePhoneNumber(phoneNumber) {
        let validated = false

        if (
            typeof phoneNumber.phone === 'string' &&
            phoneNumber.phone.trim().length > 2
        ) {
            validated = true
        }

        return validated
    }

    #callEventHandlers(...data) {
        Call.changeStatusHandlers.forEach((handler) => {
            handler(...data)
        })
    }

    static addChangeStatusListener(handler) {
        if (typeof handler !== 'function') return
        Call.changeStatusHandlers.push(handler)
    }

    static removeChangeStatusListener(handler) {
        if (typeof handler !== 'function') return
        if (this.changeStatusHandlers.length === 0) return

        const handlerIndex = Call.changeStatusHandlers.findIndex((item) => {
            return handler === item
        })

        Call.changeStatusHandlers.splice(handlerIndex, 1)
    }
}
