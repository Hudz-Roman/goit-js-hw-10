import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function stopDefAction(evt) {
  evt.preventDefault();
}

function createPromise(delay, state) {
  if (state === fulfillEl) {
    // Fulfill
  } else {
    // Reject
  }
}
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
