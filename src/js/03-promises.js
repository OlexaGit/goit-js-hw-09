import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onClickSubmit);

function onClickSubmit(e) {
  e.preventDefault();
  // console.log('hi');
  const formElements = e.currentTarget.elements;
  const delayEl = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  // console.log('delay:', delay);
  // console.log('step:', step);
  // console.log(amount + 1);
  let delay = delayEl;
  console.log('delay:', delay);
  for (let i = 1; i < amount + 1; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // console.log('delayCR:', delay);
        // console.log('position:', position);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay = delay + step;
    // console.log('delayEl + step:', delay);
    // console.log('i:', i);
  }
}

function createPromise(position, delay) {
  // console.log('delayCR:', delay);
  // console.log('position:', position);
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
