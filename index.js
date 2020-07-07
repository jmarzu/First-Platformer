var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'ejs');
// app.use(ejsLayouts);

// Bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;