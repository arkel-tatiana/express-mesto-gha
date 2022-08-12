const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      user ? res.status(200).send({ data: user }) : res.status(404).send({ message: 'Пользователь не найден.' })
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const createUser = (req, res) => {
  const { name, about, avatar} = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
         res.status(400).send({ message: 'Переданы некорректные данные в методы создания пользователя.'})
      } else {
        res.status(500).send('Что-то пошло не так');
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      user ? res.status(200).send({ data: user }) : res.status(404).send({ message: 'Пользователь не найден.' })
    })
//    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
         res.status(400).send({ message: 'Переданы некорректные данные в методы обновления профиля пользователя.'})
      } else {
        res.status(500).send('Что-то пошло не так');
      }
    });
}

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      user ? res.status(200).send({ data: user }) : res.status(404).send({ message: 'Пользователь не найден.' })
    })
//    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
         res.status(400).send({ message: 'Переданы некорректные данные в методы обновления аватара пользователя.'})
      } else {
        res.status(500).send('Что-то пошло не так');
      }
    });
}
module.exports = { getUsers, getUser, createUser, updateUser, updateUserAvatar }
