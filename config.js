'use strict';

//possibly remove mlab data once ready to deploy
//so next step get it working with heroku once figure out the user schema
//exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://user:password31@ds261460.mlab.com:61460/legendarydata' || 'mongodb://localhost/legendarydata';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/legendarydata';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-legendary-app';
exports.PORT = process.env.PORT || 8080;