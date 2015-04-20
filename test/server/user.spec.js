'use strict';

var app = require('../../server/app');
var request = require('supertest');
var unroll = require('unroll');
var nock = require('nock');
nock.enableNetConnect('127.0.0.1');

describe('POST /api/user', function() {
  var BRITISH_IP = '195.47.223.87';

  beforeEach(function() {
    nock('https://freegeoip.net')
      .get('/json/' + BRITISH_IP)
      .reply(200, {
        ip: BRITISH_IP,
        country_code: 'GB'
      });
  });

  it('should respond OK when all parameters sent and IP from GB', function(done) {
    request(app)
      .post('/api/user')
      .set('X-Forwarded-For', BRITISH_IP)
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

  it('should respond Unauthorised when freegeoip respond not in UK', function(done) {
    var FRENCH_IP = '92.222.46.207';
    nock('https://freegeoip.net')
      .get('/json/' + FRENCH_IP)
      .reply(200, {
        ip: FRENCH_IP,
        country_code: 'FR',
        country_name: 'France'
      });

    request(app)
      .post('/api/user')
      .set('X-Forwarded-For', FRENCH_IP)
      .send({firstName:'Jenny', lastName: 'Johns', email: 'bla'})
      .expect(401, {message: 'User country not allowed'}, done);
  });
});
