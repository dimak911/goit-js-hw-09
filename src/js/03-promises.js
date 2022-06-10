import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let delayValue = Number(refs.delay.value);
  const stepValue = Number(refs.step.value);
  const amountValue = Number(refs.amount.value);
  const totalDelay = amountValue * stepValue + delayValue;
  refs.submitBtn.setAttribute('disabled', 'disabled');
  setTimeout(() => {
    refs.submitBtn.removeAttribute('disabled');
  }, totalDelay);

  for (let i = 1; i < amountValue + 1; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => onSuccessMsg(position, delay))
      .catch(({ position, delay }) => onErrorMsg(position, delay));
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const promiseProps = { position, delay };
  const shouldResolve = Math.random() > 0.5;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(promiseProps);
      } else {
        reject(promiseProps);
      }
    }, delay);
  });

  return promise;
}

function onSuccessMsg(position, delay) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function onErrorMsg(position, delay) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}
