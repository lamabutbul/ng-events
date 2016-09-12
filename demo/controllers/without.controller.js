'use strict';

angular.module('ngEvents.demo').controller('withoutController', ['$scope', 'clientsService', function($scope, clientsService){
    $scope.clients = null;

    // private
    var unbind = null;

    function findAll() {
        return clientsService.findAll();
    }

    function bindAll() {
        if (unbind) {
            unbind();
            unbind = null;
        }
        unbind = clientsService.bindAll({}, $scope, 'clients');
    }

    // init
    findAll().then(function(){
        bindAll();
    });
}]);
