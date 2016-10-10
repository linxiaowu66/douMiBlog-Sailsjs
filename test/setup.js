'use strict';

var Sails = require('sails');

before(function(done) {
  Sails.lift({
    port: 8989,
    log: {
      noShip: true
    },
    hooks: {
      grunt: false
    },
    models: {
      connection: 'localDiskDb',
      migrate: 'drop'
    }

  }, done);
});


after(function() {
  Sails.lower();
});
