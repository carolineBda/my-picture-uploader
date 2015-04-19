'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
