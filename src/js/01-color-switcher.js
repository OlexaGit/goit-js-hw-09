const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const backgroundBody = document.querySelector('body');
let timerChangColor = null;

startBtn.addEventListener('click', () => {
  timerChangColor = setInterval(() => {
    backgroundBody.style.backgroundColor = getRandomHexColor();
  }, 1000);

  backgroundBody.style.backgroundColor = getRandomHexColor();
  startBtn.setAttribute('disabled', '');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerChangColor);
  startBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
