import login from './login';
import registration from './registration';
import renderForm from './renderForm';
import { time } from './onlineTimeUser';
import { API } from './getServer';

export default function logOutFunc() {
  if (!confirm('Вы уверены, что хотите выйти?')) {
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.open("POST", `${API}/users/logout`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const user = JSON.parse(window.localStorage.getItem('user'));

  xhr.send(JSON.stringify({
    username: user.username,
  }));

  xhr.onload = () => {
    if(xhr.status === 200) {
      clearInterval(localStorage.getItem('renderMessages'));
      clearInterval(localStorage.getItem('onlineTimeUser'));
      clearInterval(localStorage.getItem('localTimeUser'));
      clearInterval(localStorage.getItem('renderUsers'));
      localStorage.clear();

      time.sec = 1;
      time.min = 0;
      time.hour = 0;
      
      renderForm();
      login();
      registration();
    }
  }
}
