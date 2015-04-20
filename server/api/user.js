'use strict';

var request = require('request');
var GEOIP_URL = 'https://freegeoip.net/json/';

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

module.exports.create = function (req, res) {
  var body = req.body;
  if (!isBodyValid(body)) {
    return res.send(400);
  }

  var userIP = getUserIp(req.headers['x-forwarded-for']);

  request(GEOIP_URL + userIP, function (err, httpRes, body) {

    if (!isFromUK(body)) {
      return res.send(401, {message: 'User country not allowed'});
    }
    return res.send(200);
  });
};
