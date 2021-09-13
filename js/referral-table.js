const referralTable = document.querySelector(".js-ref-table");
initReferralTable(referralTable);

function initReferralTable(referralTable) {
    const body = referralTable.querySelector(".ref-table__body");
    const pagination = referralTable.querySelector(".pagination");
    const stateTable = {
        counter: 0,
        currentPage: 1,
        maxPerPage: 2,
        totalResults: 8,
        showLoader: false,
        pageCount: function () {
            return Math.ceil(this.totalResults / this.maxPerPage)
        }
    };

    updateState(1);

    function updateState(page) {
        // body.innerHTML = '';
        downloadData(page)
            .then(({data, perPage, totalCount}) => {
                data.map((item, index) => {
                    stateTable.counter++;
                    addRowToBody({...item, rating: stateTable.counter}, body);
                });

                perPage && (stateTable.maxPerPage = perPage);
                totalCount && (stateTable.totalResults = totalCount);

                scrollTrigger();
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {

            })
    }


    function scrollTrigger() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0 && stateTable.currentPage < stateTable.pageCount()) {
                    stateTable.currentPage++;
                    stateTable.showLoader = false;
                    updateState(stateTable.currentPage);
                }
            })
        });

        observer.observe(body.querySelector('.ref-table__row:last-child'));
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
        currentPage = +response.headers.get('x-pagination-current-page') || 0;
        pageCount = +response.headers.get('x-pagination-page-count') || 0;
        perPage = +response.headers.get('x-pagination-per-page') || 0;
        totalCount = +response.headers.get('x-pagination-total-count') || 0;

        const data = await response.json();
        // response.headers.forEach(function (value, name) {
        //     console.log(name + ": " + value);
        // });
        return {
            data,
            currentPage,
            pageCount,
            perPage,
            totalCount
        }
    } else {
        return new Error(`Ошибка HTTP: ${response.status}`);
    }
}
