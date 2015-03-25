define(function (require) {
  var Backbone = require('backbone');
  var ColModel = require('./ColModel');

  return Backbone.Collection.extend({
    model: ColModel,

    keys: function () {
      var keys = [];

      this.each(function (model) {
        keys.push(model.get('key'));
      });

      return keys;
    }
  });
});