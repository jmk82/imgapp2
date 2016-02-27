var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');

var db = require('../model');
var upload = require('../utils/upload');
var auth = require('../utils/auth');
var s3 = new aws.S3();

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

// var BUCKET_URL = 'https://s3.amazonaws.com/imgappbucket/';

aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });

router.get('/', function (req, res) {
  var limit = req.query.limit || 6;
  var start = req.query.start - 1 || 0;
  db.Image.findAll({ order: '"createdAt" DESC', offset: start, limit: limit }).then(function (images) {
    res.json(images);
  });
});

router.get('/:id', function (req, res) {
  db.Image.findOne({ 
    where: { id: req.params.id },
    include: [
      { model: db.User }, {
      order: '"createdAt" ASC',
      model: db.Comment,
      include: {
        model: db.User
      }
    }]
  }).then(function (image) {
    image.User.password = null;
    if (image.Comments.length !== 0) {
      image.Comments.forEach(function(comment) {
        if (comment.User && comment.User.password) {
          comment.User.password = null;
        }
      });
    }
    res.json(image);
  });
});

router.post('/', auth, upload.single('image'), function (req, res) {
  var filetype = req.file.originalname.split('.')[1].slice(0, 4);
  console.log(req.session.userId);
  insertImageToDb(filetype, req.session.userId, function (image_id) {
    var filename = image_id + '.' + filetype;
    sendToS3(filename, req, res);
  });
  
});

function insertImageToDb(filetype, userid, cb) {
  var newImage = {
      UserId: userid,
  };
  db.Image.create(newImage)
    .then(function (image) {
      db.Image.update({ filename: image.id + '.' + filetype}, 
              { where: { id: image.id }});
      cb(image.id);
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
}

function sendToS3(newFilename, req, res) {
  var s3_params = {
      Bucket: S3_BUCKET,
      Key: newFilename,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };

    s3.upload(s3_params, function (err, data) {
      console.log(err, data);
      res.redirect('../#/users/' + req.session.userId);
    });
}

function deleteFromS3(filename) {
  var params = {
    Bucket: S3_BUCKET,
    Key: filename,
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log(err);
    }
  });
}

router.post('/:id/comment', function (req, res) {
  var newComment = req.body;
  newComment.UserId = req.session.userId;
  newComment.ImageId = req.params.id;

  db.Comment.create(newComment).then(function (comment) {
    res.json(comment);
  });
});

router.delete('/:id', auth, function (req, res) {
  db.Image.findOne({ where: { id: req.params.id }})
    .then(function (image) {
      if (req.session.userId === image.UserId) {
        db.Image.destroy({ where: { id: req.params.id }}).then(function (num) {
          if (num === 1) {
            deleteFromS3(image.filename);
            res.send(200).json({ message: "Image deleted"});
          } else {
            res.send(404);
          }
        })
      } else {
        res.send(403);
      }
    })
    .catch(function (error) {
      res.send(400).json({ error: error });
    });
});

module.exports = router;