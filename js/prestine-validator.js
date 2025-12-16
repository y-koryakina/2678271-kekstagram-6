import {MAX_TAG_COUNT} from './constants.js';
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field-wrapper--invalid',
  successClass: 'field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);


function parseHashtags(value) {
  return value
    .trim()
    .split(/\s+/)
    .map((tag) => tag.toLowerCase());
}


function validateHashtagCount(value) {
  if (!value) {
    return true;
  }

  return parseHashtags(value).length <= MAX_TAG_COUNT;
}


function validateHashtagFormat(value) {
  if (!value) {
    return true;
  }

  const pattern = /^#[a-zа-яё0-9]{1,19}$/i;
  return parseHashtags(value).every((tag) => pattern.test(tag));
}


function validateHashtagUnique(value) {
  if (!value) {
    return true;
  }

  const tags = parseHashtags(value);
  return new Set(tags).size === tags.length;
}

pristine.addValidator(
  hashtagInput,
  validateHashtagCount,
  'Нельзя указать больше 5 хэш-тегов'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagFormat,
  'Введён невалидный хэш-тег'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagUnique,
  'Хэш-теги не должны повторяться'
);

function validateComment(value) {
  return value.length <= 140;
}

pristine.addValidator(commentInput, validateComment, 'Комментарий не должен быть длиннее 140 символов');
