import logo from '../images/logo.png';
import logOut from '../images/log-out.png';
import textBold from '../images/text-bold.png';
import textItalic from '../images/text-italic.png';
import textDecoration from '../images/text-decoration.png';
import renderUsers from './renderUsers';
import renderMessages from './renderMessages';
import sendMessage from './sendMessages';
import onlineTimeUser from './onlineTimeUser';
import localTimeUser from './localTimeUser';
import logOutFunc from './logOut';

const renderChat = ({username}) => {
  document.querySelector('.body').innerHTML = `
    <header class="header">
    <div class="logo">
      <a href="#"><img src=${logo} alt="logo"></a>
      <a href="#"><h2>CHAT ONLINE</h2></a>
    </div>
    <div>
      <div class="time">
        <h3><i>Nick:</i> <span class="nickname">${username}</span></h3><br>
        <i><h3 class="online-time">You are online for:</h3></i>
        <i><h3 class="local-time">Your local time is:</h3></i>
      </div>
        <div class="profile">
          <a href="#" title="Logout" class="logout">
          <img src=${logOut} alt="Logout">
          </a>
        </div>
    </div>
    </header>
    <main class="main">
    <div class="main-flex">
    <section class="all-info-users">
      <div class="user-status">
        <i><h3 class="user-status-online"></h3></i>
        <i><h3 class="user-status-offline"></h3></i>
      </div>
      <div class="users">
      </div>
    </section>
      <section class="correspondence">
        <div class="all-chats">
          <div class="chat active-chat">
            <h5>Main chat</h5>
          </div>
        </div>
        <section class="messages">
        </section>
        <div class="enter-message">
          <textarea name="#" id="#"></textarea>
          <div class="modification">
            <button class="textArea-boldBtn"><img src=${textBold}
            alt="text-bold" title="text-bold">
            </button>
            <button class="textArea-italickBtn"><img src=${textItalic}
            alt="text-italick" title="text-italick">
            </button>
            <button class="textArea-underlineBtn"><img src=${textDecoration}
            alt="text-decoratin" title="text-decoratin">
            </button>
          </div>
          <div class="more-info">
            <div>
              <h5 class="symbols">Количество символов: 0 </h5>
              <h5 class="letters">Количество букв: 0</h5>
              <h5 class="number">Количество цифр: 0</h5>
              <h5 class="symbols-hidden">Количество невидемых символов: 0</h5>
              <h5 class="signs">Количество знаков: 0</h5>
            </div>
            <div class="send-message">
              <button>Send message</button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </main>
  `;
  renderMessages(0);
  renderUsers(0);

  localStorage.setItem('renderMessages', setInterval(renderMessages, 2000));
  localStorage.setItem('onlineTimeUser', setInterval(onlineTimeUser, 1000));
  localStorage.setItem('localTimeUser', setInterval(localTimeUser, 1000));
  localStorage.setItem('renderUsers', setInterval(renderUsers, 1000));

  const sendBtn = document.querySelector('.send-message button');
  sendBtn.addEventListener('click', sendMessage);

  const textArea = document.querySelector('.enter-message textarea');

  textArea.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  textArea.addEventListener('keyup', () => {
    const symbols = document.querySelector('.symbols');
    const number = document.querySelector('.number');
    const letters = document.querySelector('.letters');
    const symbolsHidden = document.querySelector('.symbols-hidden');
    const signs = document.querySelector('.signs');

    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let s4 = 0;

    for (let i = 0; i < textArea.value.length; i++) {
      const charCodeAt = textArea.value.charCodeAt(i);

      if ((charCodeAt > 64 && charCodeAt < 91) ||
      (charCodeAt > 96 && charCodeAt < 123)) {
        s1++;
      }

      if (charCodeAt > 47 && charCodeAt < 58) {
        s2++;
      }

      if (charCodeAt === 32) {
        s3++;
      }

      if ((charCodeAt > 32 && charCodeAt < 48) ||
          (charCodeAt > 57 && charCodeAt < 65) ||
          (charCodeAt > 90 && charCodeAt < 97) ||
          (charCodeAt > 122 && charCodeAt < 127)) {
        s4++;
      }
    }
    symbols.innerHTML = `Количество символов: ${textArea.value.length}`;
    letters.innerHTML = `Количество букв: ${s1}`;
    number.innerHTML = `Количество цифр: ${s2}`;
    symbolsHidden.innerHTML = `Количество невидемых символов: ${s3}`;
    signs.innerHTML = `Количество знаков: ${s4}`;
  });

  const textAreaBold = document.querySelector('.textArea-boldBtn');
  const textAreaItalick = document.querySelector('.textArea-italickBtn');
  const textAreaUnderline = document.querySelector('.textArea-underlineBtn');

  textAreaBold.addEventListener('click', () => {
    if (textArea.classList.contains('textArea-bold')) {
      textArea.classList.remove('textArea-bold');
      textAreaBold.style.backgroundColor = 'white';
    } else {
      textArea.classList.add('textArea-bold');
      textAreaBold.style.backgroundColor = 'lightgrey';
    }
  });

  textAreaItalick.addEventListener('click', () => {
    if (textArea.classList.contains('textArea-italick')) {
      textArea.classList.remove('textArea-italick');
      textAreaItalick.style.backgroundColor = 'white';
    } else {
      textArea.classList.add('textArea-italick');
      textAreaItalick.style.backgroundColor = 'lightgrey';
    }
  });

  textAreaUnderline.addEventListener('click', () => {
    if (textArea.classList.contains('textArea-underline')) {
      textArea.classList.remove('textArea-underline');
      textAreaUnderline.style.backgroundColor = 'white';
    } else {
      textArea.classList.add('textArea-underline');
      textAreaUnderline.style.backgroundColor = 'lightgrey';
    }
  });


  const logOutBtn = document.querySelector('.logout');
  logOutBtn.addEventListener('click', logOutFunc);
};

export default renderChat;
