'use strict';

var MainPage = function() {
  this.title = element(by.css('h1'));
  this.firstName = element(by.id('firstName'));
  this.lastName = element(by.id('lastName'));
  this.email = element(by.id('email'));
  this.submitButton = element(by.id('send'));
  this.error = element(by.css('div.alert-danger'));
  this.success = element(by.css('div.alert-success'));
};

module.exports = new MainPage();

