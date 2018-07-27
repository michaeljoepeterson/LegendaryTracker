'use strict';

const chai = require('chai');

const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userData');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;
chai.use(chaiHttp);

describe("/api/users test", function(){
	const username = "testUserName";
	const password = "testPassword";

	before(function(){
		
		return runServer(TEST_DATABASE_URL);
	});
	after(function(){
		
		return closeServer();
	});

	afterEach(function () {
    	return User.remove({});
  	});

	describe("POST Tests", function(done){
		it('Should reject users missing username',function(){
			return chai.request(app).post('/api/users')
			.send({
				password
			})
			.then((resTest) => {
				expect(resTest).to.have.status(422);
				expect(resTest.body.reason).to.equal('ValidationError');
				expect(resTest.body.message).to.equal('Missing Field');
				expect(resTest.body.location).to.equal('username');
				
			
			})
			.catch(err => {
				console.log(err);
				if(err instanceof chai.AssertionError){
					throw err;
				}
			});
		});
		it("should create a new user",function(){
			return chai.request(app).post('/api/users')
			.send({
				username,
				password
			}).
			then(res => {
				expect(res).to.have.status(201);
				expect(res.body).to.be.an('object');
				expect(res.body).to.have.keys("username");
				expect(res.body.username).to.equal(username);
				return User.findOne({username});
			})
			.then(user => {
				expect(user).to.not.be.null;
				return user.validatePassword(password);
			})
			.then(passwordTest => {
				expect(passwordTest).to.be.true;
			});
		});
	});
});
