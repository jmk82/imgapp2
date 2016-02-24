var auth = function (req, res, next) {
  if (!req.session.userId || req.session.userId === null) {
    res.send(403);
  } else {
    next();
  }
}

module.exports = auth;