import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const convertMs = ms => {
  // Number of milliseconds per unit of time//
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

  // Remaining days//
const days = Math.floor(ms / day);
  // Remaining hours//
const hours = Math.floor((ms % day) / hour);
  // Remaining minutes//
const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds//
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
};

let selectDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

    const selected = selectDates[0].getTime();
    if (selected < options.defaultDate.getTime()) {
        Notiflix.Notify.failure('Please choose a date in the future');
    } else {
    startBtn.disabled = false;
    //console.log(selectedDates[0]);//
    return selectDate = selectedDates[0];
        }
    },
};

// flatpickr('#datetime-picker', options);

// function addLeadingZero(value) {
//   if (value < 10) {
//     return value.toString().padStart(2, '0');
//   } else {
//     return value;
//   }
// }

// // const timer = document.querySelectorAll('.timer');//
// // timer.style.color = getRandomHexColor();//

// let daysHtml = document.querySelector('[data-days]');
// let hoursHtml = document.querySelector('[data-hours]');
// let minutesHtml = document.querySelector('[data-minutes]');
// let secondsHtml = document.querySelector('[data-seconds]');

// const getDifference = () => {
//   const todayTime = new Date().getTime();
//   const difference = selectedDate.getTime() - todayTime;
//   //console.log(convertMs(difference));//
//   //console.log(difference);//
//   if (difference < 1000) {
//     clearInterval(timerId);
//   }
//   const resultDays = convertMs(difference).days;
//   daysHtml.textContent = addLeadingZero(resultDays);

//   const resultHours = convertMs(difference).hours;
//   hoursHtml.textContent = addLeadingZero(resultHours);

//   const resultMinutes = convertMs(difference).minutes;
//   minutesHtml.textContent = addLeadingZero(resultMinutes);

//   const resultSeconds = convertMs(difference).seconds;
//   secondsHtml.textContent = addLeadingZero(resultSeconds);
// };

// let timerId = null;
// startBtn.addEventListener('click', () => {
//   startBtn.disabled = true;
//   getDifference();
//   timerId = setInterval(() => {
//     getDifference();
//   }, 1000);
// });