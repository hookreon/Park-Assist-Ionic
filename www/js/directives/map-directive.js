angular.module('parkAssist')
  .directive('map', function(MapFactory) {

    var loadMap = function(scope, element, attrs) {
      var $el = $(element);
      var mapCanvas = $el.find('#map')[0];
      MapFactory.init(mapCanvas);
    };

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/map.html',
      link: loadMap
    }
  });