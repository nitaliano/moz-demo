define(function (require) {
	var $ = require('jquery');
	var Backbone = require('backbone');

	var AppModel = Backbone.Model.extend({
		defaults: {
			fields: [],
			cols: {},
			target: 'moz.com',
			options: {
				type: 'GET',
				url: '/api/urlmetrics'
			}
		},

		initialize: function () {
			this.listenTo(this, 'change:target', this.fetchData);
		},

		fetchData: function () {
			var i, opts = this.get('options');
			
			opts.data = {
				target: this.get('target'),
				fields: this.get('fields')
			};

			$.ajax(opts)
				.done(this._onSucess.bind(this))
				.fail(this._onFail.bind(this));
		},

		_onSucess: function (cols) {
			this.set('cols', cols);
		},

		_onFail: function () {
			console.log(arguments)
		}
	});

	return AppModel;
});