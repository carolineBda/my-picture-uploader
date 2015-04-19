'use strict';

function isBodyValid(body) {
  return (!body.firstName || !body.lastName || !body.email);
}

module.exports.create = function (req, res) {
  var body = req.body;
  if (!isBodyValid(body)) {
    return res.send(400);
  }
  res.send(200);
};
