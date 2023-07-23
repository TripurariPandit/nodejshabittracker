const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/habitTracker')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });