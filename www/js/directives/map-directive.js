angular.module('parkAssist')
  .directive('map', function(MapFactory) {
    var mapFactory = MapFactory;
    var loadMap = function(scope, element, attrs) {
      var $el = $(element);
      var mapCanvas = $el.find('#map')[0];
      mapFactory.init(mapCanvas);
    };

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/map.html',
      link: loadMap
    }
  });