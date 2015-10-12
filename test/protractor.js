exports.config = {
    specs: [
        './e2e/**/*.spec.js'
    ],
    multiCapabilities: [{
        name: 'Firefox',
        browserName: 'firefox'
    }, {
        name: 'Chrome',
        browserName: 'chrome'
    }],
    baseUrl: 'http://localhost:8080'
};
