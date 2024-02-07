class PhoneBook {
    #ATTRS = {
        dataUserId: 'data-user-id',
        dataRemoveBtn: 'data-remove-btn',
        dataCallBtn: 'data-call-btn',
        dataEndCallBtn: 'data-end-call-btn',
        dataAddBtn: 'data-add-btn',
        dataSaveContactBtn: 'data-save-contact-btn',
    }
    #modalWindow = null
    #modalForm = null
    callDurationEl = null
    #repository = null

    constructor() {
        this.#repository = new UserRepository()
        this.#modalWindow = new bootstrap.Modal('#exampleModal', {
            keyboard: false,
            backdrop: 'static',
        })

        this.#modalForm = new bootstrap.Modal('#exampleModal2', {
            keyboard: false,
            backdrop: 'static',
        })

        this.callDurationEl = this.#modalWindow._element.querySelector(
            '.modal-title .duration'
        )
        this.#setEvents()
    }

    list(data = null) {
        const ul = document.querySelector('#contacts')
        const li = data !== null ? data : this.#repository.getAll()
        ul.innerHTML = ''
        ul.prepend(...li.map((contact) => this.createContactTemplate(contact)))

        const ulHistory = document.querySelector('#history')
        const liHistory = callController.callHistory.map((call) =>
            this.createHistoryTemplate(call))
        ulHistory.innerHTML = ''
        ulHistory.prepend(...liHistory)
    }

    call(contactId) {
        const user = this.#repository.findById(contactId)
        console.log('call')
        console.log(contactId)
        this.#modalWindow._element.querySelector(
            '.modal-title .title'
        ).innerHTML = user.name
        this.#modalWindow._element.querySelector('.modal-body').innerHTML =
            'Conversation with ' + user.phone
        this.#modalWindow.show()

        callController.startCall(user)
    }
    removeContact(contactId) {
        this.#repository.delete(contactId)
        this.list()
    }

    search(searchStr) {
        const searchListResult = this.#repository.search(searchStr)
        const div = document.querySelector('.contacts__list')
        if (searchListResult.length !== 0) {
            this.list(searchListResult)
            return
        }
        div.innerHTML = 'No results found. Try again'
    }

    openAddForm = (event) => {
        const { target: element } = event
        event.stopPropagation()
        this.#modalForm.show()
        element.closest('.input-group').querySelector('input').value = ''
    }

    #saveUser = (event) => {
        const { target: element } = event
        event.stopPropagation()
        const name =
            document.querySelector('#inputName').value +
            ' ' +
            document.querySelector('#inputSurname').value
        const email = document.querySelector('#inputEmail4').value
        const phone = document.querySelector('#inputPhone').value
        const users = this.#repository.getAll()
        const id = users.length === 0 ? 1 : users[users.length - 1].id + 1
        const infoWarning = document.getElementById('form-warning')
        if (name.length === 0 || email.length === 0 || phone.length === 0) {
            infoWarning.innerHTML = '*Inputs can not be empty'
            return
        }
        const user = {
            id,
            name,
            email,
            phone,
        }
        this.#repository.create(user)
        infoWarning.innerHTML = ''
        this.#modalForm.hide()
        document.getElementById('addContactForm').reset()
        this.list()
    }

    #setEvents() {
        Call.addChangeStatusListener(
            Call.EVENT_TYPES.changeStatus,
            this.#trackCallStatus
        )
        Call.addChangeStatusListener(
            Call.EVENT_TYPES.changeDuration,
            this.#trackCallDuration
        )

        document.addEventListener('DOMContentLoaded', () => this.list())

        document
            .querySelector('[data-end-call]')
            .addEventListener('click', this.#endCallHandler)

        const ul = document.querySelector('.list-group')
        ul.addEventListener('click', this.#removeHandler)

        const searchBtn = document.querySelector('[data-search-btn]')
        searchBtn.addEventListener('click', this.#searchHandler)

        ul.addEventListener('click', this.#callHandler)

        this.#modalWindow._element
            .querySelector(`[${this.#ATTRS.dataEndCallBtn}]`)
            .addEventListener('click', this.#endCall)

        document
            .querySelector(`[${this.#ATTRS.dataAddBtn}]`)
            .addEventListener('click', this.openAddForm)

        document
            .querySelector(`[${this.#ATTRS.dataSaveContactBtn}]`)
            .addEventListener('click', this.#saveUser)
    }

    #endCallHandler = () => {
        callController.endCallByCaller()
    }

    #removeHandler = (event) => {
        const { target: element } = event
        event.stopPropagation()
        if (
            !element
                .closest(`[${this.#ATTRS.dataRemoveBtn}]`)
                ?.hasAttribute(this.#ATTRS.dataRemoveBtn)
        )
            return
        const userId = +element
            .closest(`[${this.#ATTRS.dataUserId}]`)
            .getAttribute(this.#ATTRS.dataUserId)
        this.removeContact(userId)
    }

    #searchHandler = (event) => {
        const { target: element } = event
        event.stopPropagation()
        this.search(
            element.closest('.input-group').querySelector('input').value
        )
    }

    #callHandler = (event) => {
        const { target: element } = event
        event.stopPropagation()
        if (
            !element
                .closest(`[${this.#ATTRS.dataCallBtn}]`)
                ?.hasAttribute(this.#ATTRS.dataCallBtn)
        )
            return
        const userId = +element
            .closest(`[${this.#ATTRS.dataUserId}]`)
            .getAttribute(this.#ATTRS.dataUserId)
        this.call(userId)
    }

    #endCall = () => {
        callController.endCall()
        this.#modalWindow.hide()
        this.callDurationEl.innerHTML = '00:00'
        this.list()
    }

    #trackCallStatus = (newStatus) => {
        if (
            newStatus === Call.CALL_STATUSES.rejected ||
            newStatus === Call.CALL_STATUSES.disconnect
        ) {
            this.#endCall()
        }
    }

    #trackCallDuration = (duration) => {
        this.callDurationEl.innerHTML = '00:0' + duration
    }

    createContactTemplate(user) {
        const wrapper = document.createElement('div')
        wrapper.className =
            'list-group-item d-flex justify-content-between align-items-center rounded-pill bg-secondary text-white mb-1'
        wrapper.setAttribute('data-user-id', user.id)

        wrapper.innerHTML = `<span class="contacts__contact">${user.name}</span>
                            <div> 
                                <button type="button" ${
                                    this.#ATTRS.dataCallBtn
                                } class="btn btn-success rounded-pill">
                                    <i class="bi bi-telephone"></i>
                                </button>

                                <button type="button" ${
                                    this.#ATTRS.dataRemoveBtn
                                } class="btn btn-danger rounded-pill">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>`
        return wrapper
    }

    createHistoryTemplate(call) {
        const historyText = document.getElementById('call-history-text')
        historyText.innerHTML = ''

        const wrapper = document.createElement('div')
        wrapper.className =
            'list-group-item d-flex justify-content-between align-items-center bg-secondary text-white mb-1 rounded-pill'
        wrapper.setAttribute('data-user-id2', call.phone.id)

        wrapper.innerHTML = `<span class="contacts__contact">${call.phone.name}</span>
                            <div>${call.status}</div>`
        return wrapper
    }
}

const phoneBook = new PhoneBook()
