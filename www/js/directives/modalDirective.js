angular.module('modalAssist')
.directive('modal', function(MapFactory, GeocoderFactory, $rootScope) {

  var link = function(scope, el, attrs) {
    console.log('alert me pleease!');
  };

  return {
    restrict: 'E',
    templateUrl: 'templates/modal-template.html',
    link: link
  };
});