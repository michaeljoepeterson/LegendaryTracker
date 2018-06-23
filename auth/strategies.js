'use strict';
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const {User} = require("../models/userData");

const LocalStrategy = new LocalStrategy((username,password,callback) => {

});

module.exports = { localStrategy, jwtStrategy };