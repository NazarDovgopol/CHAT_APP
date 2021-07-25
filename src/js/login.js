import render from '../js/render.js';

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
    const alerrError = document.querySelector('.login .alert-error-hide');
  
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
  
    const username = document.querySelector('#user-name-login').value;
    const password = document.querySelector('#user-password-login').value;
  
    const xhr = new XMLHttpRequest();
  
    xhr.open("POST", "https://studentschat.herokuapp.com/users/login");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({username, password}));
  
    xhr.onload = () => {
      const user = JSON.parse(xhr.response)[0];
      if(xhr.status == 200) {
        window.localStorage.setItem('user', JSON.stringify(user));
        render(user);
      }
    };
  }

  loginForm.addEventListener('submit', checkLogin);
  loginBtn.addEventListener('click', registrationFormHandler);
}
