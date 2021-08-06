import renderMessages from "./renderMessages";
import { API } from './getServer';

export default function sendMessage() {
  const enterMessage = document.querySelector('.enter-message');
  const textMessage = enterMessage.querySelector('textarea');
  const user = JSON.parse(window.localStorage.getItem('user'));
  const datetime = new Date().toISOString();
  debugger
  if (textMessage.value != false) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API}/messages`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      message: textMessage.value, 
      username: user.username, 
      datetime,
    }));
  
    xhr.onload = () => {
      if(xhr.status == 200) {
        renderMessages();
        textMessage.value = '';
      }
    }
  }
}
