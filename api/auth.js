const { authKey } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send('Dados incompletos!')
    }

    const user =  await app.db('users')
      .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
      .first();

    if (user) {
      bcrypt.compare(req.body.password, user.password, (error, equal) => {
        if (error || !equal) {
          return res.status(401).send('Não autorizado');
        }

        const payload = {id: user.id};

        res.json({
          name: user.name,
          email: user.email,
          token: jwt.encode(payload, authKey),
        });
      });
    } else {
      res.status(400).send('Não foi possível fazer o login');
    }
  }
  
  return {signin};
}