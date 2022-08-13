const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');
//mongoose.connect('mongodb://localhost:27017/mestodb', {
//  useNewUrlParser: true,
//  useCreateIndex: true,
//    useFindAndModify: false
//});
app.use((req, res, next) => {
  req.user = {
    _id: '62f5f7138f5a987295dd88ac'
  };

  next();
})
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', function (req, res) {
  res.status(404).send({ message: 'Страница не найдена'});;
})

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});
