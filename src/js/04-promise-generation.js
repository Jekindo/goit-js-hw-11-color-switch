import Notiflix from 'notiflix';

const formRef = document.querySelector('.js-form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const callAmount = evt.currentTarget.elements.amount.value;

  for (let i = 0; i < callAmount; i += 1) {
    const position = i + 1;
    const firstDelay = Number(evt.currentTarget.elements.delay.value);
    const delayStep = Number(evt.currentTarget.elements.step.value);
    const delay = firstDelay + i * delayStep;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}
