'use strict';

import angular from 'angular';
import 'angular-route';
import 'angular-resource';

import API from './config/api';
import Router from './config/router';
import Main from './controllers/main';
import Post from './factories/post';

angular.module('app', ['ng', 'ngRoute', 'ngResource'])
    .constant('API', API)
    .config(Router)
    .controller('Main', Main)
    .service('Post', Post);
