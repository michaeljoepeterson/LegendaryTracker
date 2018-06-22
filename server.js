'use strict';

const express = require('express');
const mongoose = require('mongoose');
const {PORT, DATABASE_URL } = require('./config');
mongoose.Promise = global.Promise;
const {LegendaryData} = require('./models/LegendaryData');
const app = express();
const {router: userRouter} = require('./users/router');
app.use(express.json());
app.use(express.static('public'));
app.use("/api/users", userRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/legendarydata', (req, res) => {
  LegendaryData
    .find()
    .limit(5)
    .then(data => {
      res.json({
        data: data.map(
          (singleData) => singleData.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(process.env.PORT || 8080, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

