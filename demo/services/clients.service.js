'use strict';

angular.module('ngEvents.demo').service('clientsService', ['DS', function(DS){
    return DS.defineResource({
        name: 'client',
        endpoint: 'clients',
        computed: {
            name: ['first_name', 'last_name', function(first_name, last_name){
                return [first_name, last_name].join(' ');
            }],
        },
    });
}]);
