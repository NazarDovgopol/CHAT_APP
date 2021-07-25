import logoUser from '../images/logo-user.png';

export default function renderUsers() {
  const allUsers = document.querySelector('.users');

  fetch('https://studentschat.herokuapp.com/users')
    .then(data => data.json())
    .then(users => {
      const userStatusOnline = document.querySelector('.user-status-online');
      const userStatusOffnline = document.querySelector('.user-status-offline');
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
      userStatusOffnline.textContent = `Offline: ${arrPassive.length}`;

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
        
        allUsers.append(item);
      })
    })
}
