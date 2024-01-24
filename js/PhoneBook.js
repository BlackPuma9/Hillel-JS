class PhoneBook {
    #ATTRS = {
        dataUserId: 'data-user-id',
        dataRemoveBtn: 'data-remove-btn',
        dataCallBtn: 'data-call-btn',
        dataEndCallBtn: 'data-end-call-btn',
        dataAddBtn: 'data-add-btn',
        dataSaveContactBtn: 'data-save-contact-btn',
    }
    #contacts = []
    #modalWindow = null
    #modalForm = null
    callDurationEl = null

    constructor(users) {
        users.forEach((user) => {
            this.addContact(user)
        })
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

    list(contacts) {
        const ul = document.querySelector('#contacts')
        const li = contacts.map((contact) =>
            this.createContactTemplate(contact)
        )
        ul.innerHTML = ''
        ul.prepend(...li)

        const ulHistory = document.querySelector('#history')
        const liHistory = callController.callHistory.map((call) =>
            this.createHistoryTemplate(call)
        )
        ulHistory.innerHTML = ''
        ulHistory.prepend(...liHistory)
    }

    addContact(user) {
        if (user.id === null || user?.phone === undefined) return
        this.#contacts.unshift(new User(user))
    }

    call(contactId) {
        // find contact in this.#contacts and make a call
        const contact = this.#contacts.find(({ id }) => id === contactId)
        this.#modalWindow._element.querySelector(
            '.modal-title .title'
        ).innerHTML = contact.name
        this.#modalWindow._element.querySelector('.modal-body').innerHTML =
            'Conversation with ' + contact.phone
        this.#modalWindow.show()

        callController.startCall(contact)
    }
    removeContact(contactId) {
        // will remove contact from this.#contacts
        this.#contacts = this.#contacts.filter((user) => user.id !== contactId)
        this.list(this.#contacts)
    }

    search(searchStr) {
        const searchListResult = this.#contacts.filter(
            (user) =>
                user.name?.includes(searchStr) ||
                user.phone?.includes(searchStr) ||
                user.email?.includes(searchStr)
        )
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
        const id = this.#contacts[this.#contacts.length - 1].id + 1
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
        this.addContact(user)
        infoWarning.innerHTML = ''
        this.#modalForm.hide()
        document.getElementById('addContactForm').reset()
        this.list(this.#contacts)
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

        document.addEventListener('DOMContentLoaded', () =>
            this.list(this.#contacts)
        )

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
        this.list(this.#contacts)
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
            'list-group-item d-flex justify-content-between align-items-center bg-secondary text-white'
        wrapper.setAttribute('data-user-id', user.id)

        wrapper.innerHTML = `<span class="contacts__contact">${user.name}</span>
                            <div> 
                                <button type="button" ${
                                    this.#ATTRS.dataCallBtn
                                } class="btn btn-success">
                                    <i class="bi bi-telephone"></i>
                                </button>

                                <button type="button" ${
                                    this.#ATTRS.dataRemoveBtn
                                } class="btn btn-danger">
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
            'list-group-item d-flex justify-content-between align-items-center bg-secondary text-white'
        wrapper.setAttribute('data-user-id2', call.phone.id)

        wrapper.innerHTML = `<span class="contacts__contact">${call.phone.name}</span>
                            <div>${call.status}</div>`
        return wrapper
    }
}

const phoneBook = new PhoneBook(users)
