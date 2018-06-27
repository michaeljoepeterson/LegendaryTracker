/*
const chai = require('chai');
const mongoose = require('mongoose');

const expect = chai.expect;
const {LegendaryData} = require('../models/legendaryData');
const {TEST_DATABASE_URL} = require('../config');
const {User} = require('../models/userData');
const {app, runServer, saveData,closeServer} = require("../localDB/setUp");
const {dataLegendary} = require('../localDB/Ldata');

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

function findObject(arr,obj){
	for (let i = 0; i < arr.length; i++){
		if (arr[i].name === obj.name && arr[i].classification === obj.classification && arr[i].expansion=== obj.expansion){
			return true;
		}
	}
	return false
}

function randomChoices(){
	let arr = [];
	let num;
	for(let i = 0; i < 3; i++){

	 num = Math.floor(Math.random() * (dataLegendary.length + 1));
	 arr[i] = dataLegendary[num];
	}
	return arr;
}

describe("Add all test data and check that it was added correctly", function(){
	this.timeout(15000);
	before(function() {
	    return runServer(TEST_DATABASE_URL);
	 });

  	after(function() {
  		tearDownDb();
   		return closeServer();
  	});

	it("should create a new database and add data from LData.js correctly",function(done){
		//runServer(TEST_DATABASE_URL);
		this.timeout(15000);
   		setTimeout(done, 15000);
		
		LegendaryData.find().then(function(results){
			let testIndexes = randomChoices();
			
			let found1 = findObject(results, testIndexes[0]);
			let found2 = findObject(results, testIndexes[1]);
			let found3 = findObject(results, testIndexes[2]);

			expect(found1).to.equal(true);
			expect(found2).to.equal(true);
			expect(found3).to.equal(true);
			done();
		});
	});

	it('should create a new user with user name test',function(done){

		User.find().then(function(result){
			
			expect(result[0].username).to.equal("test");
			done();
		});
	});
});
*/