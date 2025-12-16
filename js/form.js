import {pristine} from './prestine-validator.js'
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

  evt.preventDefault();
  closeUploadForm();
}

function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadForm.reset();
  pristine.reset();
  uploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}


uploadInput.addEventListener('change', openUploadForm);
uploadCancelBtn.addEventListener('click', closeUploadForm);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }
});
