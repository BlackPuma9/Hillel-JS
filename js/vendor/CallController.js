class CallController {
    #currentCall = null
    #callHistory = []

    constructor() {
        Call.addChangeStatusListener(
            Call.EVENT_TYPES.changeStatus,
            this.#trackCallStatus
        )
    }
    startCall(phoneNumber) {
        console.log('startCall start')
        if (this.#currentCall) {
            console.warn('You currently no call!')
            return this.#currentCall
        }

        this.#currentCall = new Call(phoneNumber)
    }

    endCall() {
        if (!this.#currentCall) {
            console.warn('Current call is not exist 404')
            return null
        }

        this.#callHistory.push(Object.freeze(this.#currentCall))
        this.#currentCall = null
    }

    endCallByCaller() {
        if (!this.#currentCall) {
            console.warn('Current call is not exist 404')
            return null
        }

        this.#currentCall.endCallOutside()
        this.#callHistory.push(Object.freeze(this.#currentCall))
        this.#currentCall = null
    }

    #trackCallStatus() {
        Call.addChangeStatusListener((callStatus) => {
            if (
                callStatus === Call.CALL_STATUSES.disconnect ||
                callStatus === Call.CALL_STATUSES.rejected
            ) {
                this.endCall()
            }
        })
    }

    get currentCall() {
        return this.#currentCall
    }
    get callHistory() {
        return this.#callHistory
    }
}

const callController = new CallController()
