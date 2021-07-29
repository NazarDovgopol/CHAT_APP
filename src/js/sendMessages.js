import renderMessages from "./renderMessages";

export default function sendMessage() {
  const enterMessage = document.querySelector('.enter-message');
  const textMessage = enterMessage.querySelector('textarea');
  const user = JSON.parse(window.localStorage.getItem('user'));
  const detatime = new Date().toISOString();

  if (textMessage != false) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://studentschat.herokuapp.com/messages");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      message: textMessage.value, 
      username: user.username, 
      detatime,
    }));
  
    xhr.onload = () => {
      if(xhr.status == 200) {
        renderMessages();
        textMessage.value = '';
      }
    }
  }
}