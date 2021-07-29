import render from './renderChat.js';

export default function regitstration() {
  const registrationBtn = document.querySelector('.registration .change-form a');
  const registrationForm = document.querySelector('.registration .form');

  const loginFormHandler = () => {
    document.querySelector('.registration-login.registration').style.display = 'none';
    document.querySelector('.registration-login.login').style.display = 'block';
  }
  
  const checkRegistration = (e) => {
    e.preventDefault();

    const checkPassword = document.querySelector('#user-password-registration');
    const checkPasswordConfirm = document.querySelector('#user-password-confirm');
    const alerrError = document.querySelector('.registration .alert-error-hide');

    if (checkPassword.value.includes(' ')) {
      alerrError.textContent = 'Поле не должно содержать пробелы';
      alerrError.classList.add('alert-error-show');

      setTimeout(() => alerrError.classList.remove('alert-error-show'), 3000);

      return;
    }

    if (checkPassword.value.length < 4) {
      alerrError.textContent = 'Введите больше 4 символов в пароле';
      alerrError.classList.add('alert-error-show');

      setTimeout(() => alerrError.classList.remove('alert-error-show'), 3000);
      
      return;
    }

    if (checkPassword.value !== checkPasswordConfirm.value) {
      alerrError.textContent = 'Пароли не совпадают!';
      alerrError.classList.add('alert-error-show');

      setTimeout(() => alerrError.classList.remove('alert-error-show'), 3000);

      return;
    }

    const username = document.querySelector('#user-name-registration').value;
    const password = document.querySelector('#user-password-registration').value;

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://studentschat.herokuapp.com/users/register");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({username, password}));

    xhr.onload = () => {
      const user = JSON.parse(xhr.response);
      if(xhr.status == 200) {
        window.localStorage.setItem('user', JSON.stringify(user));
        render(user);
      }
    };
  }

  registrationForm.addEventListener('submit', checkRegistration);
  registrationBtn.addEventListener('click', loginFormHandler);
}
