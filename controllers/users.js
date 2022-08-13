const User = require('../models/user');
const { validationError, notFoundId, defaultError } = require('../error/errorStatus');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(defaultError.statusCode).send({ message: defaultError.message }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(notFoundId.statusCode).send({ message: notFoundId.message });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validationError.statusCode).send({ message: validationError.message });
      } else {
        res.status(defaultError.statusCode).send({ message: defaultError.message });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationError.statusCode).send({ message: validationError.message });
      } else {
        res.status(defaultError.statusCode).send({ message: defaultError.message });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(notFoundId.statusCode).send({ message: notFoundId.message });
      }
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationError.statusCode).send({ message: validationError.message });
      } else {
        res.status(defaultError.statusCode).send({ message: defaultError.message });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(notFoundId.statusCode).send({ message: notFoundId.message });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationError.statusCode).send({ message: validationError.message });
      } else {
        res.status(defaultError.statusCode).send({ message: defaultError.message });
      }
    });
};
module.exports = {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
};
