import { closeUploadForm } from './form.js';

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];

  if (!file) {
    return;
  }

  if (!file.type || !file.type.startsWith('image/')) {
    // eslint-disable-next-line no-alert
    alert('Пожалуйста, выберите фотографию');
    fileChooser.value = '';
    closeUploadForm();
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  preview.src = imageUrl;
  effectPreviews.forEach((prev) => {
    prev.style.backgroundImage = `url(${imageUrl})`;
  });

});
