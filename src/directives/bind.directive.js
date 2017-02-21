'use strict';

angular.module('ngEvents').directive('ngeBind', ['$parse', '$compile', function ngeBindDirective($parse, $compile){
    return {
        restrict: 'A',
        compile: function ngeBindCompiler($element, $attrs) {
            var parts = $attrs.ngeBind.split('::');

            var ngeBindParser = $parse(parts[0]);

            $compile.$$addBindingClass($element);

            return function ngeBindLinker($scope, $element, $attrs) {
                var ngeBindEvent = $parse(parts[1])($scope);

                $compile.$$addBindingInfo($element, parts[0]);

                function onChange() {
                    $element.html(ngeBindParser($scope) + '' || '');
                }

                if (_.isArray(ngeBindEvent)) {
                    _.each(ngeBindEvent, function(ngeBindEvent){
                        $scope.$on(ngeBindEvent, function ngeBindWatcher(){
                            onChange();
                        });
                    });
                }
                else {
                    $scope.$on(ngeBindEvent, function ngeBindWatcher(){
                        onChange();
                    });
                }

                onChange();
            };
        }
    };
}]);
