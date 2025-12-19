import {renderPictures} from './pictures.js';
import './form.js';
import {getData, sendData} from './api.js';

const showFormError = function (error){
  const errorBlock = document.querySelector('.form__send_error');
  errorBlock.classList.remove('hidden');
  errorBlock.textContent = error.message;
};

getData()
  .then((wizards) => {
    renderPictures(wizards);
  }).catch((error) => showFormError(error));
