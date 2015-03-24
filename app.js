var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var lessMiddleware = require('less-middleware');

var app = express();
var routes = require('./routes/index');
var publicLocation = path.join(__dirname, 'public');

// view handlebars setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

if (app.get('env') === 'development') {
  var hbsPrecompiler = require('handlebars-precompiler');
  hbsPrecompiler.watchDir(__dirname + "/views/partials/", __dirname + "/public/js/templates.js", ['hbs']);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(lessMiddleware(publicLocation));
app.use(express.static(publicLocation));

// bootstrap routes
routes(app);

module.exports = app;