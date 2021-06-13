/* eslint-disable global-require */
const mongoose = require('mongoose');

const { DATABASE_URL } = process.env;

module.exports = (function () {
  // Mongoose events.
  mongoose.connection.on('connected', () => {
    console.log('Connected to database');
  });
  mongoose.connection.on('open', () => {
    console.log('Connection opened');
  });
  mongoose.connection.on('error', (error) => {
    console.log('Connection error! Throwing error to restart application:', error);
    // Throw error on mongoose error, so we restart the application.
    throw new Error('MongoDB Error');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected! Throwing error to restart application');
    // Throw error on mongoose disconnect, so we restart the application.
    Promise.resolve().then(() => { throw new Error('MongoDB disconnected'); });
  });
  mongoose.connection.on('reconnected', () => {
    console.log('Reconnected');
  });
  mongoose.connection.on('close', () => {
    console.log('Closed');
  });

  const mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true };

  // Connect to db.
  return mongoose.connect(DATABASE_URL, mongooseConfig).then(() => {
    // Require models after connection.
    require('./schema');
    return mongoose;
  }).catch((error) => {
    // To avoid promise not handled exception.
    console.log('Unable to connect MongoDB. If problem persists, please restart the server: ', error);
  });
}());
