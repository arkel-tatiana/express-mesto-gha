const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { notFoundPage } = require('./error/errorStatus');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '62f5f7138f5a987295dd88ac',
  };

  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(notFoundPage.statusCode).send({ message: notFoundPage.message });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});
