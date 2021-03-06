import logo from '../images/logo.png';

export default function renderForm() {
  document.querySelector('.body').innerHTML = `
    <header class="header">
      <div class="logo">
        <a href="#"><img src=${logo} alt="logo"></a>
        <a href="#"><h2>CHAT ONLINE</h2></a>
      </div>
    </header>
    <div class="registration-login registration">
      <form class="form">
        <fieldset>
          <legend>Регистрация</legend>
          <div class="change-form">
            <a href="#">Войти</a>
          </div>
          <div class="name">
            <label for="user-name-registration">Предумайте ваш логин</label>
            <input type="text" id="user-name-registration"
            placeholder="Nazar Dovgopol" required>
          </div>
          <div class="password">
            <label for="user-password-registration">Введите ваш пароль</label>
            <input type="password" id="user-password-registration"
            placeholder="Минимум 4 символа" required>
          </div>
          <div class="confirm-password">
            <label for="user-password-confirm">Повторите пароль</label>
            <input type="password" id="user-password-confirm"
            placeholder="Пароли должны совпадать" required>
          </div>
          <div class="check-registration">
            <button type="submit" class="check-registration-button">
            Зарегистрироваться
            </button>
          </div>
        </fieldset>
      </form>
      <p class="alert-error-hide"></p>
    </div>
    <div class="registration-login login">
      <form class="form">
        <fieldset>
          <div class="change-form">
            <a href="#">Зарегистрироваться</a>
          </div>
          <legend>Вход</legend>
          <div class="name">
            <label for="user-name-login">Введите ваш логин</label>
            <input type="text" id="user-name-login"
            placeholder="Nazar Dovgopol" required>
          </div>
          <div class="password">
            <label for="user-password-login">Введите ваш пароль</label>
            <input type="password" id="user-password-login"
            placeholder="Введите ваш пароль" required>
          </div>
          <div class="check-login">
            <button type="submit" class="check-login-button">Войти</button>
          </div>
        </fieldset>
      </form>
      <p class="alert-error-hide"></p>
    </div>
  `;
};
