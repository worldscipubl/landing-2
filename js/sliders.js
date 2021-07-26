const sliders = document.querySelectorAll('.js-slider');
sliders.forEach((slider) => {
    initSlider(slider);
})

function initSlider(slider) {
    const flktySlider = new Flickity(slider, {
        cellAlign: 'left',
        prevNextButtons: false,
        autoPlay: 5000,
        wrapAround: true,
        // adaptiveHeight: true,
        watchCSS: true
    });
}
