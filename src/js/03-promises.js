refs = {
  form: document.querySelector('form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

let delayValue = null;
let amount = null;
let step = null;

function createPromise(position, delay) {
  delayValue = Number(refs.delayInput.value);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position: position, delay: delayValue });
      } else {
        reject({ position: position, delay: delayValue });
      }
    }, delayValue);
  });
}

function onSubmit(event) {
  event.preventDefault();
  amount = Number(refs.amountInput.value);

  for (let i = 0; i < amount; i += 1) {
    // console.log(i);
    step = Number(refs.stepInput.value);
    // let interval = delayValue + step;
    // console.log(delayValue);
    // console.log(interval);

    createPromise(amount, delayValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += step;
  }
}
