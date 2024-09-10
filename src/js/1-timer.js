import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysDisp = document.querySelector('[data-days]');
const hoursDisp = document.querySelector('[data-hours]');
const minutesDisp = document.querySelector('[data-minutes]');
const secondsDisp = document.querySelector('[data-seconds]');

let countdownInterval;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate && selectedDate.getTime() > Date.now()) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);

  countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeDifference = selectedDate.getTime() - currentTime;

    startButton.disabled = true;
    dateTimePicker.disabled = true;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      iziToast.info({
        title: 'Info',
        message: 'Countdown finished!',
        position: 'topRight',
      });
      startButton.disabled = false;
      dateTimePicker.disabled = false;
      return;
    }

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysDisp.textContent = addLeadingZero(days);
    hoursDisp.textContent = addLeadingZero(hours);
    minutesDisp.textContent = addLeadingZero(minutes);
    secondsDisp.textContent = addLeadingZero(seconds);
  }
});
