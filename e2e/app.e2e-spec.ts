
describe('QuickStart E2E Tests', function () {

  let expectedMsg = 'Followers';

  beforeEach(function () {
    browser.get('');
  });

  it('should display: ' + expectedMsg, function () {
    expect(element(by.css('h3')).getText()).toEqual(expectedMsg);
  });

});
