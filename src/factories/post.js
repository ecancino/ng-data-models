var Post = function($resource, API) {
    return $resource(API.URL +'/:oid', { oid: '@oid' , apiKey: API.KEY }, {
        get: { method: 'GET', cache: false },
        update: { method: 'PUT', isArray: false },
        delete: { method: 'DELETE' }
    });
};

Post.$inject = [ '$resource', 'API' ];

module.exports = Post;
