/**
 * Module dependencies
 */
var express = require('express');
var logger = require('./lib/logger');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
/**
 * Locals
 */
var app = module.exports = express();
var port = process.env.PORT || 3001;
/**
 * Middleware
 */
app.use(bodyParser.json('application/json'));
app.use(bodyParser.urlencoded());
app.use(cors());
/**
 * Routes
 */
var sitd = require('./lib/sitd');
app.use(sitd);
/**
 * Start server if we're not someone else's dependency
 */
if (!module.parent) {
    mongoose.connect('mongodb://localhost/sitd', function() {
        app.listen(port, function() {
            logger.info('Anotamela API Básico escuchando en http://localhost:%s/', port);
        });
    });
}