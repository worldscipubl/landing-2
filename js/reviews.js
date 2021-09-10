const _tabsReview = document.getElementById('tabs-review');

(function initTabs(_tabsBlock,) {
    const _tabsHeader = _tabsBlock.querySelector('.r-cards');
    const _tabsBody = _tabsBlock.querySelector('.review-wrapper');
    const _tabsVideo = _tabsBlock.querySelector('.review-video-wrapper');

    function clearBody(tabsBody, classShow) {
        for (let tabsBody_i = 0; tabsBody_i < tabsBody.children.length; tabsBody_i++) {
            tabsBody.children[tabsBody_i].classList.remove(classShow);
        }
    }

    function clearHeader(tabsBody, classShow) {
        for (let tabsBody_i = 0; tabsBody_i < tabsBody.children.length; tabsBody_i++) {
            tabsBody.children[tabsBody_i].classList.add(classShow);
        }
    }

    clearBody(_tabsBody, "review--show");
    _tabsBody.children[0].classList.add("review--show");

    clearBody(_tabsVideo, "reviews__video--show");
    _tabsVideo.children[0].classList.add("reviews__video--show");

    clearHeader(_tabsHeader, "review-card--show");
    _tabsHeader.children[0].classList.remove("review-card--show")

    for (let tabsHeader_i = 0; tabsHeader_i < _tabsHeader.children.length; tabsHeader_i++) {
        _tabsHeader.children[tabsHeader_i]
            .querySelector(".review-card__profile-link")
            .addEventListener("click", (e) => {
                clearBody(_tabsBody, "review--show");
                _tabsBody.children[tabsHeader_i].classList.add("review--show");

                clearBody(_tabsVideo, "reviews__video--show");
                _tabsVideo.children[tabsHeader_i].classList.add("reviews__video--show");

                clearHeader(_tabsHeader, "review-card--show");
                _tabsHeader.children[tabsHeader_i].classList.remove("review-card--show")

            })
    }

})(_tabsReview);
