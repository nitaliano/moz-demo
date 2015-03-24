var util = require('util');
var Base = require('./base');
var Col = require('./utils/col');
var bigMath = require('./utils/bigmath');

module.exports = UrlMetrics;



function UrlMetrics() {
	UrlMetrics.super_.call(this, 'url-metrics');

	this._table = {
		'title': new Col('ut', 'Title', '1'),
		'canonicalUrl': new Col('uu', 'Canonical URL', '4'),
		'externalEquityLinks': new Col('ueid' ,'External Equity Links', '32'),
		'links': new Col('uid', 'Links', '2048'),
		'mozRankUrl': new Col('umrp', 'MozRank: URL', '16384'),
		'mozRankSubdomain': new Col('fmrp', 'MozRank: Subdomain', '32768'),
		'httpStatusCode': new Col('us', 'HTTP Status Code', '536870912'),
		'pageAuthority': new Col('upa', 'Page Authority', '34359738368'),
		'domainAuthority':  new Col('pda', 'Domain Authority', '68719476736'),
		'timeLastCrawled': new Col('ulc', 'Time last crawled', '144115188075855872')
	};

	this._inverseTable = {
		'ut': 'title',
		'uu': 'canonicalUrl',
		'ueid': 'externalEquityLinks',
		'uid': 'links',
		'umrp': 'mozRankUrl',
		'fmrp': 'mozRankSubdomain',
		'us': 'httpStatusCode',
		'upa': 'pageAuthority',
		'pda': 'domainAuthority',
		'ulc': 'timeLastCrawled'
	};

	this._totalTableValue = this._getTotalTableValue();
	console.log(this._totalTableValue);
}

util.inherits(UrlMetrics, Base);

UrlMetrics.prototype.get = function (params, cb) {
	var i, vals = [], isHttpStatusAdded = false, cols = 0;

	if (!params) {
		return cb(new Error('UrlMetrics - No paramaters'));
	}

	if (params.cols) {
		if (typeof params.cols === 'string') {
			params.cols = [params.cols];
		}

		for (i = 0; i < params.cols.length; i++) {
			if (params.cols[i] === 'httpStatusCode') {
				isHttpStatusAdded = true;
			}

			if (this._table[params.cols[i]]) {
				vals.push(this._table[params.cols[i]].flag);
			}
		}

		if (!isHttpStatusAdded) {
			vals.push(this._table.httpStatusCode.flag);
		}

		cols = bigMath.add(vals);
	} else { // no cols were provided so, we want them all!
		cols = this._totalTableValue;
	}
	
	this.send(params.target, { Cols: cols, raw: params.raw }, function (err, results) {
		if (err) {
			return cb(err)
		}

		if (results.httpStatusCode.value === 0) {
			return cb(null, { isNotCrawled: true });
		}

		if (results.title.value === '') {
			delete results.title;
		}

		return cb(null, results);
	});
};