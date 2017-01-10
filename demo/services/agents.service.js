'use strict';

angular.module('ngEvents.demo').service('agentsService', ['DS', function(DS){
    function transform(agent) {
        agent.registered_at = new Date(agent.registered_at);
        agent.last_online = new Date(agent.last_online);
    }

    return DS.defineResource({
        name: 'agent',
        endpoint: 'agents',
        afterFindAll: function(resource, agents, cb) {
            var agent = null;
            for (var i = 0; i < agents.length; i++) {
                transform(agents[i]);
            }
            return cb(null, agents);
        },
    });
}]);
