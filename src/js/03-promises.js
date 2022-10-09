import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  form: document.querySelector('form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(refs.delayInput.value);
  const amount = Number(refs.amountInput.value);
  const step = Number(refs.stepInput.value);

  if (delay < 0 || amount <= 0 || step < 0) {
    Notify.failure('Please enter positive value', {
      position: 'center-center',
      backOverlay: 'true',
      clickToClose: true,
    });
    refs.form.reset();
    return;
  }

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  refs.form.reset();
}
