'use strict';

var userController = require('./api/user');

module.exports = function(app) {
  app.post('/api/user', userController.create);

  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
