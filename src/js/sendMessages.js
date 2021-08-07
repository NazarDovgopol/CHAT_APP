import renderMessages from './renderMessages';
import {API} from './getServer';

export default function sendMessage() {
  const enterMessage = document.querySelector('.enter-message');
  const textMessage = enterMessage.querySelector('textarea');
  const user = JSON.parse(window.localStorage.getItem('user'));
  const datetime = new Date().toISOString();

  if (textMessage.value.trim()) {
    if (textMessage.classList.contains('textArea-bold')) {
      textMessage.value = `<b>${textMessage.value}</b>`;
    }

    if (textMessage.classList.contains('textArea-italick')) {
      textMessage.value = `<i>${textMessage.value}</i>`;
    }

    if (textMessage.classList.contains('textArea-underline')) {
      textMessage.value = `<u>${textMessage.value}</u>`;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API}/messages`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      message: textMessage.value,
      username: user.username,
      datetime,
    }));

    xhr.onload = () => {
      if (xhr.status === 200) {
        renderMessages();
        textMessage.value = '';

        document.querySelector('.symbols').innerHTML = 'Количество символов: 0';
        document.querySelector('.letters').innerHTML = 'Количество букв: 0';
        document.querySelector('.number').innerHTML = 'Количество цифр: 0';
        document.querySelector('.symbols-hidden').innerHTML =
        'Количество невидемых символов: 0';
        document.querySelector('.signs').innerHTML = 'Количество знаков: 0';
      };
    };
  }
}
