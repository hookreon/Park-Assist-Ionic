angular.module('modalAssist')
.directive('modal', function(MapFactory, GeocoderFactory, $rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'templates/modal-template.html',
    // link: link
  };
});