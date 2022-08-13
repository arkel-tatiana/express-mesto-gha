const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'имя - это обязательное для заполнения поле'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'данные о себе - это обязательное для заполнения поле'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },

});
module.exports = mongoose.model('user', userSchema);
