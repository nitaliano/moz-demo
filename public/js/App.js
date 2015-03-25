define(function (require) {
  var $ = require('jquery');
  var AppView = require('./view/AppView');

  return function () {
    new AppView({
      el: $('.dashboard')
    });
  };
});