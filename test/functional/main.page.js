'use strict';

var test = casper.test;

var MainPage = function () {
  var firstName = '#firstName';
  var lastName = '#lastName';
  var email = '#email';
  var picture = 'input[type="file"]';
  var submitButton = '#send';
  var error = 'div.alert-danger';
  var success = 'div.alert-success';
  var loading = 'div.alert-info';

  this.checkPage = function () {
    casper.then(function () {
      test.assertTitle('My Picture Uploader');
      test.assertField(firstName, null);
      test.assertField(lastName, null);
      test.assertField(email, null);
      test.assertNotVisible(error);
      test.assertNotVisible(success);
      test.assertNotVisible(loading);
    });
  };

  this.fillForm = function (f, l, e, p) {
    casper.then(function () {
      this.fillSelectors('form', {
        '#firstName': f,
        '#lastName': l,
        '#email': e,
        'input[type="file"]': p
      }, true);
      test.assertVisible(loading);
    });

  };
  this.submitForm = function () {
    casper.then(function () {
      this.click(submitButton);
    });
  };

  this.waitForLoaded = function () {
    casper.waitWhileVisible(loading);
  };

  this.errorIsShown = function (text) {
    casper.waitUntilVisible(error, function then() {
      test.assertNotVisible(success);
      test.assertNotVisible(loading);
      test.assertSelectorHasText(error, text);
    });
  };

  this.successIsShown = function (text) {
    casper.waitUntilVisible(success, function then() {
      test.assertVisible(success);
      test.assertNotVisible(error);
      test.assertNotVisible(loading);
      test.assertSelectorHasText(success, text);
    });
  };
};

module.exports = new MainPage();

