export default function renderMessage() {
  const allMessage = document.querySelector('.messages');

  fetch('https://studentschat.herokuapp.com/messages')
    .then(data => data.json())
    .then(users => {
      users.forEach(user => {
        const item = document.createElement('div');
        
        item.classList.add('user-message');
  
        item.innerHTML = `
            <a href="#"><h4>${user.username}:</h4></a>
            <p>${user.message}</p>
        `
        
        allMessage.append(item);
      })
    })
}
