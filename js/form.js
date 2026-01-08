import {pristine} from './prestine-validator.js';
import {sendData} from './api.js';
import { showModal } from './modal.js';
import { SCALE_STEP, SCALE_MIN, SCALE_MAX } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancelBtn = document.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const smallControl = document.querySelector('.scale__control--smaller');
const bigControl = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

function getScale() {
  return parseInt(scaleValue.value, 10);
}

function setScale(value) {
  scaleValue.value = `${value}%`;
}

smallControl.addEventListener('click', () => {
  let current = getScale();
  current = Math.max(SCALE_MIN, current - SCALE_STEP);
  setScale(current);
});

bigControl.addEventListener('click', () => {
  let current = getScale();
  current = Math.min(SCALE_MAX, current + SCALE_STEP);
  setScale(current);
});


function onDocumentKeydown(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
    return;
  }

  if (document.querySelector('.error')) {
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
  showModal('error');
};

const showFormSuccess = function(){
  closeUploadForm();
  showModal('success');
};

const submitButton = uploadForm.querySelector('.img-upload__submit');

export const setUserFormSubmit = (onSuccess, onFail) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    submitButton.disabled = true;

    if (isValid) {
      const formData = new FormData(evt.target);
      sendData(formData).then(onSuccess).catch(onFail).finally(() => {
        submitButton.disabled = false;
      });
    }
  });
};

setUserFormSubmit(showFormSuccess, showFormError);
