var fs = require('fs');

module.exports = function (app) {
	// bootstrap controllers
	initControllers(app);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

};


function initControllers(app) {
	var i, controller, Controller, files = fs.readdirSync('./controllers');

	if (!files.length) {
		throw new Error('Controllers could not be found!!!!!!');
	}

	for (i = 0; i < files.length; i++) {
		if (files[i] !== 'base.js') {
			Controller = require('../controllers/' + files[i]);
			controller = new Controller(app);
			controller.handle();			
		}
	}
}