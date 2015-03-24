var request = require('request');
var util = require('util');
var Auth = require('./auth');
var bigMath = require('./utils/bigmath');

module.exports = Base;

function Base(apiEndpoint) {
	this._baseUrl = 'https://lsapi.seomoz.com/linkscape';
	this._apiEndpoint = apiEndpoint;
	this._auth = new Auth();
}

Base.prototype.send = function (target, params, cb) {
	var opts, self = this;

	if (!target) {
		return cb(new Error('No target provided'));
	}

	opts = {
		url: util.format('%s/%s/%s', this._baseUrl, this._apiEndpoint, encodeURIComponent(target)),
		qs: params,
		json: true,
		headers: {
			Authorization: 'Basic ' + this._auth.get(),
		}
	};
	
	request.get(opts, function (error, response) {
		if (error) {
			return cb(error);
		}

		if (params.raw) {
			return cb(null, response);
		}

		return cb(null, self.convert(response));
	});
};

Base.prototype.convert = function (response) {
	var self = this, cols, obj = {}, fields = response.body;

	Object.keys(fields).forEach(function (field) {
		var name = self._inverseTable[field];
		var col = self._table[name];

		if (col && !obj[col.key]) {
			obj[name] = {
				token: col.name,
				value: fields[field]
			};
		}
	});

	return obj;
};

Base.prototype._getTotalTableValue = function () {
	var i, vals = [], keys = Object.keys(this._table);

	for (i = 0; i < keys.length; i++) {
		vals.push(this._table[keys[i]].flag);
	}

	return bigMath.add(vals);
};