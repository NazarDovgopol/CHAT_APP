import logo from '../images/logo.png';
import edit from '../images/edit.png';
import logOut from '../images/log-out.png';
import closeChat from '../images/close-chat.png';
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

const render = ({ username }) => {
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
      <section class="users">
        <div class="user-status">
          <i><h3 class="user-status-online"></h3></i>
          <i><h3 class="user-status-offline"></h3></i>
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

  renderUsers();
  renderMessages();
  onlineTimeUser();
  localTimeUser();

  setInterval(renderMessages, 2000);

  const sendBtn = document.querySelector('.send-message button');
  sendBtn.addEventListener('click', sendMessage);
  document.querySelector('.enter-message textarea').addEventListener('keydown', (event) => {
    if (event.code == 'Enter') {
      sendMessage();
    }
  });

  const logOutBtn = document.querySelector('.logout');
  logOutBtn.addEventListener('click', logOutFunc);
}

export default render;
