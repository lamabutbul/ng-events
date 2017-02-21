'use strict';

angular.module('ngEvents').directive('ngeClass', ['$parse', function ngeClassDirective($parse){
    return {
        restrict: 'A',
        link: function ngeClassLinker($scope, $element, $attrs){
            var ngeClass = null;

            var parts = $attrs.ngeClass.split('::');
            var ngeClassParser = $parse(parts[0]);
            var ngeClassEvent = $parse(parts[1])($scope);

            function toggleClasses(classes) {
                _.each(classes, function(active, className){
                    if (active) {
                        $element.addClass(className);
                    }
                    else {
                        $element.removeClass(className);
                    }
                });
            }

            function onChange() {
                var newngeClass = ngeClassParser($scope);
                if (!_.isEqual(newngeClass, ngeClass)) {
                    if (ngeClass) {
                        if (_.isString(ngeClass)) {
                            $element.removeClass(ngeClass);
                        }
                        else {
                            toggleClasses(ngeClass);
                        }
                    }
                    if (newngeClass) {
                        if (_.isString(newngeClass)) {
                            $element.addClass(newngeClass);
                        }
                        else if (_.isObject(newngeClass)) {
                            toggleClasses(newngeClass);
                        }
                    }
                }
                ngeClass = newngeClass;
            }

            if (_.isArray(ngeClassEvent)) {
                _.each(ngeClassEvent, function(ngeClassEvent){
                    $scope.$on(ngeClassEvent, function ngeClassWatcher(){
                        onChange();
                    });
                });
            }
            else {
                $scope.$on(ngeClassEvent, function ngeClassWatcher(){
                    onChange();
                });
            }

            onChange();
        }
    };
}]);
