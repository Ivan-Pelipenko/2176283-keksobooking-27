import {disableFilters} from './page.js';
import {showAlertError} from './util.js';

const GET_DATA_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://27.javascript.pages.academy/keksobooking';

/**
 * Загрузка похожих объявлений с сервера
 * @param {function} onSuccess - функция при успехе загрузки данных
 */
const getData = (onSuccess) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json()
      .then((ads) => {
        onSuccess(ads);
      }))
    .catch(() => {
      disableFilters();
      showAlertError('Ошибка загрузки. Объявления по соседству не загрузились');
    });
};

/**
 * Отправка объявления на сервер
 * @param {function} onSuccess - функция успешной отправки
 * @param {function} onFail - функция ошибки
 */
const sendData = (onSuccess, onFail, body) => {
  fetch (SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
