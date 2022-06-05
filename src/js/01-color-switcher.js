const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

function onStart() {
  if (refs.stop.hasAttribute('disabled')) {
    refs.stop.removeAttribute('disabled');
  }
  refs.start.setAttribute('disabled', 'disabled');

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  if (refs.start.hasAttribute('disabled')) {
    refs.start.removeAttribute('disabled');
  }
  refs.stop.setAttribute('disabled', 'disabled');

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
