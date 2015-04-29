'use strict';
var path = require('path');

describe('Main View', function() {
  var page;
  var facePicture =  path.resolve(__dirname, '../../resources/faces.jpg');
  var noFacePicture =  path.resolve(__dirname, '../../resources/no-faces.jpg');

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po.js');
  });

  it('should present a form with empty fields', function() {
    expect(page.title.getText()).toBe('My Picture Uploader');
    expect(page.firstName.getAttribute('value')).toBe('');
    expect(page.lastName.getAttribute('value')).toBe('');
    expect(page.email.getAttribute('value')).toBe('');
    expect(page.error.isDisplayed()).toBe(false);
    expect(page.success.isDisplayed()).toBe(false);
    expect(page.loading.isDisplayed()).toBe(false);
  });

  it('should show errors when picture do not contains a face', function() {
    page.firstName.sendKeys('Jane');
    page.lastName.sendKeys('Perry');
    page.email.sendKeys('j.p@example.com');
    page.picture.sendKeys(noFacePicture);

    browser.wait(function() {
      return page.error.isDisplayed();
    }, 8000);

    expect(page.success.isDisplayed()).toBe(false);
    expect(page.loading.isDisplayed()).toBe(false);
    expect(page.error.getText()).toBe('Please select a picture with a face visible.');
  });

  it('should show success message when all fields are filled', function() {

    page.firstName.sendKeys('Jane');
    page.lastName.sendKeys('Perry');
    page.email.sendKeys('j.p@example.com');
    page.picture.sendKeys(facePicture);

    page.submitButton.click();

    browser.wait(function() {
      return page.success.isDisplayed();
    }, 8000);

    expect((page.error).isDisplayed()).toBe(false);
    expect((page.loading).isDisplayed()).toBe(false);
    expect(page.success.getText()).toBe('Well done Jane! A confirmation email has been sent to you.');
  });
});
