require.config({
  baseUrl: '/js',
  paths: {
    jquery: '../vendor/jquery/dist/jquery.min',
    underscore: '../vendor/underscore/underscore-min',
    backbone: '../vendor/backbone/backbone'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

define(function (require) {
  require('./App')();
});