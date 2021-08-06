let messagesLength = 0;
import { API } from './getServer';

export default function renderMessages(value) {
  if (value === 0) {
    messagesLength = 0;
  }

  const allMessage = document.querySelector('.messages');

  fetch(`${API}/messages`)
    .then(data => data.json())
    .then(users => {
      if (messagesLength === users.length) {
        return;
      } else {
        for (let i = messagesLength; i < users.length; i++) {
          let user = users[i];
          const item = document.createElement('div');
          item.classList.add('user-message');
          
          const localUser = JSON.parse(window.localStorage.getItem('user'));

          let datetime = user.datetime?.slice(user.datetime.indexOf('-')+1, user.datetime.indexOf('T')) || '';
          datetime += ' ' + (user.datetime?.slice(user.datetime.indexOf('.')-8, user.datetime.indexOf('.')-3) || '');

          if (user.username === localUser.username) {
            item.classList.add('just-now');
            item.innerHTML = `
              <a href="#"><h4></h4></a>
              <div class="message-datetime">
                <div>${user.message}</div>
                <div class="datetime">${datetime}</div>
              </div>
            `
          } else {
            item.innerHTML = `
              <a href="#"><h4>${user.username}:</h4></a>
              <div class="message-datetime">
                <div>${user.message}</div>
                <div class="datetime">${datetime}</div>
              </div>
            `
          }

          allMessage.append(item);
          if (messagesLength !== 0) {
            allMessage.scrollTo({
              top: 10000,
              behavior: "smooth"
            })
          }
        }
      }
        
      messagesLength = users.length;
    })
}
