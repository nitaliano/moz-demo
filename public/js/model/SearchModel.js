define(function (require) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var ColCollection = require('./ColCollection');

  var SearchModel = Backbone.Model.extend({
    defaults: {
      target: '',
      cols: []
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
        cols: this.get('cols')
      };

      $.ajax(opts)
        .done(this._onSucess.bind(this));
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
    }
  });

  return SearchModel;
});