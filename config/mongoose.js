const mongoose = require('mongoose');
const env = require('./environment');
// const dbURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1/habitTracker';

const dbURL = 'mongodb+srv://tripurari:Tripurari@cluster0.8j7vazq.mongodb.net/mernstack?retryWrites=true&w=majority';


mongoose.connect(dbURL)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });