define(function (require) {
  var Backbone = require('backbone');

  var SearchModel = require('../model/SearchModel');

  var SearchView = require('./SearchView');
  var ColView = require('./ColView');
  var ResultsView = require('./ResultsView');

  return Backbone.View.extend({
    initialize: function () {
      this.searchModel = new SearchModel();

      this.searchView = new SearchView({
        el: this.$el.find('.search'),
        model: this.searchModel
      });

      this.includedView = new ColView({
        el: this.$el.find('.included'),
        type: 'included'
      });

      this.excludedView = new ColView({
        el: this.$el.find('.excluded'),
        type: 'excluded'
      });

      this.resultsView = new ResultsView({
        el: this.$el.find('.results')
      });

      this.listenTo(this.includedView.collection, 'remove', this.onIncludeRemove);
      this.listenTo(this.excludedView.collection, 'remove', this.onExcludeRemove);
      
      this.listenTo(this.searchModel.results, 'reset', this.onSearchResults);
      this.setIncludedFields();
    },

    setIncludedFields: function () {
      this.searchModel.set('cols', this.includedView.collection.keys());
    },

    onIncludeRemove: function (model) {
      this.excludedView.update(model);
      this.setIncludedFields();
    },

    onExcludeRemove: function (model) {
      this.includedView.update(model);
      this.setIncludedFields();
    },

    onSearchResults: function () {
      this.resultsView.render(this.searchModel.results.toJSON());
    }
  });
});