var express = require('express');
var router = express.Router();

var db = require('../model');
var crypt = require('../utils/crypt');

router.post('/', function (req, res) {
  var newUser = req.body;
  db.User.findOne({ where: { username: newUser.username}}).then(function (user) {
    if (user == null) {
      crypt.hash(newUser.password, function(hash) {
        newUser.password = hash;
        db.User.create(newUser).then(function (user) {
          delete user.dataValues.password;
          req.session.userId = user.id;
          res.json(user);
        });
      });      
    } else {
      res.status(409).json({ error: 'Username already in use' });
    }
  });
});

router.post('/login', function (req, res) {
  var usernameToCheck = req.body.username,
      passwordToCheck = req.body.password;

  db.User.findOne({ where: { username: usernameToCheck }}).then(function (user) {
    if (user) {
      crypt.check(passwordToCheck, user.password, function (result) {
        if (result) {
          req.session.userId = user.id;
          delete user.dataValues.password;
          res.json(user);
        } else {
          res.status(403).json({ error: 'Wrong username or password' });
        }
      });
    } else {
      res.status(403).json({ error: 'Wrong username or password' });
    }
  });
});

router.get('/logged-in', function (req, res) {
  var loggedInId = req.session.userId ? req.session.userId : null;

    if (loggedInId === null) {
        res.json({});
    } else {
        db.User.findOne({
            where: {id: loggedInId}
        }).then(function (user) {
          delete user.dataValues.password;
          res.json(user);
        });
    }
});

router.get('/logout', function (req, res) {
    req.session.userId = null;

    res.send(200);
});

router.get('/:id', function (req, res) {
  db.User.findOne({
    where: { id: req.params.id},
    include: {
       order: '"createdAt" DESC',
       limit: 6,
       model: db.Image }}).then(function (user) {
        delete user.dataValues.password;
      res.json(user);
  });
});

module.exports = router;