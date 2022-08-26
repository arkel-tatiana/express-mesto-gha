const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AuthError = require('../error/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Введите поле <Имя> длинной более 2 символов'],
    maxlength: [30, 'Введенное поле <Имя> превышает максимально допустимую длинну поля 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Введите поле <О себе> длинной более 2 символов'],
    maxlength: [30, 'Введенное поле <О себе> превышает максимально допустимую длинну поля 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: /(^(https|http):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig,
  },
  email: {
    type: String,
    required: [true, 'электронная почта - это обязательное для заполнения поле'],
    unique: [true, 'пользователь с таким email уже зарегистрирован'],
    validate: [validator.isEmail, 'не правильно введен email'],
  },
  password: {
    type: String,
    required: [true, 'пароль - это обязательное для заполнения поле'],
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
