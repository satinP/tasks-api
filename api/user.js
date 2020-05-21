const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
 const getHash = (password, callback) => {
   bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, null, (error, hash) => {
         callback(hash);
      });
   }); 
 }

 const save = (req, res) => {
   getHash(req.body.password, hash => {
     const hashedPassword = hash;

     app.db('users')
       .insert({name: req.body.name,
                email: req.body.email,
                password: hashedPassword
              })
      .then(() => {
        return res.status(204).send();
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
   });
 }
  return { save }
} 