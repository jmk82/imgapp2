var path = require('path');
var multer = require('multer');
var db = require('../model');

var storage = multer.memoryStorage();

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

function fileFilter(req, file, cb) {
    if (file.mimetype.split('/')[0] == 'image') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = upload;