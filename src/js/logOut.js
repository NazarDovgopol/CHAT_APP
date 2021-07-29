import login from './login';
import regitstration from './registration';
import renderForm from './renderForm';

export default function logOutFunc() {
  
  if (!confirm('Вы уверены, что хотите выйти?')) {
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "https://studentschat.herokuapp.com/users/logout");
  xhr.setRequestHeader('Content-Type', 'application/json');
  const user = JSON.parse(window.localStorage.getItem('user'));

  xhr.send(JSON.stringify({
    username: user.username,
  }));

  xhr.onload = () => {
    if(xhr.status == 200) {
      localStorage.clear();
      renderForm();
      login();
      regitstration();
    }
  }
}
