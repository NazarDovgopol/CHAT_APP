import renderChat from './renderChat.js';
import { API } from './getServer';

export default function login() {
  const loginBtn = document.querySelector('.login .change-form a');
  const loginForm = document.querySelector('.login .form');

  const registrationFormHandler = () => {
    document.querySelector('.registration-login.login').style.display = 'none';
    document.querySelector('.registration-login.registration').style.display = 'block';
  }

  const checkLogin = (e) => {
    e.preventDefault();
  
    const checkPassword = document.querySelector('#user-password-login');
    const alertError = document.querySelector('.login .alert-error-hide');
  
    if (checkPassword.value.includes(' ')) {
      alertError.textContent = 'Поле не должно содержать пробелы';
      alertError.classList.add('alert-error-show');
  
      setTimeout(() => alertError.classList.remove('alert-error-show'), 3000);
  
      return;
    }
  
    if (checkPassword.value.length < 4) {
      alertError.textContent = 'Введите больше 4 символов в пароле';
      alertError.classList.add('alert-error-show');
  
      setTimeout(() => alertError.classList.remove('alert-error-show'), 3000);
      
      return;
    }
  
    const username = document.querySelector('#user-name-login').value;
    const password = document.querySelector('#user-password-login').value;
  
    const xhr = new XMLHttpRequest();
  
    xhr.open("POST", `${API}/users/login`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({username, password}));
  
    xhr.onload = () => {
      const user = JSON.parse(xhr.response)[0];
      if(xhr.status === 200) {
        window.localStorage.setItem('user', JSON.stringify(user));
        renderChat(user);
      } else {
        alertError.textContent = 'Пароль или логин введены неправильно';
        alertError.classList.add('alert-error-show');

        setTimeout(() => alertError.classList.remove('alert-error-show'), 3000);
      }
    };
  }

  loginForm?.addEventListener('submit', checkLogin);
  loginBtn?.addEventListener('click', registrationFormHandler);
}
