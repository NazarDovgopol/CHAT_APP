import 'babel-polyfill';
import '../style/style.scss';

import registration from './registration';
import login from './login';
import renderForm from './renderForm';
import renderChat from './renderChat.js';

if (localStorage.getItem('user')) {
  const user = JSON.parse(window.localStorage.getItem('user'));
  renderChat(user);
} else {
  renderForm();
}

registration();
login();
