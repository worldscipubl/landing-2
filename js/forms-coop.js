let currentFile = null;

function initForm(_form) {
    const _currentURL = new URL(window.location.href);
    const _emailFromURL = _currentURL.searchParams.get("e");
    const _emailInput = _form.querySelector('input[name="email"]');

    if (_emailInput && _emailFromURL)
        _emailInput.value = _emailFromURL;

    _form.addEventListener('submit', (e) => {
        e.preventDefault();
        const {currentTarget} = e;

        const _button = currentTarget.querySelector('[data-show-popup]');

        const step = _button.getAttribute('data-step');
        const formSender = _button.getAttribute('data-formsended');
        const formName = formSender + step;

        /*    Считывание формы    */
        const data = scrabbleInputs(currentTarget);
        if (data) {
            sendForm(data, currentTarget);  // Отправляем форму
        }

        function clearFrom() {
            currentTarget.reset();
            if (_form.id === 'dran-n-drop') {
                const fileDrag = document.getElementById('file-drag');
                fileDrag.classList.remove('uploader__inner--drag');
                fileDrag.className = 'uploader__inner';

                const _fileUploadBtn = _form.querySelector('.file-upload-btn');
                const _uploaderArrowImg = _form.querySelector('.uploader__arrow');
                const _uploaderDoneImg = _form.querySelector('.uploader__done');

                const _status = document.getElementById('status');
                _status.innerHTML = '';

                const _messages = document.getElementById('messages');
                _messages.innerHTML = 'Загрузите научную работу';

                _fileUploadBtn.style.display = 'block';
                _uploaderArrowImg.style.display = 'block';
                _uploaderDoneImg.style.display = 'none';

            }
        }

        function showSuccess() {
            const _success = document.querySelector('.cooperation__success');
            const _form = document.querySelector('.cooperation__form');
            _success.classList.remove('hidden');
            _form.remove();
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

        function inputIsValidation(input) {
            let hint = input.parentNode.querySelector(
                '.input-wrapper__error'
            );

            if (!hint) {
                hint = input.parentNode.parentNode.querySelector(
                    '.input-wrapper__error'
                );
            }

            switch (input.getAttribute('name')) {
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
                        setErrorInput(input, hint, 'Введите промокод!');
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

        function scrabbleInputs(currentForm) {
            let fo = new FormData();
            const inputs = currentForm.querySelectorAll('input, textarea');
            let isValidity = true;

            inputs.forEach((input, index) => {
                const _isValidity = inputIsValidation(input);

                if (_isValidity) {
                    if (input.getAttribute('type') === 'file') {
                        if (currentFile)
                            fo.append('file', currentFile);
                        else
                            fo.append('file', input.files[0]);
                    } else if (input.getAttribute('type') === 'radio') {
                        if (input.checked) {
                            fo.append(input.name, input.value);
                            console.log("input.name: " + input.name);
                            console.log("input.value: " + input.value);
                        }
                    } else {
                        fo.append(input.name, input.value);
                    }

                    if (input.getAttribute('type') === 'email') {
                        _button.setAttribute("data-email", input.value);
                    }
                }
                isValidity &= _isValidity;
            });

            if (!isValidity) return null;

            fo.append('csrfToken', csrfToken);
            fo.append('formsended', formName);

            return fo;
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


            const url = 'https://e.worldscipubl.com/site/editor-form/'

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
                        showSuccess();                // Открываем следующий PopUp
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

        function sendForm(sendData, currentForm) {
            console.log('sendForm');
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "https://worldscipubl.com/",
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
            };

            const url = 'https://e.worldscipubl.com/site/editor-form/'

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
                        showSuccess();                // Открываем следующий PopUp
                        clearFrom();                    // Отчищаем форму
                    }
                    _button.style.pointerEvents = "auto";
                },
                (error) => {
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
                                showSuccess();                // Открываем следующий PopUp
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
    });
}

const forms = document.querySelectorAll('form');
forms.forEach((_form) => {
    initForm(_form);
});
