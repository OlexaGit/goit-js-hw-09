import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onClickSubmit);

function onClickSubmit(e) {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const delayEl = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  let delay = delayEl;
  // console.log('delay:', delay);
  for (let i = 1; i < amount + 1; i += 1) {
    createPromise(i, delay)
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(error => {
        Notiflix.Notify.warning(error);
      });
    delay = delay + step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // Fulfill
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
        // Reject
      }
    }, delay);
  });
}
