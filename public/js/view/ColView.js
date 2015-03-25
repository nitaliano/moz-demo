define(function (require) {
	var $ = require('jquery');
	var Backbone = require('backbone');
	var ColCollection = require('../model/ColCollection');

	return Backbone.View.extend({
		template: Handlebars.templates._col,

		events: {
			'click .col': 'onColClick'
		},

		initialize: function (options) {
			this.collection = new ColCollection(this.$el.data(options.type));
			this.$content = this.$el.find('.panel-body');
			this.listenTo(this.collection, 'add', this.render);
			this.renderAll();
			this.$el.removeAttr('data-' + options.type);
		},

		onColClick: function (e) {
			var $col = $(e.currentTarget);
			var modelIndex = this.$content.find('.col').index($col);
			$col.remove();
			this.collection.remove(this.collection.at(modelIndex));
		},

		update: function (model) {
			this.collection.add(model);
		},

		render: function (model) {
			var col = model.toJSON ? model.toJSON() : model;
			this.$content.append(this.template(col));
		},

		renderAll: function () {
			var i, cols = this.collection.toJSON();

			for (i = 0; i < cols.length; i++) {
				this.render(cols[i]);
			}
		}
	});
});