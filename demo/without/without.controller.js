'use strict';

angular.module('ngEvents.demo').controller('withoutController', ['$scope', 'agentsService', function($scope, agentsService){
    var ctrl = this;
    ctrl.agents = null;

    // private
    var unbind = null;

    function findAll() {
        return agentsService.findAll();
    }

    function bindAll() {
        if (unbind) {
            unbind();
            unbind = null;
        }
        unbind = agentsService.bindAll({}, $scope, 'withoutController.agents');
    }

    // init
    findAll().then(function(){
        bindAll();
    });
}]);
