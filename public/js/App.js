define(function (require) {
	var $ = require('jquery');
	var AppModel = require('./model/AppModel');
	var AppView = require('./view/AppView');

	return function () {
		new AppView({
			el: $('.dashboard'),
			model: new AppModel()
		});
	}
});