'use strict';

var page = require('./main.page');
var fs = require('fs');
var facePicture = fs.absolute('./test/resources/faces.jpg');
var noFacePicture = fs.absolute('./test/resources/no-faces.jpg');

casper.test.on('fail', function failure (){
  casper.capture('fail.png');
  casper.exit(1);
})


casper.test.begin('My Picture Uploader how errors when picture do not contains a face', function suite(test) {

  casper.start('http://localhost:9000', function() {
    page.checkPage();
    page.fillForm('Jane', 'Perry', 'j.p@example.com', noFacePicture);
  });

  casper.then(function() {
    page.waitForLoaded();
    page.errorIsShown('Please select a picture with a face visible.');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('My Picture Uploader show success message when all fields are filled', function suite(test) {

  casper.start('http://localhost:9000', function() {
    page.checkPage();
    page.fillForm('Jane', 'Perry', 'j.p@example.com', facePicture);
    page.waitForLoaded();
    page.submitForm();
  });

  casper.then(function() {
    page.successIsShown('Well done Jane! A confirmation email has been sent to you.');
  });

  casper.run(function() {
    test.done();
  });
});
