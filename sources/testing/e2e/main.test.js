var $$$ = protractor.getInstance();

describe('application example test', function () {
    it('navigation works correctly', function () {
        browser.get($$$.baseUrl);
        $$$.findElement(by.linkText('another')).then(function (e) {
            e.click();
        });
        $$$.findElement(by.id('show_alert')).then(function (e) {
            expect(e.getText()).toEqual('show alert');
        });
    });

    it('obama wants to be 53 years old', function () {
        $$$.findElement(by.linkText('home')).then(function (e) {
            e.click();
        });
        $$$.findElement(by.id('how')).then(function (e) {
            e.click();
        });
        $$$.sleep(1000);
        $$$.findElement(by.id('how_result')).then(function (e) {
            expect(e.getText()).toEqual('Obama has: 53 years');
        });
    });

    browser.manage().logs().get('browser').then(function(browserLogs) {
        browserLogs.forEach(function (log) {
            if (log.level.value > 900) {
                console.log('Browser console error!');
                console.log(log.message);
            }
        });
    });
});