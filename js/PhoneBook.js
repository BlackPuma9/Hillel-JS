class PhoneBook {
    #ATTRS = {
        dataUserId: 'data-user-id',
        dataRemoveBtn: 'data-remove-btn',
        dataCallBtn: 'data-call-btn',
        dataEndCallBtn: 'data-end-call-btn',
        dataAddBtn: 'data-add-btn',
    }
    #contacts = []
    #modalWindow = null
    #modalForm = null
    callDurationEl = null
    constructor(users) {
        // Validate users
        // add users to contacts
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
        const ul = document.querySelector('.list-group')
        const li = contacts.map((contact) =>
            this.createContactTemplate(contact)
        )
        ul.innerHTML = ''
        ul.prepend(...li)
    }

    addContact(user) {
        // validates user and adding that to this.#contacts
        if (user.id === null) return
        this.#contacts.push(new User(user))
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
        // will search contact by: name, phone, email
        const searchListResult = this.#contacts.filter(
            (user) =>
                user.name?.includes(searchStr) ||
                user.phone?.includes(searchStr) ||
                user.email?.includes(searchStr)
        )
        const div = document.querySelector('.contacts__list')
        if (searchListResult.length !== 0) {
            this.list(searchListResult)
        }
        div.innerHTML = 'No results found. Try again'
    }

    openAddForm = (event) => {
        const { target: element } = event
        event.stopPropagation()
        this.#modalForm.show()
        element.closest('.input-group').querySelector('input').value = ''
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
            'list-group-item d-flex justify-content-between align-items-center'
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

    // your methods
    // All event handlers should be a separate private methods
}

const phoneBook = new PhoneBook(users)
