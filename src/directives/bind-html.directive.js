'use strict';

angular.module('ngEvents').directive('ngeBindHtml', ['$sce', '$parse', '$compile', function ngeBindHtmlDirective($sce, $parse, $compile){
    return {
        restrict: 'A',
        compile: function ngeBindHtmlCompiler($element, $attrs) {
            var parts = $attrs.ngeBindHtml.split('::');

            var ngeBindHtmlParser = $parse(parts[0]);

            $compile.$$addBindingClass($element);

            return function ngeBindHtmlLinker($scope, $element, $attrs) {
                var ngeBindHtmlEvent = $parse(parts[1])($scope);

                $compile.$$addBindingInfo($element, parts[0]);

                function onChange() {
                    $element.html($sce.getTrustedHtml(ngeBindHtmlParser($scope) + '') || '');
                }

                if (_.isArray(ngeBindHtmlEvent)) {
                    _.each(ngeBindHtmlEvent, function(ngeBindHtmlEvent){
                        $scope.$on(ngeBindHtmlEvent, function ngeBindHtmlWatcher(){
                            onChange();
                        });
                    });
                }
                else {
                    $scope.$on(ngeBindHtmlEvent, function ngeBindHtmlWatcher(){
                        onChange();
                    });
                }

                onChange();
            };
        }
    };
}]);
