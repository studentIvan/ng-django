{
    /**
     * API Protractor
     * @type  {{getInstance: Function}}
     */
    protractor;

    /**
     * @type {Function}
     */
    describe;

    /**
     * @type {Function}
     */
    it;

    /**
     * API WebDriver
     * @type {{get: Function, Key: {ENTER: number}}}
     */
    browser;

    /**
     *
     * @type {{name: Function, linkText: Function}}
     */
    by;

    /**
     * @type {Function}
     * @return {{toEqual: Function}}
     */
    expect;
}

/**
 * Bot
 * @type {{findElement: Function, sleep: Function}}
 */
bot = protractor.getInstance();

/**
 * Site URL
 * @type {string}
 */
siteURL = bot.baseUrl;

describe('application example test', function () {
    it('navigation works correctly', function () {
        /**
         * открываем адрес сайта
         */
        browser.get(siteURL);

        /**
         * заполняем форму
         */
        var username = bot.findElement(by.name('username'));
        var password = bot.findElement(by.name('password'));

        username.sendKeys('admin');
        password.sendKeys('admin');
        password.sendKeys(protractor.Key.ENTER);

        /**
         * Переходим по ссылочкам
         */
        bot.findElement(by.linkText('another')).click();
        bot.findElement(by.linkText('another/second_level')).click();
        bot.findElement(by.linkText('another/second_level/third_level')).click();
        bot.findElement(by.linkText('another/second_level/third_level/fourth_level')).click();
        bot.findElement(by.linkText('another')).click();
    });

    it('obama wants to be 53 years old', function () {
        /**
         * Идем на главную
         */
        bot.findElement(by.linkText('home')).click();

        /**
         * Ищем ссылочку сколько лет обаме
         */
        bot.findElement(by.id('how')).then(function (foundElement) {
            foundElement.click();
        });

        /**
         * Смотрим результат
         */
        bot.findElement(by.id('how_result')).then(function (foundElement) {
            expect(foundElement.getText()).toEqual('Obama has: 53 years');
        });
    });

    /**
     * Если были ошибки в логах браузера - скидываем их в логи
     */
    browser.manage().logs().get('browser').then(function (browserLogs) {
        browserLogs.forEach(function (log) {
            if (log.level.value > 900) {
                console.log('Browser console error!');
                console.log(log.message);
            }
        });
    });
});