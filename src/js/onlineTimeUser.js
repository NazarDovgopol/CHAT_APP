export const time = {
  sec: 1,
  min: 0,
  hour: 0,
}

export default function onlineTimeUser() {
  const onlineTime = document.querySelector('.online-time'); 

  if (time.sec < 60) {
    onlineTime.textContent = `
      You are online for: 
      ${time.hour !== 0 ? `${time.hour}h` : ''}
      ${time.min !== 0 ? `${time.min}m` : ''} 
      ${time.sec}s
    `;
    time.sec++;
  } 
  
  if (time.sec == 60) {
    time.sec = 0;
    time.min++;
  }

  if (time.min == 60) {
    time.sec = 0;
    time.min = 0;
    time.hour++;
  }
}
