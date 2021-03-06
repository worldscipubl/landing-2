(function () {
    const auditWrapper = document.querySelector('.js-promocode-form');
    const promoCodeHint = document.querySelector('.js-promocode-hint');
    const formsPromocode = document.querySelectorAll('form[data-form-type="promocode"]');

    const msgBoxBlue = auditWrapper.querySelector('.message-box_blue');
    const msgBoxPink = auditWrapper.querySelector('.message-box_pink');
    const msgBoxBlueEmail = msgBoxBlue.querySelector('.message-box__email');
    const msgBoxPinkEmail = msgBoxPink.querySelector('.message-box__email');
    const mainContent = auditWrapper.querySelector('.audit__container');

    const _currentURL = new URL(window.location.href);
    const _emailFromURL = _currentURL.searchParams.get("e");
    const _couponFromURL = _currentURL.searchParams.get("c");

    let emailUser = null;
    let promoCodeUser = null;

    formsPromocode.forEach((form) => {
        initForm(form);
    });

    function initForm(form) {

        const couponField = form.querySelector('[name="coupon"]');
        const couponEmail = form.querySelector('[name="email"]');

        if (_couponFromURL && couponField) couponField.value = _couponFromURL;
        if (_emailFromURL && couponEmail) couponEmail.value = _emailFromURL;

        if (_emailFromURL) emailUser = _emailFromURL;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitForm = e.currentTarget;
            const formName = submitForm.getAttribute('name');

            const btn = document.querySelector('button[type="submit"]');
            btn && btn.classList.add('button_disabled');

            const formData = scrabbleForm(submitForm, formName);
            if (!formData) {
                const btn = document.querySelector('button[type="submit"]');
                btn && btn.classList.remove('button_disabled');

                return;
            }

            if (formName.includes('promocode-file')) {
                submitPromoCodeFileStepOne(formData, submitForm, formName);
            } else if (formName.includes('promocode')) {
                checkPromoCode(formData, submitForm, formName);
            }

            /*
             * ?????? ?????????? ?????????????? ??????????????????????????
             */
        });

        function checkPromoCode(sendData, currentForm, formName) {
            console.log('checkPromoCode');

            const head = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "http://localhost:8848/",
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
            };

            const base_url = '/main/';          // ?????????????? URLs
            const add_lead = 'add-lead/';       // ???????????????? ????????????
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
                    const btn = document.querySelector('button[type="submit"]');

                    const inputs = currentForm.querySelectorAll('input');
                    const input = inputs[inputs.length - 1];
                    const hint = input.parentNode.querySelector(
                        '.input-wrapper__error'
                    );

                    const resData = response.data;
                    console.log(response);

                    if (resData['warning']) {
                        const resDataWarning = resData['warning'];

                        if (resDataWarning['coupon']) {
                            btn && btn.classList.remove('button_disabled');

                            setErrorInput(
                                input,
                                hint,
                                resDataWarning['coupon']
                            );
                        } else if (resDataWarning['email']) {
                            showCardMessage(true);
                        } else if (resDataWarning['time']) {
                            btn && btn.classList.remove('button_disabled');
                            setErrorInput(
                                input,
                                hint,
                                resDataWarning['time']
                            );
                        }
                    } else {
                        unlockForm(currentForm, currentForm);
                        triggerGoal(formName);          // ?????????????????? ????????
                        removeErrorInput(input, hint);
                    }
                    btnSubmit.style.pointerEvents = "auto";
                },
                (error) => {
                    const btn = document.querySelector('button[type="submit"]');
                    btn && btn.classList.remove('button_disabled');

                    const inputs = currentForm.querySelectorAll('input');
                    const input = inputs[inputs.length - 1];
                    const hint = input.parentNode.querySelector(
                        '.input-wrapper__error'
                    );
                    setErrorInput(
                        input,
                        hint,
                        "???????????? ?????? ???????????????? ????????????!"
                    );
                    console.log(error);
                    btnSubmit.style.pointerEvents = "auto";
                }
            );
        }

        function submitPromoCodeFileStepOne(sendData, currentForm, formName) {
            console.log('submitPromoCodeFileStepOne');

            const head = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "http://localhost:8848/",
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
            };

            const base_url = '/main/';          // ?????????????? URLs
            const add_lead = 'add-lead/';       // ???????????????? ????????????
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
                        const btn = document.querySelector('button[type="submit"]');
                        btn && btn.classList.remove('button_disabled');

                        const resDataWarning = resData['warning'];

                        if (resDataWarning['coupon']) {
                            submitPromoCodeFileStepTwo(sendData, currentForm, formName);
                            removeErrorInput(input, hint);
                        } else if (resDataWarning['time'])
                            setErrorInput(
                                input,
                                hint,
                                resDataWarning['time']
                            );
                        else {
                            submitPromoCodeFileStepTwo(sendData, currentForm, formName);
                            removeErrorInput(input, hint);
                        }
                    } else {
                        submitPromoCodeFileStepTwo(sendData, currentForm, formName);
                        removeErrorInput(input, hint);
                    }
                    btnSubmit.style.pointerEvents = "auto";
                },
                (error) => {
                    const btn = document.querySelector('button[type="submit"]');
                    btn && btn.classList.remove('button_disabled');

                    const inputs = currentForm.querySelectorAll('input');
                    const input = inputs[inputs.length - 1];
                    const hint = input.parentNode.querySelector(
                        '.input-wrapper__error'
                    );
                    setErrorInput(
                        input,
                        hint,
                        "???????????? ?????? ???????????????? ????????????!"
                    );
                    console.log(error);
                    btnSubmit.style.pointerEvents = "auto";
                }
            );
        }

        function submitPromoCodeFileStepTwo(sendData, currentForm, formName) {
            console.log('submitPromoCodeFile');

            const head = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "http://localhost:8848/",
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
            };

            const base_url = '/main/';          // ?????????????? URLs
            const file_ep = 'add-file/';        // ?????????????? ??????????
            const url = base_url + file_ep;
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
                    const btn = document.querySelector('button[type="submit"]');

                    const inputs = currentForm.querySelectorAll('input');
                    const input = inputs[inputs.length - 1];
                    const hint = input.parentNode.querySelector(
                        '.input-wrapper__error'
                    );

                    const resData = response.data;
                    console.log(response);

                    if (resData['warning']) {
                        const resDataWarning = resData['warning'];
                        btn && btn.classList.remove('button_disabled');

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
                        showCardMessage(false);
                        triggerGoal(formName);          // ?????????????????? ????????
                        removeErrorInput(input, hint);
                    }
                    btnSubmit.style.pointerEvents = "auto";
                },
                (error) => {
                    const btn = document.querySelector('button[type="submit"]');
                    btn && btn.classList.remove('button_disabled');

                    const inputs = currentForm.querySelectorAll('input');
                    const input = inputs[inputs.length - 1];
                    const hint = input.parentNode.querySelector(
                        '.input-wrapper__error'
                    );
                    setErrorInput(
                        input,
                        hint,
                        "???????????? ?????? ???????????????? ????????????!"
                    );
                    console.log(error);
                    btnSubmit.style.pointerEvents = "auto";
                }
            );
        }

        function unlockForm(currentForm) {
            formsPromocode[1].classList.remove('form-lock');
            currentForm
                .querySelector('.promocode-success')
                .innerHTML = "???????????????? ???????????? ??????????. <br> ?????????????????????? ??????????????????.";
            removePromoCodeHint();
        }

        function removePromoCodeHint() {
            if (!promoCodeHint) return;
            promoCodeHint.remove();
        }

        function triggerGoal(currentGoal) {
            /* ???????? ?????? ?????????????? ???????? ?? ?????????????? */
            console.log("?????????????????? ??????????????: " + currentGoal);

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
                            '???????????????????????? ?????????? ????????????????!'
                        );
                        return false;
                    }
                    break;
                case 'email':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        emailUser = input.value;
                        return true;
                    } else {
                        setErrorInput(input, hint, '???????????????????????? email!');
                        return false;
                    }
                    break;
                case 'name':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????? ?? ?????? ?????????????????????');
                        return false;
                    }
                    break;
                case 'subject':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '???? ?????????????? ????????????????!');
                        return false;
                    }
                    break;
                case 'link':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????????????? ???????????? ???? ??????????????!');
                        return false;
                    }
                    break;
                case 'firstname':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????? ?? ?????? ?????????????????????');
                        return false;
                    }
                    break;
                case 'lastname':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????? ?? ?????? ?????????????????????');
                        return false;
                    }
                    break;
                case 'coupon':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        promoCodeUser = input.value;
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????????????? ????????????????!');
                        return false;
                    }
                    break;
                case 'file':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????????????????? ????????!');
                        return false;
                    }
                    break;
                case 'text':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????????????????? ????????!');
                        return false;
                    }
                    break;
                case 'rating':
                    if (input.validity.valid && input.value != 0) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, '?????????????? ?????????????? ??????????????!');
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
            if (!hint) return;
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
                        fo.append('file', input.files[0]);
                    } else
                        fo.append(input.name, input.value);
                }
                isValidity &= _isValidity;
            }

            if (!isValidity) return null;

            fo.append('csrfToken', csrfToken);
            fo.append('formsended', formName);

            if (formName.includes('promocode-file') && emailUser) {
                fo.append('email', emailUser);
            }

            return fo;
        }

        function showCardMessage(type) {
            console.log("showCardMessage")
            mainContent.remove();
            if (type) {
                msgBoxBlue.classList.remove('message-box_hidden');
                msgBoxBlueEmail.textContent = emailUser;
            } else {
                msgBoxPink.classList.remove('message-box_hidden');
                msgBoxPinkEmail.textContent = emailUser;
            }
        }
    }
}());
