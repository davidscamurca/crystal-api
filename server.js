const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// initialize the app and allows send date json
const app = express();
app.use(express.json());
 
// initialize DB and call the schemas 
//mongoose.connect('mongodb://localhost:27017/crystalapi', { useNewUrlParser: true});
mongoose.connect('mongodb://heroku_dzffswpj:o3t0rv59fu8cq6vjl37jfp4jv0@ds243441.mlab.com:43441/heroku_dzffswpj', { useNewUrlParser: true});
requireDir('./src/models');

// allows receive all request types
app.use('/crystal/api/v1', require('./src/routes'));

app.listen(3001);