class Error {
  constructor({ message, name, statusCode }) {
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }
}
const validationError = new Error({
  message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля',
  name: 'validationError',
  statusCode: '400',
});

const notFoundPage = new Error({
  message: 'Страница не найдена',
  name: 'notFoundPage',
  statusCode: '404',
});

const notFoundId = new Error({
  message: 'карточка или пользователь не найден',
  name: 'notFoundId',
  statusCode: '404',
});

const defaultError = new Error({
  message: 'Что-то пошло не так',
  name: 'notFoundId',
  statusCode: '500',
});

module.exports = {
  validationError, notFoundPage, notFoundId, defaultError,
};
