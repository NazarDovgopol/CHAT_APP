export default function onlineTimeUser() {
  let sec = 1;
  let min = 0;
  let hour = 0;
  const onlineTime = document.querySelector('.online-time');

  setInterval(() => {
    if (sec < 60) {
      onlineTime.textContent = `
        You are online for: 
        ${hour !== 0 ? `${hour}h` : ''}
        ${min !== 0 ? `${min}m` : ''} 
        ${sec}s
      `;
      sec++;
    } 
    
    if (sec == 60) {
      sec = 0;
      min++;
    }

    if (min == 60) {
      sec = 0;
      min = 0;
      hour++;
    }    
  }, 1000);
}
