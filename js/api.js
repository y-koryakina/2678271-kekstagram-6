import {GET_DATA_ERROR_MSG} from './constants.js';
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });


const getData = () => load(Route.GET_DATA).catch(() => {
  throw new Error(GET_DATA_ERROR_MSG);
});

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
