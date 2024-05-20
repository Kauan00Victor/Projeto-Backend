require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

mongoose.connect(process.env.MONGODB_URL);

const routerApidocs = require('./routes/router_apidocs');
const routerMusicas = require('./routes/router_musicas');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/apidocs', routerApidocs);
app.use('/musicas', routerMusicas);

module.exports = app;
