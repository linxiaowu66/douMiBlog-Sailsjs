'use strict';

require.config({
  baseUrl: '/vender',
  waitSeconds: 200,

  paths: {
    jquery: 'jquery/dist/jquery.min',
    bootstrap: 'bootstrap/dist/js/bootstrap.min',
    highlight: 'highlightjs/highlight.pack.min',
    markdown: 'marked/lib/marked',
    datePicker: '../js/jquery.datetimepicker',
    convertToPinYin: '../js/convertToPinYin'
  },

  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    datePicker: {
      deps: ['jquery'],
      exports: 'datePicker'
    },
    highlight:{
      exports: 'highlight'
    }
  }
});

//Loading JQuery and Bootstrap firstly by default.
require(['jquery','bootstrap']);
