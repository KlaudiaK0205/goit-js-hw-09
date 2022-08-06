import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector(`button[data-start]`);

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '50vw',
      });
    }
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      startBtn.disabled = false;
      localStorage.setItem('selectedDate', `${selectedDates[0].getTime()}`);
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

function addLeadingZero(num) {
  if (`${num}`.length === 1) {
    return (num = `${num}`.padStart(2, '0'));
  } else {
    return `${num}`;
  }
}

const resultDays = document.querySelector('span[data-days]');
const resultHours = document.querySelector('span[data-hours]');
const resultMinutes = document.querySelector('span[data-minutes]');
const resultSeconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', () => {
  const intFunction = () => {
    const selectDate = localStorage.getItem('selectedDate');
    const dateToday = new Date();
    const getDate = dateToday.getTime();
    const ms = selectDate - getDate;
    const objDate = convertMs(ms);
    if (ms < 1000) {
      clearInterval(timerId);
    }
    const leftTime = () => {
      resultDays.textContent = `${addLeadingZero(objDate.days)}`;
      resultHours.textContent = `${addLeadingZero(objDate.hours)}`;
      resultMinutes.textContent = `${addLeadingZero(objDate.minutes)}`;
      resultSeconds.textContent = `${addLeadingZero(objDate.seconds)}`;
    };
    leftTime();
  };
  
  const timerId = setInterval(intFunction, 1000);
});

// DONE