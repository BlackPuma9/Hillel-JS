'use strict'

const createTable = () => {
    const table = document.createElement('table')
    const tbody = document.createElement('tbody')
    let counter = 1
    for (let r = 0; r < 10; r++) {
        const tr = document.createElement('tr')
        for (let d = 0; d < 10; d++) {
            const td = document.createElement('td')
            td.textContent = `${counter}`
            tr.appendChild(td)
            counter++
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    document.body.prepend(table)
}
createTable()
