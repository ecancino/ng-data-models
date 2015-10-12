var IndexPage = require('./IndexPage');

describe('App', function() {
    var page = new IndexPage();
    //page.clickClear();

    beforeEach(function() {
        page.get();
        page.clearInputValue();
    });

    describe('Index', function() {
        it('it should display the correct title', function() {
            expect(page.getPageTitle()).toBe('Posts');
        });

        it('it should modify the model', function() {
            page.setInputValue('New Post');
            expect(page.getPostValue()).toBe('New Post');
        });

        it('it should create a new post', function() {
            page.setInputValue('New Post');
            page.clickSubmit();
            expect(page.getFirstPost()).toBe('New Post');
        });

        it('it should delete a post', function() {
            page.deleteFirstPost();
            expect(page.firstPostIsPresent()).toBe(0);
        });
    });
});
