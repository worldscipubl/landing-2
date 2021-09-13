const referralTable = document.querySelector(".js-ref-table");
initReferralTable(referralTable);

function initReferralTable(referralTable) {
    const body = referralTable.querySelector(".ref-table__body");
    const tmp_data = [
        {id: 1, name: "Ольга Федоровна", rate: "3145"},
        {id: 2, name: "Галина Петровна", rate: "2800"},
        {id: 3, name: "Марина Радионовна", rate: "2650"},
    ]

    tmp_data.map((item) => {
        addRowToBody(item, body);
    });
}

function createRow({id, name, rate}) {
    return `<tr class="ref-table__row ref-table__row_body">
                            <td class="ref-table__cell">${id}</td>
                            <td class="ref-table__cell">${name}</td>
                            <td class="ref-table__cell">${rate}</td>
                            </tr>`
}

function addRowToBody(item, body) {
    const row = createRow(item);
    body.insertAdjacentHTML('beforeend', row);
}
