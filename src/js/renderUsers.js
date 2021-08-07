import logoUser from '../images/logo-user.png';
import {API} from './getServer';
import closeChat from '../images/close-chat.png';

// avatars
import one from '../images/assets/1.svg';
import nullOne from '../images/assets/01.svg';
import two from '../images/assets/2.svg';
import nullTwo from '../images/assets/02.svg';
import three from '../images/assets/3.svg';
import nullThree from '../images/assets/03.svg';
import four from '../images/assets/4.svg';
import nullFour from '../images/assets/04.svg';
import five from '../images/assets/5.svg';
import nullFive from '../images/assets/05.svg';
import six from '../images/assets/6.svg';
import nullSix from '../images/assets/06.svg';
import nullSeven from '../images/assets/07.svg';
import nullEight from '../images/assets/08.svg';
import nullNine from '../images/assets/09.svg';
import nullTen from '../images/assets/10.svg';
import nullEleven from '../images/assets/11.svg';
import nullTwelve from '../images/assets/12.svg';
import w1 from '../images/assets/w1.svg';
import w2 from '../images/assets/w2.svg';
import w3 from '../images/assets/w3.svg';
import w4 from '../images/assets/w4.svg';
import w5 from '../images/assets/w5.svg';
import w6 from '../images/assets/w6.svg';

const avatars = {
  '1': one,
  '01': nullOne,
  '2': two,
  '01': nullTwo,
  '3': three,
  '03': nullThree,
  '4': four,
  '04': nullFour,
  '5': five,
  '05': nullFive,
  '6': six,
  '06': nullSix,
  '07': nullSeven,
  '08': nullEight,
  '09': nullNine,
  '10': nullTen,
  '11': nullEleven,
  '12': nullTwelve,
  'w1': w1,
  'w2': w2,
  'w3': w3,
  'w4': w4,
  'w5': w5,
  'w6': w6,
};

let usersLength = 0;

export default function renderUsers(value) {
  if (value === 0) {
    usersLength = 0;
  }

  const allUsers = document.querySelector('.users');

  fetch(`${API}/users`)
      .then((data) => data.json())
      .then((users) => {
        const userStatusOnline = document.querySelector('.user-status-online');
        const userStatusOffline =
        document.querySelector('.user-status-offline');
        const arrActive = [];
        const arrPassive = [];
        users.forEach((user) => {
          if (user.status === 'active') {
            arrActive.push(user);
          } else {
            arrPassive.push(user);
          };
        });

        userStatusOnline.textContent = `Online: ${arrActive.length}`;
        userStatusOffline.textContent = `Offline: ${arrPassive.length}`;

        if (usersLength === users.length) {
          return;
        } else if (usersLength === users.length - 1) {
          const item = document.createElement('div');
          item.classList.add('user',
          users[users.length - 1].status ==='active' ? 'active' : 'passive');

          item.innerHTML = `
            <div class="info">
              <img src=${avatars[user.avatarId] || logoUser}
              alt="user" class="user-logo">
              <h3 class="name-user" class="user-name">
              ${users[users.length - 1].username}
              </h3>
            </div>
            <div class=
            ${users[users.length - 1].status ===
            'active' ? 'online' : 'offline'}>
            </div>
          `;
          allUsers.prepend(item);
        } else {
          const arrAllUsers = arrActive.concat(arrPassive);
          arrAllUsers.forEach((user) => {
            const item = document.createElement('div');
            item.classList.add('user',
            user.status === 'active' ? 'active' : 'passive');

            item.innerHTML = `
              <div class="info">
                <img src=${avatars[user.avatarId] || logoUser}
                alt="user" class="user-logo">
                <h3 class="name-user" class="user-name">${user.username}</h3>
              </div>
              <div class=
              ${user.status === 'active' ? 'online' : 'offline'}>
              </div>
            `;
            item.addEventListener('click', () => {
              const newChat = document.querySelector('.all-chats');
              const itemChat = document.createElement('div');
              itemChat.classList.add('chat', 'other-chat');

              itemChat.innerHTML = `
                <img class="other-chat-avatar"
                src=${avatars[user.avatarId] || logoUser}
                <h5>${user.username}</h5>
                <button><img src=${closeChat} alt="close-chat"></button>
                
              `;
              newChat.append(itemChat);
              itemChat.querySelector('button').addEventListener('click', () => {
                itemChat.remove();
              });
            });

            allUsers.append(item);
          });
        }
        usersLength = users.length;
      });
}
