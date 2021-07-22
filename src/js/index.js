import 'babel-polyfill';
import '../style/style.scss';

import logo from '../images/logo.png';
import edit from '../images/edit.png';
import logOut from '../images/log-out.png';
import logoUser from '../images/logo-user.png';
import closeChat from '../images/close-chat.png';
import textBold from '../images/text-bold.png';
import textItalic from '../images/text-italic.png';
import textDecoration from '../images/text-decoration.png';
import textLink from '../images/text-link.png';

const render = ({ username }) => {
    document.querySelector('.body').innerHTML = `
    <header class="header">
    <div class="logo">
      <a href="#"><img src=${logo} alt="logo"></a>
      <a href="#"><h2>CHAT ONLINE</h2></a>
    </div>
    <div>
      <div class="time">
        <h3><i>Nick:</i> ${username}</h3><br>
        <i><h3>You are online for: 1h 32m</h3></i>
        <i><h3>Your local time is: 10:45</h3></i>
      </div>
        <div class="profile">
          <a href="#" title="Edit profile" class="edit"><img src=${edit} alt="Edit profile"></a>
          <a href="#" title="Logout" class="logout"><img src=${logOut} alt="Logout"></a>
        </div>
    </div>
    </header>
    <main class="main">
    <div class="main-flex">
      <section class="users">
        <div class="user-status">
          <i><h3>Online: 4</h3></i>
          <i><h3>Offline: 2</h3></i>
        </div>
      </section>
      <section class="correspondence">
        <div class="all-chats">
          <div class="chat active-chat">
            <h5>Main chat</h5>
          </div>
          <div class="chat other-chat">
            <h5>Nazar Dovgopol <span>(2)</span></h5>
            <img src=${closeChat} alt="close-chat">
          </div>
          <div class="chat other-chat">
            <h5>Nazar Dovgopol <span>(2)</span></h5>
            <img src=${closeChat} alt="close-chat">
          </div>
        </div>
        <div class="messages">
          <div class="user-message">
            <a href="#"><h4>Nazar&nbspDovgopol:</h4></a>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!</p>
          </div>
          <div class="user-message">
            <a href="#"><h4>Nazar&nbspDovgopol:</h4></a>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!</p>
          </div>
          <div class="user-message">
            <a href="#"><h4>Nazar&nbspDovgopol:</h4></a>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!</p>
          </div>
          <div class="user-message">
            <a href="#"><h4>Nazar&nbspDovgopol:</h4></a>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, reiciendis!</p>
          </div>
        </div>
        <div class="enter-message">
          <textarea name="#" id="#"></textarea>
          <div class="modification">
            <img src=${textBold} alt="text-bold" title="text-bold">
            <img src=${textItalic} alt="text-italick" title="text-italick">
            <img src=${textDecoration} alt="text-decoratin" title="text-decoratin">
            <img src=${textLink} alt="text-link" title="text-link">
          </div>
          <div class="more-info">
            <div>
              <h5>Количество символов:<span>54</span></h5>
              <h5>Количество букв:<span>54</span></h5>
              <h5>Количество невидемых символов:<span>54</span></h5>
              <h5>Количество знаков припинания:<span>54</span></h5>
            </div>
            <div class="send-message">
              <button>Send message</button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </main>
    `

    const allUsers = document.querySelector('.users');
    
    fetch('https://studentschat.herokuapp.com/users')
      .then(data => data.json())
      .then(users => {
        // forEach для сортировки;
        users.forEach(user => {
          const item = document.createElement('div');
          
          item.classList.add('user', user.status === 'active' ? 'active' : 'passive');

          item.innerHTML = `
            <div class="info">
              <img src=${logoUser} alt="user" class="user-logo">
              <h3 class="name-user" class="user-name">${user.username}</h3>
            </div>
            <div class=${user.status === 'active' ? 'online' : 'offline'}></div>
          `
          
          allUsers.append(item);
        })
      })

}

const registrationBtn = document.querySelector('.registration .change-form a');
const loginBtn = document.querySelector('.login .change-form a');

const registrationForm = document.querySelector('.registration .form');
const loginForm = document.querySelector('.login .form');

const loginFormHandler = () => {
  document.querySelector('.registration-login.registration').style.display = 'none';
  document.querySelector('.registration-login.login').style.display = 'block';
}

const registrationFormHandler = () => {
  document.querySelector('.registration-login.login').style.display = 'none';
  document.querySelector('.registration-login.registration').style.display = 'block';
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

  if (checkPassword.value.length < 5) {
    alerrError.textContent = 'Введите больше 5 символов в пароле';
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
  let user = {};
  
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "https://studentschat.herokuapp.com/users/register");
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(JSON.stringify({username, password}));

  xhr.onload = () => {
    user = JSON.parse(xhr.response)[0];
    if(xhr.status == 200) {
      render(user);
    }
  };
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

  if (checkPassword.value.length < 5) {
    alerrError.textContent = 'Введите больше 5 символов в пароле';
    alerrError.classList.add('alert-error-show');

    setTimeout(() => alerrError.classList.remove('alert-error-show'), 3000);
    
    return;
  }

  const username = document.querySelector('#user-name-login').value;
  const password = document.querySelector('#user-password-login').value;

  let user = {};
  
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "https://studentschat.herokuapp.com/users/login");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({username, password}));

  xhr.onload = () => {
    user = JSON.parse(xhr.response)[0];
    if(xhr.status == 200) {
      render(user);
    }
  };
}

registrationForm.addEventListener('submit', checkRegistration);
loginForm.addEventListener('submit', checkLogin);

registrationBtn.addEventListener('click', loginFormHandler);
loginBtn.addEventListener('click', registrationFormHandler);