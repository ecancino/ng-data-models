function IndexPage() {
    this.input  = element(by.id('post'));
    this.submit = element(by.id('submit'));
    this.clear  = element(by.id('clear'));
    this.post   = element(by.model('main.post.title'));
    this.first  = element.all(by.repeater('post in main.posts.toArray()')).get(0);

    this.get = function() {
        browser.get('/#');
    };

    this.getPageTitle = function() {
        return browser.getTitle();
    };

    this.setInputValue = function(value) {
        this.input.sendKeys(value);
    };

    this.clearInputValue = function() {
        this.input.clear();
    };

    this.getPostValue = function() {
        return this.post.getAttribute('value');
    };

    this.getFirstPost = function() {
        return this.first.element(by.exactBinding('post.title')).getText();
    };

    this.firstPostIsPresent = function() {
        return element.all(by.repeater('post in main.posts.toArray()')).count();
    };

    this.deleteFirstPost = function() {
        return this.first.element(by.css('.close')).click();
    };

    this.clickSubmit = function() {
        this.submit.click();
    };

    this.clickClear = function() {
        this.clear.click();
    };
}

module.exports = IndexPage;
