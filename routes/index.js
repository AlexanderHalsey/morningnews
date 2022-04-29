var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
var UserModel = require('../models/users');

/* GET home page. */
router.post('/signin', async function(req, res, next) {

  var user = await UserModel.findOne({ email: req.body.email.toLowerCase() });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ result: true, user: user.username, token: user.token });
    } else {
      res.json({ result: false, errors: { email: false } });
    }
  } else {
    res.json({ result: false, errors: { email: true } });
  }
});

router.post('/signup', async function(req, res, next) {
  var existingUser = await UserModel.findOne({ 
    email: req.body.email.toLowerCase(), 
  })
  if (existingUser) res.json({ result: false });
  else {
    const hash = bcrypt.hashSync(req.body.password, 10);
    var user = UserModel({
      email: req.body.email.toLowerCase(),
      username: req.body.username,
      password: hash,
      token: uid2(32),
    });
    var userSaved = await user.save();
    res.json({ result: true, user: user.username, token: user.token });
  }
})

module.exports = router;
