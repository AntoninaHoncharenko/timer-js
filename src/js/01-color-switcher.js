const startBtnRef = document.querySelector('[data-start]');
const stoptBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtnRef.addEventListener('click', onStartBtnClick);
stoptBtnRef.addEventListener('click', onStopBtnClick);
let timerId = null;

function onStartBtnClick() {
  bodyRef.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnRef.disabled = true;
  stoptBtnRef.disabled = false;
}

function onStopBtnClick() {
  clearInterval(timerId);
  startBtnRef.disabled = false;
  stoptBtnRef.disabled = true;
}
