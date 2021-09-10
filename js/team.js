const _tabsTeam = document.getElementById('tabs-team');

(function initTabs(_tabsBlock,) {
    const _tabsHeader = _tabsBlock.querySelector('.tabs-team__header');
    const _tabsBody = _tabsBlock.querySelector('.tabs-team__body');

    function clearBody(tabsBody, classShow) {
        for (let tabsBody_i = 0; tabsBody_i < tabsBody.children.length; tabsBody_i++) {
            tabsBody.children[tabsBody_i].classList.remove(classShow);
        }
    }

    clearBody(_tabsBody, "tabs-team__item--show");
    _tabsBody.children[1].classList.add("tabs-team__item--show");

    clearBody(_tabsHeader, "tabs-team__tab--show");
    _tabsHeader.children[1].classList.add("tabs-team__tab--show")

    for (let tabsHeader_i = 0; tabsHeader_i < _tabsHeader.children.length; tabsHeader_i++) {
        _tabsHeader.children[tabsHeader_i].addEventListener("click", (e) => {
            clearBody(_tabsBody, "tabs-team__item--show");
            _tabsBody.children[i].classList.add("tabs-team__item--show");

            clearBody(_tabsHeader, "tabs-team__tab--show");
            _tabsHeader.children[i].classList.add("tabs-team__tab--show")
        })
    }

})(_tabsTeam);
