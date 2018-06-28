const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/userData');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;
chai.use(chaiHttp);

describe("Auth Tests", function(){
	const username = "testUser";
	const password = "testPassword";

	before(function () {
    	return runServer(TEST_DATABASE_URL);
 	 });

  after(function () {
    	return closeServer();
  	});

  beforeEach(function () {
	    return User.hashPassword(password).then(password =>
	      User.create({
	        username,
	        password
	      })
	    );
	  });

  afterEach(function () {
    return User.remove({});
  });

});
