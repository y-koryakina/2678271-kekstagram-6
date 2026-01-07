import {pristine} from './prestine-validator.js';
import {sendData} from './api.js';
import { showModal } from './modal.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancelBtn = document.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');


function onDocumentKeydown(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
    return;
  }

  if (!document.querySelector('.error.hidden')) {
    return;
  }

  evt.preventDefault();
  closeUploadForm();
}

function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function resetForm() {
  uploadForm.reset();
  pristine.reset();
  uploadInput.value = '';
}

export function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetForm();

  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadInput.addEventListener('change', openUploadForm);
uploadCancelBtn.addEventListener('click', closeUploadForm);

const showFormError = function () {
  showModal('.error', '.error__button');
};

const showFormSuccess = function(){
  closeUploadForm();
  showModal('.success', '.success__button');
};

export const setUserFormSubmit = (onSuccess, onFail) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(evt.target);
      sendData(formData).then(onSuccess).catch(onFail);
    }
  });
};

setUserFormSubmit(showFormSuccess, showFormError);
