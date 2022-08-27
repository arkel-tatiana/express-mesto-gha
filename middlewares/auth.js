const jwt = require('jsonwebtoken');
const AuthError = require('../error/AuthError');

const auth = (req, res, next) => {// eslint-disable-line
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  //  return res.status(401).send({ message: 'Необходима авторизация1' });
  }
  const token = authorization.replace('Bearer ', '');

  // const token = req.cookies.jwt; все сделала но тесты не проходит
  let payload;
  try {
    //    console.log(5555);
    payload = jwt.verify(token, 'some-secret-key');
    //    console.log(6666);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;
  // console.log(req.user);
  next();
//  return req.user;
};
module.exports = { auth };
