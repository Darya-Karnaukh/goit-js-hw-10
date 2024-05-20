import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const myInput = document.querySelector("input#datetime-picker");
const btnStart = document.querySelector('button[data-start]');

window.addEventListener('DOMContentLoaded', () => {
    btnStart.disabled = true;
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        const clickDate = selectedDates[0];

        if (clickDate <= currentDate) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            btnStart.disabled = true;
        } else {
            btnStart.disabled = false;
            userSelectedDate = clickDate;
        }
    },
};

function convertMs(deltaTime) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(deltaTime / day);
    const hours = Math.floor((deltaTime % day) / hour);
    const minutes = Math.floor(((deltaTime % day) % hour) / minute);
    const seconds = Math.floor((((deltaTime % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

btnStart.addEventListener('click', () => {
    btnStart.disabled = true;
    myInput.disabled = true;

    const interval = setInterval(() => {
        const currentDate = new Date();
        const deltaTime = userSelectedDate - currentDate;

        if (deltaTime <= 0) {
            clearInterval(interval);
            btnStart.disabled = false;
            myInput.disabled = false;

            iziToast.success({
                title: 'Success',
                message: 'Countdown completed!',
                position: 'topRight',
            });

            return;
        }

        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        daysElement.textContent = addLeadingZero(days);
        hoursElement.textContent = addLeadingZero(hours);
        minutesElement.textContent = addLeadingZero(minutes);
        secondsElement.textContent = addLeadingZero(seconds);
    }, 1000);
});

flatpickr(myInput, options);
