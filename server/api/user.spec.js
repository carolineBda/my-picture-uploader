'use strict';

var should = require('should');
var app = require('../app');
var request = require('supertest');
var unroll = require('unroll');

describe('POST /api/things', function() {

  it('should respond OK when all parameters sent', function(done) {
    request(app)
      .post('/api/user')
      .send({firstName:'Jenny', lastName: 'Johns', email: 'bla'})
      .expect(200)
      .end(done);
  });

  unroll('should respond bad request if one field missing', function(done, args) {
    request(app)
      .post('/api/user')
      .send(args.body)
      .expect(400)
      .end(done);
  }, [
    ['body'],
    [{firstName:'Jenny', lastName: 'Johns'}],
    [{firstName:'Jenny', email: 'bla'}],
    [{lastName:'Jenny', email: 'bla'}]
  ]);
});
