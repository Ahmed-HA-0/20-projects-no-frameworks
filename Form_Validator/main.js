const formRegister = document.getElementById('form');
const formUsername = document.getElementById('username');
const formEmail = document.getElementById('email');
const formPassword = document.getElementById('password');
const formPassword2 = document.getElementById('password2');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.remove('success');
  formControl.classList.add('error');
  const smallEl = input.nextElementSibling;
  smallEl.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add('success');
  formControl.classList.remove('error');
}

function checkLength(input, min, max) {
  if (input.value.trim() === '') {
    return;
  } else if (input.value.length < min) {
    showError(
      input,
      `${capatalizeFirstLetter(input.id)} must be at least ${min} characters `
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${capatalizeFirstLetter(input.id)} must be below ${max} characters `
    );
  } else {
    showSuccess(input);
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${capatalizeFirstLetter(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkMatchPassword(input1, input2) {
  if (input1.value.trim() === '' || input2.value.trim() === '') {
    return;
  } else if (input1.value.trim() !== input2.value.trim()) {
    showError(input2, `${capatalizeFirstLetter(input2.id)} dosen't match`);
  } else {
    showSuccess(input2);
  }
}

function isValidEmail(email) {
  if (email.value.trim() === '') {
    return;
  } else if (emailRegex.test(email.value)) {
    showSuccess(email);
  } else {
    showError(email, `${capatalizeFirstLetter(email.id)} is not valid`);
  }
}

function capatalizeFirstLetter(inputId) {
  return `${inputId.charAt(0).toUpperCase()}${inputId.slice(1)}`;
}

function onSubmitForm(e) {
  e.preventDefault();
  checkRequired([formUsername, formEmail, formPassword, formPassword2]);
  checkLength(formUsername, 4, 15);
  checkLength(formPassword, 8, 20);
  checkMatchPassword(formPassword, formPassword2);
  isValidEmail(formEmail);
}

function init() {
  formRegister.addEventListener('submit', onSubmitForm);
}

document.addEventListener('DOMContentLoaded', init);
