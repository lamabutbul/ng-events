'use strict';

angular.module('ngEvents').directive('ngeStyle', ['$parse', function ngeStyleDirective($parse){
    return {
        restrict: 'A',
        link: function ngeStyleLinker($scope, $element, $attrs){
            var parts = $attrs.ngeStyle.split('::');
            var ngeStyleParser = $parse(parts[0]);
            var ngeStyleEvent = $parse(parts[1])($scope);

            function onChange() {
                $element.css(ngeStyleParser($scope));
            }

            if (_.isArray(ngeStyleEvent)) {
                _.each(ngeStyleEvent, function(ngeStyleEvent){
                    $scope.$on(ngeStyleEvent, function ngeStyleWatcher(){
                        onChange();
                    });
                });
            }
            else {
                $scope.$on(ngeStyleEvent, function ngeStyleWatcher(){
                    onChange();
                });
            }

            onChange();
        }
    };
}]);
