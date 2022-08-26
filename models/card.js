const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'название карточки - это обязательное для заполнения поле'],
    minlength: [2, 'Введите поле <Имя карточки> длинной более 2 символов'],
    maxlength: [30, 'Введенное поле <Имя карточки> превышает максимально допустимую длинну поля 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'ссылка на карточку - это обязательное для заполнения поле'],
    match: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
