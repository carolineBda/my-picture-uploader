'use strict';

var MainPage = function() {
  this.title = element(by.css('h1'));
  this.firstName = element(by.id('firstName'));
  this.lastName = element(by.id('lastName'));
  this.email = element(by.id('email'));
  this.picture = element(by.css('input[type="file"]'));
  this.submitButton = element(by.id('send'));
  this.error = element(by.css('div.alert-danger'));
  this.success = element(by.css('div.alert-success'));
  this.loading = element(by.css('div.alert-info'));
};

module.exports = new MainPage();

