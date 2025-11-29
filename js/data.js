import {getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра...',
  'Моя бабушка случайно чихнула с фотоаппаратом...',
  'Я поскользнулся на банановой кожуре…',
  'Лица у людей на фотке перекошены…',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const OBJECTS_COUNT = 25;

const generateAdressId = createRandomIdFromRangeGenerator(1, 25);
const generateId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 1000);


const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createPhotoData = () => {
  const commentsCount = getRandomInteger(0, 30);

  const comments = Array.from(
    { length: commentsCount },
    createComment
  );

  return {
    id: generateId(),
    url: `photos/${generateAdressId()}.jpg`,
    description: 'Какое-то описание',
    likes: getRandomInteger(15, 200),
    comments,
  };
};

export {createPhotoData, OBJECTS_COUNT};

