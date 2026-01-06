import {renderPictures} from './pictures.js';
import './form.js';
import {getData} from './api.js';
import {setDefault, setRandom, setDiscussed} from './filters.js';
import { debounce } from './util.js';
import { DEBOUNCE_DELAY } from './constants.js';
import './preview.js';

const debouncedRenderPictures = debounce(renderPictures, DEBOUNCE_DELAY);

getData()
  .then((pictures) => {
    renderPictures(pictures);

    setDefault(pictures, debouncedRenderPictures);
    setRandom(pictures, debouncedRenderPictures);
    setDiscussed(pictures, debouncedRenderPictures);

    const filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');
  })
  .catch((error) => {
    const errorBlock = document.querySelector('.form__send_error');
    errorBlock.classList.remove('hidden');
    errorBlock.textContent = error.message;

    setTimeout(() => {
      errorBlock.classList.add('hidden');
      errorBlock.textContent = '';
    }, 3000);
  });
