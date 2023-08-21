import throttle from "lodash.throttle";

const form = document.querySelector('form')
const email = document.querySelector('input')
const message = document.querySelector('textarea');
const expressionKey = 'feedback-form-state';

function saveDataToLocalStorage() {
  const formData = {
    email: email.value,
    message: message.value
  }
  localStorage.setItem(expressionKey, JSON.stringify(formData))
}

function refillDataFromLocalStorage() {
  const localData = localStorage.getItem(expressionKey);

  if (localData) {
    const formData = JSON.parse(localData)
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}

refillDataFromLocalStorage();


email.addEventListener('input', throttle(saveDataToLocalStorage, 500));
message.addEventListener('input', throttle(saveDataToLocalStorage, 500));


form.addEventListener('submit', cleaner)


function cleaner(event) {
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!')

  } else {
    const formData = {
      email: email.value,
      message: message.value
    }
    console.log(formData);

    event.preventDefault();

    localStorage.removeItem(expressionKey)

    email.value = '';
    message.value = '';
  }

}