var Base = require('./base');
var Model = require('../models/page');
var util = require('util');

module.exports = Page;

function Page(app) {
	Page.super_.call(this, app, Model);
}

util.inherits(Page, Base);

Page.prototype.handle = function () {
	this.app.get('/', this.index.bind(this));
};

Page.prototype.index = function (req, res) {
	res.render('page/index', this.model.get());
};