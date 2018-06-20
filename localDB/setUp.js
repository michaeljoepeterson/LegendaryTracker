'use strict';
//to run this call npm run localDb
const mongoose = require('mongoose');
const express = require('express');
const {PORT, DATABASE_URL } = require('../config');
const {LegendaryData} = require('../models/LegendaryData');
const {User} = require('../models/userData');
const {dataLegendary} = require('./Ldata');

mongoose.Promise = global.Promise;

const app = express();
app.use(express.json());
let server;

function saveData(){
	LegendaryData.remove({}, function(){

	});
  
  User.remove({},function(){

  });
  User.hashPassword("test1").then(hash =>{
    User.create({
      username: "test",
      password: hash
    });
  });

	for (let i = 0; i < dataLegendary.length; i++){
		let data = new LegendaryData(dataLegendary[i]);
		
		if (i !== dataLegendary.length - 1){
			data.save();
		}
		else{
			data.save();
		}
		//console.log(i);
	}
  console.log("done");
}

function runServer(databaseUrl, port=PORT){
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        saveData();
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

console.log("test");

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));

}

module.exports = {app, runServer, saveData, closeServer};
