var Base = require('./base');
var Model = require('../models/urlmetrics');
var util = require('util');

module.exports = UrlMetrics;

function UrlMetrics(app) {
  UrlMetrics.super_.call(this, app, Model);
}

util.inherits(UrlMetrics, Base);

UrlMetrics.prototype.handle = function () {
  this.app.get('/api/urlmetrics', this.get.bind(this));
};

UrlMetrics.prototype.get = function (req, res) {
  this.model.get({ target: req.query.target, cols: req.query.cols, raw: req.query.raw }, function (err, results) {
    if (err) {
      res.json(err);
      return;
    }
    res.json(results);
  });
};