define(function (require) {
	var $ = require('jquery');
	var Backbone = require('backbone');
	var ColCollection = require('./ColCollection');

	var SearchModel = Backbone.Model.extend({
		defaults: {
			target: '',
			fields: [],
			error: {}
		},

		initialize: function () {
			this.results = new ColCollection();
			this.listenTo(this, 'change:target', this.fetchData);
		},

		fetchData: function () {
			var opts = {
				type: 'GET',
				url: '/api/urlmetrics'
			};
			
			opts.data = {
				target: this.get('target'),
				fields: this.get('fields')
			};

			$.ajax(opts)
				.done(this._onSucess.bind(this))
				.fail(this._onFail.bind(this));
		},

		_onSucess: function (data) {
			var i, results = [], keys = Object.keys(data);

			if (data.isNotCrawled) {
				this.results.reset([]);
				return;
			}

			for (i = 0; i < keys.length; i++) {
				results.push($.extend({ key: keys[i] }, data[keys[i]]));
			}
			
			this.results.reset(results);
		},

		_onFail: function (err) {
			this.set('error', err);
		}
	});

	return SearchModel;
});