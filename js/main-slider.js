const mainSlider = document.querySelector(".js-main-slider");
initMainSlider(mainSlider);

function initMainSlider(mainSlider) {
    const flkty = new Flickity(mainSlider, {
        // options
        cellAlign: 'left'
        // contain: true
    });
}
