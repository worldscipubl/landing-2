const viewPager = document.querySelector(".js-view-pager");
initViewPager(viewPager);

function initViewPager(viewPager) {
    const navbar = viewPager.querySelector(".view-pager__navbar");
    const body = viewPager.querySelector(".view-pager__body");
    const tabs = navbar.querySelectorAll('.view-pager__tab button');
    const pages = body.querySelectorAll('.view-pager__page');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            resetTabs();
            setActiveTab(tab);
            resetPages();
            setActivePage(index);
        })
    })

    const resetTabs = () => {
        tabs.forEach((tab) => {
            tab.classList.remove('active');
        })
    }

    const resetPages = () => {
        pages.forEach((page) => {
            page.classList.remove('active');
        })
    }

    const setActiveTab = (tab) => {
        tab.classList.add('active');
    }

    const setActivePage = (index) => {
        pages[index].classList.add('active');
    }

}
