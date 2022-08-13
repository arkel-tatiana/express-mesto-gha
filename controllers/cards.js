const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports.deleteCard = (req, res) => {
  req.params.cardId.length < 24 ? res.status(400).send({ message: 'Переданы некорректные данные в методы поиска карточки.' }) : ''
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      card ? res.status(200).send({ data: card }) : res.status(404).send({ message: 'Карточка не найдена.' })
    })
  //  .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports.createCard = (req, res) => {
  const { name, link} = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
         res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки.'})
      } else {
        res.status(500).send('Что-то пошло не так');
      }
    });
};

module.exports.likeCard = (req, res) => {
  req.params.cardId.length < 24 ? res.status(400).send({ message: 'Переданы некорректные данные в методы поиска карточки.' }) : ''
  Card.findByIdAndUpdate( req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },)
  .then((card) => {
    card ? res.status(200).send({ data: card }) : res.status(404).send({ message: 'Карточка не найдена.' })
  })
//  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

module.exports.dislikeCard = (req, res) => {
  req.params.cardId.length < 24 ? res.status(400).send({ message: 'Переданы некорректные данные в методы поиска карточки.' }) : ''
  Card.findByIdAndUpdate( req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },)
  .then((card) => {
    card ? res.status(200).send({ data: card }) : res.status(404).send({ message: 'Карточка не найдена.' })
  })
//  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

