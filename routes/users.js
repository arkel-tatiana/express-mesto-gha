const router = require('express').Router();
// const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const {
  getUsers, getUserCurrent, getUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserCurrent);
router.get('/:userId', auth, getUser);
router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    email: Joi.string().required(),
    // .unique().validate([validator.isEmail, 'не правильно введен email']),
    password: Joi.string().required(),
  }),
}), updateUser);
router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    // .math(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig),
  }),
}), updateUserAvatar);

module.exports = router;
