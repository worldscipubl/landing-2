const referralTable = document.querySelector(".js-ref-table");
initReferralTable(referralTable);

function initReferralTable(referralTable) {
    const body = referralTable.querySelector(".ref-table__body");
    const pagination = referralTable.querySelector(".pagination");
    const btnBack = pagination.querySelector(".pagination__back-btn");
    const btnNext = pagination.querySelector(".pagination__next-btn");
    const stateTable = {page: 1, counter: 1}
    updateState(stateTable);

    btnBack.addEventListener('click', () => {
        stateTable.page--;
        updateState(stateTable);
    })
    btnNext.addEventListener('click', () => {
        stateTable.page++;
        updateState(stateTable);
    })

    function updateState(state) {
        body.innerHTML = '';
        downloadData(state?.page)
            .then(({data, currentPage, countPage}) => {
                state.page = currentPage;
                state.counter = countPage;
                data.map((item, index) => {
                    addRowToBody({...item, rating: index + 1}, body);
                });
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                console.log(state);
                if (state.page === state.counter) {
                    btnNext.classList.add('hidden')
                } else {
                    btnNext.classList.remove('hidden');
                }
            })
    }

}

function createRow({rating, name, score}) {
    return `<tr class="ref-table__row ref-table__row_body">
                            <td class="ref-table__cell">${rating}</td>
                            <td class="ref-table__cell">${name}</td>
                            <td class="ref-table__cell">${score}</td>
                            </tr>`
}

function addRowToBody(item, body) {
    const row = createRow(item);
    body.insertAdjacentHTML('beforeend', row);
}


async function downloadData(page) {
    const URL = `https://api.worldscipubl.com/v1/chat-bot-ref?page=${page}`;
    const response = await fetch(URL);

    if (response.ok) {
        currentPage = response.headers.get('x-pagination-current-page') || 0;
        countPage = response.headers.get('x-pagination-page-count') || 0;

        const data = await response.json();
        return {
            data,
            currentPage: Number.parseInt(currentPage),
            countPage: Number.parseInt(countPage)
        }
    } else {
        return new Error(`Ошибка HTTP: ${response.status}`);
    }
}
