'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const {PORT, DATABASE_URL } = require('./config');
mongoose.Promise = global.Promise;
const {LegendaryData} = require('./models/legendaryData');
const app = express();
const {router: userRouter} = require('./users/router');
const {localStrategy, jwtStrategy} = require('./auth/strategies');
const {router: authRouter} = require('./auth/router');
app.use(express.json());
app.use(express.static('public'));
//If I leave this commented then people cannot access the protected endpoint with the url
//but then issue is everything is then one page
//is there some sort of different auth strategy to do what I am thinking of?
//https://www.jokecamp.com/tutorial-passportjs-authentication-in-nodejs/
//https://stackoverflow.com/questions/12276046/nodejs-express-how-to-secure-a-url

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api/users", userRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });
app.use('/protected', jwtAuth);
app.use("/protected",express.static('protected'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/protected', jwtAuth, (req, res) => {
  //req.isAuthenticated() === true
  res.sendFile(__dirname + '/protected/menu.html');
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
      server = app.listen(port, () => {
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

module.exports = { app, runServer, closeServer };
