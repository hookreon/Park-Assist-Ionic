angular.module('parkAssist')
  .directive('map', function($rootScope, MapFactory) {

    var loading = function(scope, $loading, $loadingText) {
      scope.$on('parkAssist:changeLoadingText', function(e,text) {
        $loadingText.text(text);
      });

      scope.$on('parkAssist:showLoadingText', function(e) {
        $loading.addClass('show');
      });

      scope.$on('parkAssist:hideLoadingText', function(e) {
        $loading.removeClass('show');
      });
    };

    var loadMap = function(scope, element, attrs) {
      var $el = $(element);
      var mapCanvas = $el.find('#map')[0];
      // var $changeDest = $el.find('.change-destination');
      // var $anotherSpot = $el.find('.another-spot');
      var $loading = $el.find('.loading');
      var $loadingText = $loading.find('.loading-text');

      loading(scope, $loading, $loadingText);

      // $changeDest.on('click',function(e) {
      //   $rootScope.$broadcast('parkAssist:openModal');
      // });

      // $anotherSpot.on('click',function(e) {
      //   MapFactory.findSpot();
      // });

      MapFactory.init(mapCanvas)
      .then(function() {
        scope.$broadcast('parkAssist:changeLoadingText', 'Finding your location...');
        scope.$broadcast('parkAssist:showLoadingText');
      });
    };

    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'templates/map.html',
      link: loadMap
    };
  });