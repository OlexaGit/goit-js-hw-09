import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('.value[data-days]');
const hoursTimer = document.querySelector('.value[data-hours]');
const minutesTimer = document.querySelector('.value[data-minutes]');
const secondsTimer = document.querySelector('.value[data-seconds]');

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      // window.alert('Please choose a date in the future');
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      let timerID = null;
      startBtn.addEventListener('click', () => {
        startBtn.setAttribute('disabled', '');
        // додати дезактивацію onClose(selectedDates)?!
        timerID = setInterval(() => {
          const resultDate = convertMs(selectedDates[0] - Date.now());
          addLeadingZero(resultDate);
          if (
            resultDate.days === 0 &&
            resultDate.hours === 0 &&
            resultDate.minutes === 0 &&
            resultDate.seconds === 0
          ) {
            clearInterval(timerID);
            console.log('clear');
          }
        }, 1000);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

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

function addLeadingZero({ days, hours, minutes, seconds }) {
  // console.log(days, hours, minutes, seconds);
  daysTimer.textContent = days.toString().padStart(2, '0');
  hoursTimer.textContent = hours.toString().padStart(2, '0');
  minutesTimer.textContent = minutes.toString().padStart(2, '0');
  secondsTimer.textContent = seconds.toString().padStart(2, '0');
}
