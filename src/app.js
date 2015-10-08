'use strict';

var angular = require('angular'),
    _ = require('lodash');
// angular modules
require('angular-route');
require('angular-resource');

angular.module('app', ['ng', 'ngRoute', 'ngResource']);

var Config = function($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/views/main.html',
        controller: 'Main',
        controllerAs: 'main',
        resolve: Main.resolve
    });
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers['DNT'] = '1'
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

Config.$inject = [ '$routeProvider', '$httpProvider' ];

var Main = function(Post, Posts) {
    var self = this;
    self.posts = Posts;
    self.editing = false;
    self.post = new Post();

    function update(post) {
        var updated = Post.update({ oid: post._id['$oid'] }, post);
        var idx = _.findIndex(self.posts, function(post) {
            return post._id['$oid'] === updated._id['$oid']
        });
        self.posts[idx] = updated;
    }

    function create(post) {
        self.post.$save().then(function(saved) {
            console.log(saved);
            self.posts.push(saved);
        });
    }

    self.save = function save(post) {
        if (post._id) {
            update(post);
        } else {
            create(post);
        }
        self.post = new Post();
        self.editing = false;
    };

    self.delete = function(post) {
        post.oid = post._id['$oid'];
        delete post._id;
        Post.delete(post);
        _.remove(self.posts, post);
    };

    self.clear = function clear() {
        self.post = new Post();
        self.editing = false;
    };

    self.active = function active(post) {
        self.post = Post.get({ oid: post._id['$oid'] }, post);
        self.editing = true;
    };

    return self;
};

Main.resolve = {
    Posts: function(Post) {
        return Post.query().$promise;
    }
};

var API = {
    URL: 'https://api.mongolab.com/api/1/databases/neutron/collections/quarks',
    KEY: 'FR2acxDWT_osGMVdZPhfsmWEpcF88NeW'
};

var Post = function($resource, API) {
    return $resource(API.URL +'/:oid', { oid: '@oid' , apiKey: API.KEY }, {
        get: { method: 'GET', cache: false },
        update: { method: 'PUT', isArray: false },
        delete: { method: 'DELETE' }
    });
};

Post.$inject = [ '$resource', 'API' ];

angular.module('app')
    .config(Config)
    .controller('Main', Main)
    .constant('API', API)
    .factory('Post', Post);
