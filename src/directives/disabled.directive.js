'use strict';

angular.module('ngEvents').directive('ngeDisabled', ['$parse', function ngeDisabledDirective($parse) {
    return {
        restrict: 'A',
        priority: 100,
        link: function ngeDisabledLinker($scope, $element, $attrs) {
            var parts = $attrs.ngeDisabled.split('::');
            var ngeDisabledParser = $parse(parts[0]);
            var ngeDisabledEvent = $parse(parts[1])($scope);

            function onChange() {
                $attrs.$set('disabled', !!ngeDisabledParser($scope));
            }

            if (_.isArray(ngeDisabledEvent)) {
                _.each(ngeDisabledEvent, function (ngeDisabledEvent) {
                    $scope.$on(ngeDisabledEvent, function ngeDisabledWatcher() {
                        onChange();
                    });
                });
            }
            else {
                $scope.$on(ngeDisabledEvent, function ngeDisabledWatcher() {
                    onChange();
                });
            }

            onChange();
        }
    };
}]);
