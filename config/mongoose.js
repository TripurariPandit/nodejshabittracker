const mongoose = require('mongoose');
const env = require('./environment');

const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME;

const dbURL = 'mongodb+srv://tripurari:Tripurari@cluster0.8j7vazq.mongodb.net/mernstack?retryWrites=true&w=majority';

// const dbURL = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.8j7vazq.mongodb.net/${dbName}?retryWrites=true&w=majority`;


// const dbURL = dbUsername && dbPassword && dbName
//   ? `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.8j7vazq.mongodb.net/${dbName}?retryWrites=true&w=majority`
//   : 'mongodb://127.0.0.1/habitTracker';

mongoose.connect(dbURL)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// mongoose.connect(MongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(()=>{
//   console.log('Successfully connected to the database');
// }).catch((err)=> console.log('Failed to connect to the database', err));