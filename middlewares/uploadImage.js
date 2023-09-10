// Konfigurasi multer
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, Date.now() + '-' + fileName);
    }
  });
  const upload = multer({ storage: storage });
  module.exports = upload;