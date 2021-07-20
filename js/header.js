const _drawer = document.querySelector(".js-drawer");
const _drawerOverlay = _drawer.querySelector(".js-drawer-overlay");
const _burger = document.querySelector(".js-burger");

const _navBurger = document.getElementById("navBurger");
const _navBar = document.getElementById("navBar");
const _header = document.getElementById("header");
const _callBtn = document.getElementById("header-call-btn");

_burger.addEventListener("click", toggleMenu);
_drawerOverlay.addEventListener("click", toggleMenu);
window.addEventListener("keydown", (event) => {
    const {key} = event;
    if ((key === 'Esc' || key === 'Escape') && _burger.classList.contains("is_active")) {
        _drawer.classList.toggle('is_active');
        _burger.classList.toggle('is_active');
        toggleScroll(false);
    }
});

_callBtn.addEventListener('click', () => {
    /* этот код создает цель в метрике */
    console.log("Сработала метрика: call_1");
    if (localStorage.getItem('call_1') === null) {
        localStorage.setItem('call_1', "call_1");

        if (typeof yaCounter50181778 !== 'undefined') {
            yaCounter50181778.reachGoal("call_1");
            console.log("reachGoal: call_1");
        }
    }
});

function toggleScroll(flag) {
    if (flag)
        document.body.style = 'overflow:hidden';
    else
        document.body.removeAttribute('style');
}

function toggleMenu() {
    _drawer.classList.toggle('is_active');
    _burger.classList.toggle('is_active');
    toggleScroll(_burger.classList.contains("is_active"));
}

function showOutPopup() {
    if (!localStorage.getItem('showOutPopup') && !localStorage.getItem('form') && currentShowPopUp == 0) {
        localStorage.setItem('showOutPopup', 'showOutPopup');
        const showPopUpLogic = popups.get("out");
        showPopUpLogic();
    }
}

document.body.addEventListener('mousemove', function (event) {
    const pointY = event.clientY;

    if (pointY <= 12) {
        // showOutPopup();
    }

});

const scrollItems = document.querySelectorAll('[data-scroll]');
scrollItems.forEach((item) => {
    item.addEventListener("click", () => {
        const anchor = item.getAttribute("data-scroll")
        const anchorElement = document.querySelector(anchor);
        let yOffset = 0.99;
        if (anchor === "#cost" || anchor === "#quiz-0" || anchor === "#promo")
            yOffset = 0.96;
        const y = (anchorElement.getBoundingClientRect().top + window.pageYOffset) * yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
    });
});
