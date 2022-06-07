// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datePickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
};
const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'd-m-Y H:i:S',
  onOpen: setCurrentDate,
  onClose: calculateTimeToTargetDate,
  onChange: [toggleStartBtn, checkPastDate],
};

let currentDate = null;
let timeToTargetDate = null;

refs.startBtn.setAttribute('disabled', 'disabled');

flatpickr(refs.datePickerInput, options);

refs.startBtn.addEventListener('click', startTimer);

function checkPastDate(selectedDate) {
  if (selectedDate[0] < currentDate) {
    alert('Please choose a date in the future');
  }
}

function toggleStartBtn(selectedDate) {
  if (!(selectedDate[0] < currentDate)) {
    refs.startBtn.removeAttribute('disabled');
  } else {
    refs.startBtn.setAttribute('disabled', 'disabled');
  }
}

function setCurrentDate() {
  currentDate = new Date();
}

function calculateTimeToTargetDate(selectedDate) {
  timeToTargetDate = selectedDate[0].getTime() - currentDate.getTime();
}

function startTimer() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  const timerID = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeToTargetDate);

    document.getElementById('days').innerText = addLeadingZero(days);
    document.getElementById('hours').innerText = addLeadingZero(hours);
    document.getElementById('minutes').innerText = addLeadingZero(minutes);
    document.getElementById('seconds').innerText = addLeadingZero(seconds);

    timeToTargetDate -= 1000;

    if (timeToTargetDate <= 0) {
      clearInterval(timerID);
      document.querySelector('.container').innerHTML = '<h1>YOU WIN</h1>';
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
