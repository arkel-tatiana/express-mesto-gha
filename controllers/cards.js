const Card = require('../models/card');
const { validationError, notFoundId, defaultError } = require('../error/errorStatus');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(defaultError.statusCode).send({ message: defaultError.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationError.statusCode).send({ message: validationError.message });
      } else {
        res.status(defaultError.statusCode).send(defaultError.message);
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
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
