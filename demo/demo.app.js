'use strict';

angular.module('ngEvents.demo', [
    'ngAnimate',
    'ui.router',
    'js-data',
    'ngEvents',
]);

angular.module('ngEvents.demo').config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'DSHttpAdapterProvider', function($urlRouterProvider, $stateProvider, $httpProvider, DSHttpAdapterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'demo/templates/home.template.html',
            controller: 'homeController',
            controllerAs: 'homeController',
        })
        .state('without', {
            url: '/without',
            templateUrl: 'demo/templates/without.template.html',
            controller: 'withoutController',
            controllerAs: 'withoutController',
        })
        .state('with', {
            url: '/with',
            templateUrl: 'demo/templates/with.template.html',
            controller: 'withController',
            controllerAs: 'withController',
        })
    ;

    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                if (/api/i.test(config.url)) {
                    config.url = window.location.protocol + '//' + window.location.hostname + ':3001' + config.url;
                }
                return config || $q.when(config);
            }
        };
    });

    angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: '/api',
    });
}]);

angular.module('ngEvents.demo').controller('mainController', [function(){
    
}]);

angular.module('ngEvents.demo').run([function(){

}]);
