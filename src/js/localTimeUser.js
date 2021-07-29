export default function localTimeUser() {
  const onlineTime = document.querySelector('.local-time');

  setInterval(() => {
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();

    onlineTime.textContent = `
      Your local time is:
      ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}
    `
  }, 1000);
}
