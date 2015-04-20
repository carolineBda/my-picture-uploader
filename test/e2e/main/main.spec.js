'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po.js');
  });

  it('should present a form with empty fields', function() {
    expect(page.title.getText()).toBe('My Picture Uploader');
    expect(page.firstName.getAttribute('value')).toBe('');
    expect(page.lastName.getAttribute('value')).toBe('');
    expect(page.email.getAttribute('value')).toBe('');
    expect((page.error).isDisplayed()).toBe(false);
    expect((page.success).isDisplayed()).toBe(false);
  });

  it('should show errors when filds missing', function() {
    page.firstName.sendKeys('Jane');
    page.lastName.sendKeys('Perry');
    page.email.sendKeys('j.p@example.com');
    page.submitButton.click();
    browser.wait(function() {
      return page.success.isDisplayed();
    }, 8000);
    expect(page.success.isDisplayed()).toBeTruthy();
    expect(page.success.getText()).toBe('Well done Jane! A confirmation email has been sent to you.');
  });
});
