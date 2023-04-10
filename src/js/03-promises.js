import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onClickSubmit);

function onClickSubmit(e) {
  e.preventDefault();
  console.log('hi');
  const formElements = e.currentTarget.elements;
  const delay = formElements.delay.value;
  const step = formElements.step.value;
  const amount = formElements.amount.value;
  // console.log('delay:', delay);
  // console.log('step:', step);
  // console.log('amount:', amount);
  // createPromise(amount, delay);
  // // for (let i = 1; i <= amountEl; i += 1) {

  createPromise(amount, 3000)
    .then(({ position, delay }) => {
      console.log('delayCR:', delay);
      console.log('position:', position);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  // }
}

function createPromise(position, delay) {
  console.log('delayCR:', delay);
  console.log('position:', position);
  return new Promise((resolve, reject) => {
    // const shouldResolve = Math.random() > 0.3;
    // setTimeout(() => {
    //   if (shouldResolve) {
    //     resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    //     // Fulfill
    //   } else {
    //     reject(`❌ Rejected promise ${position} in ${delay}ms`);
    //     // Reject
    //   }
    // }, delay);

    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // console.log('shouldResolveTrue:', shouldResolve);
      // Fulfill
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      // console.log('shouldResolveFalse:', shouldResolve);
      // Reject
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
