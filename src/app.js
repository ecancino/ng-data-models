'use strict';

var angular = require('angular');
// angular modules
require('angular-route');
require('angular-resource');

var API = require('./config/api'),
    Router = require('./config/router'),
    Main = require('./controllers/main'),
    Post = require('./factories/post');

angular.module('app', ['ng', 'ngRoute', 'ngResource'])
    .config(Router)
    .controller('Main', Main)
    .constant('API', API)
    .factory('Post', Post);
