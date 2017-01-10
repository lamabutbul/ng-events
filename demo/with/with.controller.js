'use strict';

angular.module('ngEvents.demo').controller('withController', ['$scope', 'clientsService', function($scope, clientsService){
    $scope.users = null;

    // private
    function findAll() {
        return clientsService.findAll();
    }

    function bindAll() {
        if (unbind) {
            unbind();
        }
        unbind = clientsService.bindAll({}, $scope, 'clients');
    }

    // init
    findAll().then(function(){
        bindAll();
    });
}]);
