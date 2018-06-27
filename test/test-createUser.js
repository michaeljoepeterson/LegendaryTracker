'use strict';

const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userData');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;
chai.use(chaiHttp);


function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe("/api/users test", function(){
	const username = "testUserName";
	const password = "testPassword";

	before(function(){
		
		return runServer(TEST_DATABASE_URL);
	});
	after(function(){
		tearDownDb();
		return closeServer();
	});

	afterEach(function () {
    	return User.remove({});
  });

	describe("POST Tests", function(done){
		it('Should reject users missing username',function(){
			return chai.request(app).post('/api/users')
			.send({
				"password": password
			})
			.then((resTest) => {
				//console.log(resTest);
				console.log(resTest.text);
				expect.fail(null,null, 'Request should fail');
				//console.log(resTest.text.code);

				//expect(resTest.text.code).to.equal(422);
			
			})
			.catch(err => {
				console.log(err);
				/*
				if(err instanceof chai.AssertionError){
					throw err;
				}
				
				const res = err.response;
				console.log(res);
				expect(res).to.have.status(422);
				expect(res.body.reason).to.equal('ValidationError');
				expect(res.body.message).to.equal('Missing field');
				expect(res.body.location).to.equal('username');
				*/
			});
		});
	});
});
