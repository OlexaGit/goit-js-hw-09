import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const inputDate = document.querySelector('#datetime-picker');
// const inputDate = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      let timerID = null;
      startBtn.addEventListener('click', () => {
        startBtn.setAttribute('disabled', '');
        timerID = setInterval(() => {
          const resultDate = convertMs(selectedDates[0] - Date.now());
          console.log(resultDate);
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
