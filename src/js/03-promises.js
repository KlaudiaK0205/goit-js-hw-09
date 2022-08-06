import Notiflix, {Notify} from 'notiflix';

const createBtn = document.querySelector('button');
const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
  return promise;
};

form.addEventListener('click', event => {
  event.preventDefault();
  const delay = Number(form.elements.amount.value);
  const delaySteps = Number(form.elements.step.value);
  const amount = Number(form.elements.delay.value);

  for (let i = 1; i <= delay; i += 1) {
    let stepTime = amount + delaySteps * (i - 1);
    createPromise(i, stepTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });
  }
});

// DONE