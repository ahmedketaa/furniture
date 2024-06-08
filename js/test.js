const form = document.getElementById('checkout-form');
const full_name = document.getElementById('full_name');
const email = document.getElementById('email');
const address = document.getElementById('address');
const city = document.getElementById('city');
const state = document.getElementById('state');
const zip = document.getElementById('zip');
const card_number = document.getElementById('card_number');
const expiration_date = document.getElementById('expiration_date');
const cvv = document.getElementById('cvv');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'billing_form error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'billing_form success';
}

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function isValidCardNumber(number) {
    const re = /^\d{16}$/;
    return re.test(String(number));
}

function isValidExpirationDate(date) {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return re.test(String(date));
}

function isValidCVV(cvv) {
    const re = /^\d{3}$/;
    return re.test(String(cvv));
}

function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkEmail(input) {
    if(isValidEmail(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkCardNumber(input) {
    if(isValidCardNumber(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Card number is not valid');
    }
}

function checkExpirationDate(input) {
    if(isValidExpirationDate(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Expiration date is not valid');
    }
}

function checkCVV(input) {
    if(isValidCVV(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'CVV is not valid');
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateCheckoutForm() {
    checkRequired([full_name, email, address, city, state, zip, card-number, expiration-date, cvv]);
    checkLength(full_name, 3, 50);
    checkEmail(email);
    checkCardNumber(card_number);
    checkExpirationDate(expiration_date);
    checkCVV(cvv);

    // Prevent form submission if there are errors
    const formControls = document.querySelectorAll('billing_form');
    let isFormValid = true;
    formControls.forEach(formControl => {
        if(formControl.classList.contains('error')) {
            isFormValid = false;
        }
    });

    return isFormValid;
}
