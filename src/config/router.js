import Main from './../controllers/main';
import template from './../views/main.jade';

const Router = ($routeProvider, $httpProvider) => {
    $routeProvider.when('/', {
        template,
        controller: 'Main',
        controllerAs: 'main',
        resolve: Main.resolve
    });
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers['DNT'] = '1'
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

Router.$inject = [ '$routeProvider', '$httpProvider' ];

export default Router;
