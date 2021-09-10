const _spoilers = document.getElementById('spoilers-faq');

(function initSpoilers(_spoilers) {

    function clearBody(body, classShow) {
        for (let body_i = 0; body_i < body.children.length; body_i++) {
            body.children[body_i].classList.remove(classShow);
        }
    }

    for (let spoilers_i = 0; spoilers_i < _spoilers.children.length; spoilers_i++) {
        _spoilers.children[spoilers_i]
            .querySelector(".spoiler__header")
            .addEventListener("click", () => {

                if (_spoilers.children[spoilers_i].classList.contains("spoiler--show")) {
                    _spoilers.children[spoilers_i].classList.remove("spoiler--show");
                } else {
                    clearBody(_spoilers, "spoiler--show");
                    _spoilers.children[spoilers_i].classList.add("spoiler--show");
                }
            })
    }

})(_spoilers);
