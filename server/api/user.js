'use strict';

var multiparty = require('multiparty');
var fs = require('fs');
var request = require('request');
var GEOIP_URL = 'https://freegeoip.net/json/';

var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var email     = {
  from:     'my-picture-uploader@bda-solutions.co.uk',
  text:     'You have successfully upload your information,\nThank you.'
};

function isBodyValid(body) {
  return (body.firstName && body.lastName && body.email);
}

function getUserIp(headerString) {
  return headerString ? headerString.split(',')[0] : '';
}

function isFromUK(body) {
  var geoInfo = JSON.parse(body);
  return geoInfo && geoInfo.country_code === 'GB';
}

module.exports.create = function (req, res, next) {
  var fields = req.body;

  if (!isBodyValid(fields)) {
    return res.send(400, {message: 'Fields missing'});
  }

  var userIP = getUserIp(req.headers['x-forwarded-for']);

  request(GEOIP_URL + userIP, function (err, httpRes, body) {

    if (!isFromUK(body)) {
      return res.send(401, {message: 'User country not allowed'});
    }
    email.to = fields.email;
    email.subject = 'Welcome ' + fields.firstName;

    sendgrid.send(email, function(err) {
      if (err) return next(err);
      return res.send(200);
    });

  });
};

module.exports.upload = function (req, res) {

  var form = new multiparty.Form();

  form.on('file', function (name, file) {

    var options = {
      method: 'POST',
      url: 'https://apicloud-facerect.p.mashape.com/process-file.json',
      headers: {
        'X-Mashape-Key': 'jiYKzMkjIBmshJTva1hgdCKFHrkyp17jtdcjsnWVrHq070ZHr2'
      },
      formData: {
        image: fs.createReadStream(file.path)
      }
    };

    request(options, function (err, httpResponse, body) {
      if (err) {
        res.send(500);
        return console.error('upload failed:', err);
      }
      var faces = JSON.parse(body).faces;
      var status = (faces && faces.length) ? 201 : 406;
      res.send(status);
      console.log('Picture uploaded successfully. Facerect responded with:', body);
    });

  });
  form.parse(req);

};
