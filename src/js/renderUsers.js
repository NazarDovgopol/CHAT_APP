import logoUser from '../images/logo-user.png';
import { API } from './getServer';
import closeChat from '../images/close-chat.png';

let usersLength = 0;

export default function renderUsers(value) {
  if (value === 0) {
    usersLength = 0;
  }

  const allUsers = document.querySelector('.users');

  fetch(`${API}/users`)
    .then(data => data.json())
    .then(users => {
      const userStatusOnline = document.querySelector('.user-status-online');
      const userStatusOffline = document.querySelector('.user-status-offline');
      const arrActive = [];
      const arrPassive = [];
      users.forEach(user => {
        if (user.status === 'active') {
          arrActive.push(user);
        } else {
          arrPassive.push(user);
        }
      })

      userStatusOnline.textContent = `Online: ${arrActive.length}`;
      userStatusOffline.textContent = `Offline: ${arrPassive.length}`;

      if (usersLength === users.length) {
        return;
      } else if (usersLength === users.length - 1) {
        const item = document.createElement('div');
        item.classList.add('user', users[users.length - 1].status === 'active' ? 'active' : 'passive');

        item.innerHTML = `
          <div class="info">
            <img src=${logoUser} alt="user" class="user-logo">
            <h3 class="name-user" class="user-name">${users[users.length - 1].username}</h3>
          </div>
          <div class=${users[users.length - 1].status === 'active' ? 'online' : 'offline'}></div>
        `
        allUsers.prepend(item);

      } else {
        const arrAllUsers = arrActive.concat(arrPassive);
        
        arrAllUsers.forEach(user => {
          const item = document.createElement('div');
          item.classList.add('user', user.status === 'active' ? 'active' : 'passive');
  
          item.innerHTML = `
            <div class="info">
              <img src=${logoUser} alt="user" class="user-logo">
              <h3 class="name-user" class="user-name">${user.username}</h3>
            </div>
            <div class=${user.status === 'active' ? 'online' : 'offline'}></div>
          `

          item.addEventListener('click', () => {
            const newChat = document.querySelector('.all-chats');
            const itemChat = document.createElement('div');
            itemChat.classList.add('chat', 'other-chat');

            itemChat.innerHTML = `
              <h5>${user.username}</h5>
              <button><img src=${closeChat} alt="close-chat"></button>
              
            `
            newChat.append(itemChat);
            itemChat.querySelector('button').addEventListener('click', () => {
              itemChat.remove();
            })
          })

          allUsers.append(item);
        })
      }
      usersLength = users.length;
    })
}
