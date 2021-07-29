let usersLength = 0;

export default function renderMessages() {
  const allMessage = document.querySelector('.messages');
  
  fetch('https://studentschat.herokuapp.com/messages')
    .then(data => data.json())
    .then(users => {
      if (usersLength == users.length) {
        return;
      } else {
        for (let i = usersLength; i < users.length; i++) {
          let user = users[i];
          const item = document.createElement('div');
          item.classList.add('user-message');
          
          const localUser = JSON.parse(window.localStorage.getItem('user'));

          if (user.username == localUser.username) {
            item.classList.add('just-now');
            item.innerHTML = `
              <a href="#"><h4></h4></a>
              <p>${user.message}</p>
            `
          } else {
            item.innerHTML = `
              <a href="#"><h4>${user.username}:</h4></a>
              <p>${user.message}</p>
            `
          }

          allMessage.append(item);
          if (usersLength != 0) {
            allMessage.scrollTo({
              top: 10000,
              behavior: "smooth"
            })
          }
        }
      }
        
      usersLength = users.length;
    })
}
