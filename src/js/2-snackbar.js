import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const stateFulfilled = document.querySelector('input[name="state"][value="fulfilled"]');
const stateReject = document.querySelector('input[name="state"][value="rejected"]');




const promis = ({delay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const inputValue = inputDelay.value;
  const delay = Number(inputValue);
  if (stateFulfilled.checked) {
    promis ({ delay })
        .then(delay =>
        iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topRight',
      })
    );
  } else if (stateReject.checked) {
    promis({ delay, shouldResolve: false })
        .catch(delay =>
        iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topRight',
      })
    );
  }
});