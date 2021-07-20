(function () {
    const checkboxFirst = document.querySelector('.js-get-promocode-checkbox-1');
    const checkboxSecond = document.querySelector('.js-get-promocode-checkbox-2');
    const getPromoCodeBtn = document.querySelector('.js-get-promocode-btn');

    if (!(checkboxFirst || checkboxSecond || getPromoCodeBtn)) return;

    checkboxFirst.removeAttribute('checked');
    checkboxSecond.removeAttribute('checked');

    checkboxFirst.addEventListener('change', checkShowBtn);
    checkboxSecond.addEventListener('change', checkShowBtn);

    console.log("init")

    function checkShowBtn() {
        console.log("checkShowBtn")
        if (checkboxFirst.checked && checkboxSecond.checked) {
            console.log("remove")
            getPromoCodeBtn.classList.remove('button_disabled');
        } else if (!getPromoCodeBtn.classList.contains('button_disabled')) {
            console.log("set")
            getPromoCodeBtn.classList.add('button_disabled');
        }
    }
})();
