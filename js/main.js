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
  .catch(() => {
    const template = document.querySelector('#data-error-template');
    const errorElement = template.content.cloneNode(true).querySelector('.data-error');

    function removeError() {
      errorElement.remove();
    }

    document.body.appendChild(errorElement);

    setTimeout(removeError, 3000);
  });
