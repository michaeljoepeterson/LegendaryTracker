'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const {PORT, DATABASE_URL } = require('./config');
mongoose.Promise = global.Promise;
const {LegendaryData} = require('./models/legendaryData');
const app = express();
const {router: userRouter} = require('./users/router');
const {router: getCharImageRouter} = require('./getCharImage/router');
const {localStrategy, jwtStrategy} = require('./auth/strategies');
const {router: authRouter} = require('./auth/router');
const {router: scoresRouter} = require('./scores/router');
//app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", 'ejs');
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api/users", userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/characterimg', getCharImageRouter);
app.use('/api/scores', scoresRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });
//app.use('/protected', jwtAuth);
//app.use("/protected",express.static('protected'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/protected', jwtAuth, (req, res) => {
  res.json({
    login: "success"
  });
  
});

app.get('/protected/masterminds', jwtAuth, (req, res) => {
  LegendaryData
    .find({classification:"mastermind"})
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

app.get('/protected/heroes', jwtAuth, (req, res) => {
  LegendaryData
    .find({classification:"hero"})
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

app.get('/protected/henchmen', jwtAuth, (req, res) => {
  LegendaryData
    .find({classification:"henchman"})
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

app.get('/protected/villains', jwtAuth, (req, res) => {
  LegendaryData
    .find({classification:"villian"})
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

app.get('/protected/scheme', jwtAuth, (req, res) => {
  LegendaryData
    .find({classification:"scheme"})
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
    mongoose.connect(databaseUrl,{ useNewUrlParser: true } , err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    }, { useNewUrlParser: true });
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

module.exports = { app, runServer, closeServer };
