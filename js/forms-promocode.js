const forms = document.querySelectorAll('form');

forms.forEach((form) => {
    initForm(form);
});

function initForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitForm = e.currentTarget;
        const formName = submitForm.getAttribute('name');

        const formData = scrabbleForm(submitForm, formName);
        if (!formData) return;

        if (formName === 'promocode') {
            checkPromoCode(formData, submitForm);
        } else if (formName === 'promocode-file') {
            submitPromoCodeFile(formData);
        }

        /*
         * Обе формы требуют подтверждения
         */
    });

    function checkPromoCode(sendData, currentForm) {
        console.log('checkPromoCode');

        const head = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "http://localhost:8848/",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
        };

        const base_url = '/main/';          // Базовый URLs
        const add_lead = 'add-lead/';       // Отправка заявки
        const url = base_url + add_lead;
        const btnSubmit = currentForm.submit;

        btnSubmit.style.pointerEvents = "none";
        loadProgressBar();
        axios.post(
            url,
            sendData,
            {withCredentials: true},
            {headers: head}
        ).then(
            (response) => {
                const inputs = currentForm.querySelectorAll('input');
                const input = inputs[inputs.length - 1];
                const hint = input.parentNode.querySelector(
                    '.input-wrapper__error'
                );

                const resData = response.data;
                console.log(response);

                if (resData['warning']) {
                    const resDataWarning = resData['warning'];

                    if (resDataWarning['coupon'])
                        setErrorInput(
                            input,
                            hint,
                            resDataWarning['coupon']
                        );
                    else if (resDataWarning['time'])
                        setErrorInput(
                            input,
                            hint,
                            resDataWarning['time']
                        );
                } else {
                    unlockForm(currentForm);
                    triggerGoal(formName);          // Фиксируем цель
                    removeErrorInput(input, hint);
                }
                btnSubmit.style.pointerEvents = "auto";
            },
            (error) => {
                const inputs = currentForm.querySelectorAll('input');
                const input = inputs[inputs.length - 1];
                const hint = input.parentNode.querySelector(
                    '.input-wrapper__error'
                );
                setErrorInput(
                    input,
                    hint,
                    "Ошибка при отправке данных!"
                );
                console.log(error);
                btnSubmit.style.pointerEvents = "auto";
            }
        );
    }

    function submitPromoCodeFile(formData) {

    }

    function sendFormWithConfirm(sendData, currentForm) {
        console.log('sendFormWithConfirm');
        const head = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "http://localhost:8848/",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
        };

        /* Для отладки: */
        // const base_url = 'https://worldscipubl.com/main-test/';

        const base_url = '/main/';          // Базовый URLs
        const file_ep = 'add-file/';        // Загрзка файла
        const add_lead = 'add-lead/';       // Отправка заявки

        let url = base_url;

        if (sendData.get('file'))
            url += file_ep;
        else
            url += add_lead;

        if (currentForm === 'cooperation')
            url = 'https://e.worldscipubl.com/we_need_editors/'

        _button.style.pointerEvents = "none";
        loadProgressBar();
        axios.post(
            url,
            sendData,
            {withCredentials: true},
            {headers: head}
        ).then(
            (response) => {
                const inputs = currentForm.querySelectorAll('input');
                const input = inputs[inputs.length - 1];
                const hint = input.parentNode.querySelector(
                    '.input-wrapper__error'
                );
                const resData = response.data;
                console.log(response);

                if (resData['warning']) {
                    const resDataWarning = resData['warning'];

                    if (resDataWarning['coupon'])
                        setErrorInput(
                            input,
                            hint,
                            resDataWarning['coupon']
                        );
                    else if (resDataWarning['time'])
                        setErrorInput(
                            input,
                            hint,
                            resDataWarning['time']
                        );
                } else {


                    triggerGoal(formName);          // Фиксируем цель
                    openNextPopUp();                // Открываем следующий PopUp
                    removeErrorInput(input, hint);
                }
                _button.style.pointerEvents = "auto";
            },
            (error) => {
                console.log(error);
                _button.style.pointerEvents = "auto";
            }
        );
    }

    function unlockForm(submitForm) {
        submitForm.classList.remove('form-lock');
    }

    function clearFrom() {
        currentTarget.reset();
        if (form.id === 'dran-n-drop') {
            const fileDrag = document.getElementById('file-drag');
            fileDrag.classList.remove('uploader__inner--drag');
            fileDrag.className = 'uploader__inner';

            const _fileUploadBtn = document.getElementById('file-upload-btn');
            const _uploaderArrowImg = form.querySelector('.uploader__arrow');
            const _uploaderDoneImg = form.querySelector('.uploader__done');

            const _status = document.getElementById('status');
            _status.innerHTML = '';

            const _messages = document.getElementById('messages');
            _messages.innerHTML = 'Загрузите научную работу';

            _fileUploadBtn.style.display = 'block';
            _uploaderArrowImg.style.display = 'block';
            _uploaderDoneImg.style.display = 'none';

        }
    }

    function openNextPopUp() {
        if (idShowPopUp != 0) {
            if (data.has('email'))
                localStorage.setItem('email', data.get('email'))
            showPopUpLogic();
            clearFrom();
        }
    }

    function triggerGoal(currentGoal) {
        /* этот код создает цель в метрике */
        console.log("Сработала метрика: " + currentGoal);

        if (localStorage.getItem(currentGoal) === null) {
            localStorage.setItem(currentGoal, currentGoal);

            if (typeof yaCounter50181778 !== 'undefined') {
                yaCounter50181778.reachGoal(currentGoal);
                console.log("reachGoal: " + currentGoal)
            }
        }
        if (currentGoal != "question_1") {
            if (localStorage.getItem('form') === null) {
                localStorage.setItem('form', 'form');
                if (typeof yaCounter50181778 !== 'undefined') {
                    yaCounter50181778.reachGoal('form');
                    console.log("reachGoal: form")
                }
            }
        }
    }

    function validationInput(input) {
        let hint = input.parentNode.querySelector(
            '.input-wrapper__error'
        );

        if (!hint) {
            hint = input.parentNode.parentNode.querySelector(
                '.input-wrapper__error'
            );
        }

        switch (input.name) {
            case 'phone':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(
                        input,
                        hint,
                        'Недопустимый номер телефона!'
                    );
                    return false;
                }
                break;
            case 'email':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Недопустимый email!');
                    return false;
                }
                break;
            case 'name':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Как к Вам обращаться?');
                    return false;
                }
                break;
            case 'subject':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Не указана тематика!');
                    return false;
                }
                break;
            case 'link':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Укажите ссылку на профиль!');
                    return false;
                }
                break;
            case 'firstname':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Как к Вам обращаться?');
                    return false;
                }
                break;
            case 'lastname':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Как к Вам обращаться?');
                    return false;
                }
                break;
            case 'coupon':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Введите купон!');
                    return false;
                }
                break;
            case 'file':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Загрузите файл!');
                    return false;
                }
                break;
            case 'fileUpload':
                if (input.validity.valid || currentFile) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Загрузите файл!');
                    return false;
                }
                break;
            case 'text':
                if (input.validity.valid) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Заполните поле!');
                    return false;
                }
                break;
            case 'rating':
                if (input.validity.valid && input.value != 0) {
                    removeErrorInput(input, hint);
                    return true;
                } else {
                    setErrorInput(input, hint, 'Укажите рейтинг журнала!');
                    return false;
                }
                break;
            default:
                return true;
                break;
        }
    }

    function setErrorInput(input, hint, textError) {
        input.style.borderColor = 'red';
        hint.classList.add('input-wrapper__error--show');
        hint.innerHTML = '- ' + textError;
    }

    function removeErrorInput(input, hint) {
        if (input.hasAttribute('style')) input.removeAttribute('style');
        hint.classList.remove('input-wrapper__error--show');
        hint.innerHTML = '';
    }

    function scrabbleForm(submitForm, formName) {
        let fo = new FormData();
        let isValidity = true;

        for (const input of submitForm.elements) {
            if (input.name === 'submit') break;
            const _isValidity = validationInput(input);

            if (_isValidity) {
                if (input.getAttribute('type') === 'file') {
                    if (currentFile)
                        fo.append('file', currentFile);
                    else
                        fo.append('file', input.files[0]);
                } else
                    fo.append(input.name, input.value);
            }
            isValidity &= _isValidity;
        }

        if (!isValidity) return null;

        fo.append('csrfToken', csrfToken);
        fo.append('formsended', formName);

        return fo;
    }

    function sendForm(sendData, currentForm) {
        console.log('sendForm');
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "http://localhost:8848/",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
        };

        /* Для отладки испольховать: */
        // const base_url = 'https://worldscipubl.com/main-test/';

        const base_url = '/main/';          // Базовый URL
        const file_ep = 'add-file/';        // Загрзка файла
        const letter_ep = 'letter/';        // Вопрос из FAQ
        const is_exists = 'is-exists/';     // Проверка email
        const add_lead = 'add-lead/';       // Отправка заявки

        let url = base_url;

        if (sendData.get('file'))
            url += file_ep;
        else if (sendData.get('text'))
            url += letter_ep;
        else
            url += add_lead;

        _button.style.pointerEvents = "none";
        loadProgressBar();
        axios.post(
            url,
            sendData,
            {withCredentials: true},
            {headers: headers}
        ).then(
            (response) => {
                console.log(response);
                const resData = response.data;
                if (resData['warning']) {

                } else {
                    triggerGoal(formName);          // Фиксируем цель
                    openNextPopUp();                // Открываем следующий PopUp
                    clearFrom();                    // Отчищаем форму
                }
                _button.style.pointerEvents = "auto";
            },
            (error) => {
                const _error = document.querySelector('.audit__error');
                if (_error)
                    _error.innerHTML = error;
                console.log(error);
                _button.style.pointerEvents = "auto";
            }
        );
    }

    function checkEmail(isDragDrop = false, email = null, data = null) {
        console.log('checkEmail');

        const head = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "http://localhost:8848/",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
        };

        // const base_url = 'https://worldscipubl.com/main-test/';
        const base_url = '/main/';
        const is_exists = 'is-exists/';

        const url = base_url + is_exists;

        const fo = new FormData();


        if (email != null) {
            fo.append('email', email);
            fo.append('csrfToken', csrfToken);
            fo.append('formsended', formName);

            _button.style.pointerEvents = "none";
            _button.style.pointerEvents = "auto";
            loadProgressBar();
            console.log('Отправка запроса на проверку');
            axios.post(
                url,
                fo,
                {withCredentials: true},
                {headers: head}
            ).then(
                (response) => {
                    const resData = response.data;
                    if (resData === true) {
                        console.log("Email already exists!");
                        if (data) {
                            showPopUpLogic = popups.get("finished-2");
                            openNextPopUp();                // Открываем следующий PopUp
                        }
                    } else {
                        console.log("Email does't exist");
                        if (isDragDrop)
                            sendFormWithConfirm(data, currentTarget);  // Отправляем форму c файлом из drag-n-drop
                    }
                    _button.style.pointerEvents = "auto";
                },
                (error) => {
                    console.log(error);
                    _button.style.pointerEvents = "auto";
                }
            );
        }
    };
}
