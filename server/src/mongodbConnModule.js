const mongoose = require('mongoose');
const config = require('config');

module.exports.connect = function () {
  mongoose.connect(config.DBHost);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB Connection Error'));
  db.once('open', function (callback) {
    console.log('MongoDB Connection Successful');
  });
  return db;
};
