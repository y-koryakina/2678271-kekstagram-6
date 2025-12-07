import {createPictures} from './data.js';

export function renderPictures() {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesBlock = document.querySelector('.pictures');
  const similarListFragment = document.createDocumentFragment();

  const similarPictures = createPictures();

  similarPictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;


    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    similarListFragment.appendChild(pictureElement);
  });

  picturesBlock.appendChild(similarListFragment);
}

