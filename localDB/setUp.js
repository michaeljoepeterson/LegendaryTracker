'use strict';
//to run this call npm run localDb
const mongoose = require('mongoose');
const express = require('express');
const {PORT, DATABASE_URL } = require('../config');
const {LegendaryData} = require('../models/LegendaryData');
const {dataLegendary} = require('./Ldata');

mongoose.Promise = global.Promise;

const app = express();
app.use(express.json());
let server;
//verify data is there
function findData(){
	LegendaryData.find({name: 'Deadpool'}).then(function(result){
		console.log(result);
	});
}

function saveData(){
	LegendaryData.remove({}, function(){

	});
	console.log(dataLegendary.length);
	for (let i = 0; i < dataLegendary.length; i++){
		let data = new LegendaryData(dataLegendary[i]);
		
		if (i !== dataLegendary.length - 1){
			data.save();
		}
		else{
			data.save().then(findData);
		}
		//console.log(i);
	}
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
        //findData();
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

console.log("test");

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));

}
