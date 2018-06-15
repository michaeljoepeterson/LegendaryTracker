const express = require('express');
const mongoose = require('mongoose');
const {PORT, DATABASE_URL } = require('./config');
mongoose.Promise = global.Promise;

const app = express();
app.use(express.json());
let server;

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
