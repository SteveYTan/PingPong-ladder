var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var path = require('path');

var mongoose = require('mongoose');

var server = app.listen(8000);

require('./server/config/mongoose.js');

app.use(bodyParser.urlencoded());

var routes = require('./server/config/routes.js')(app);

app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + "/static"));

