var bcrypt = require('bcrypt');

function hash(password, cb) {
  bcrypt.hash(password, 8, function(err, hash) {
    cb(hash);
  });
}

function check(passwordToCheck, hashFromDb, cb) {
  bcrypt.compare(passwordToCheck, hashFromDb, function(err, res) {
    cb(res);
  });
}

module.exports = {
  hash: hash,
  check: check
};