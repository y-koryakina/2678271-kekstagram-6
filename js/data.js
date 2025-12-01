import {getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';
import { COMMENT_MESSAGES, NAMES, OBJECTS_COUNT } from './constants.js';
import {
  MAX_PHOTO_ID,
  MAX_AVATAR_ID,
  MAX_COMMENTS_СOUNT,
  MIN_LIKES,
  MAX_LIKES
} from './data/constants.js';

let lastCommentId = 0;

function generateCommentId() {
  lastCommentId++;
  return lastCommentId;
}

const generateId = createRandomIdFromRangeGenerator(1, MAX_PHOTO_ID);


function generateMessage() {
  const sentencesCount = getRandomInteger(1, 2);

  const sentences = Array.from({ length: sentencesCount }, () => {
    const randomIndex = getRandomInteger(0, COMMENT_MESSAGES.length - 1);
    return COMMENT_MESSAGES[randomIndex];
  });

  return sentences.join(' ');
}

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_ID)}.svg`,
  message: generateMessage(),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createPhotoData = () => {
  const commentsCount = getRandomInteger(0, MAX_COMMENTS_СOUNT);

  const comments = Array.from (
    { length: commentsCount },
    createComment
  );

  const photoId = generateId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: 'Какое-то описание',
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments,
  };
};

export {createPhotoData, OBJECTS_COUNT};

