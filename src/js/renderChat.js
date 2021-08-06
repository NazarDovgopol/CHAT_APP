import logo from '../images/logo.png';
import edit from '../images/edit.png';
import logOut from '../images/log-out.png';
import textBold from '../images/text-bold.png';
import textItalic from '../images/text-italic.png';
import textDecoration from '../images/text-decoration.png';
import textLink from '../images/text-link.png';
import renderUsers from './renderUsers';
import renderMessages from './renderMessages';
import sendMessage from './sendMessages';
import onlineTimeUser from './onlineTimeUser';
import localTimeUser from './localTimeUser';
import logOutFunc from './logOut';

const renderChat = ({ username }) => {
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
          <a href="#" title="Edit profile" class="edit"><img src=${edit} alt="Edit profile"></a>
          <a href="#" title="Logout" class="logout"><img src=${logOut} alt="Logout"></a>
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
            <img src=${textBold} alt="text-bold" title="text-bold">
            <img src=${textItalic} alt="text-italick" title="text-italick">
            <img src=${textDecoration} alt="text-decoratin" title="text-decoratin">
            <img src=${textLink} alt="text-link" title="text-link">
          </div>
          <div class="more-info">
            <div>
              <h5 class="symbols">Количество символов: 0 </h5>
              <h5 class="letters">Количество букв 0: </h5>
              <h5 class="symbols-hidden">Количество невидемых символов: 0</h5>
              <h5 class="signs">Количество знаков припинания: 0</h5>
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
    const symbols = document.querySelector('.symbols');
    // const letters = document.querySelector('.letters');
    // const symbolsHidden = document.querySelector('.symbols-hidden');
    // const signs = document.querySelector('.signs');
    let value = 0;

    for (let i = 0; i <= textArea.value.length; i++) {
      // берет первый символ
      if (textArea.value.charCodeAt(textArea.value[i]) < 66) {
        debugger
        value++;
        symbols.innerHTML = `Количество символов: ${value}`;
      }
    }

    if (event.code === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  const logOutBtn = document.querySelector('.logout');
  logOutBtn.addEventListener('click', logOutFunc);
}

export default renderChat;
