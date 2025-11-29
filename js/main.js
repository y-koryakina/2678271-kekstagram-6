import {createPhotoData, OBJECTS_COUNT} from './data.js';

const photoArray = Array.from({ length: OBJECTS_COUNT }, createPhotoData);

console.log(photoArray);

