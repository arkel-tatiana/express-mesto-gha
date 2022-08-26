const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {// eslint-disable-line
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация1' });
  }
  const token = authorization.replace('Bearer ', '');
  //  console.log(token);// eslint-disable-line
  let payload;
  try {
    //    console.log(5555);
    payload = jwt.verify(token, 'some-secret-key');
    //    console.log(6666);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация2' });
  }
  req.user = payload;
  // console.log(req.user);
  next();
//  return req.user;
};
module.exports = { auth };
