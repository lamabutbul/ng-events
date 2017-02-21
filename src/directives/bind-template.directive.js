'use strict';

angular.module('ngEvents').directive('ngeBindTemplate', ['$compile', '$parse', function ngeBindTemplateDirective($compile, $parse){
    return {
        restrict: 'A',
        link: function ngeBindTemplateLinker($scope, $element, $attrs){
            $element.append($compile($parse($attrs.ngeBindTemplate)($scope))($scope));
        }
    };
}]);
