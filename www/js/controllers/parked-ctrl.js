angular.module('parkAssist')
  .controller('ParkedCtrl', function($scope) {

    $scope.time = {
      desiredTime: '',
      timeExpired: '',
      timeSet: false,
    }

    $scope.submitTime = function() {
      $scope.time.timeExpired = moment().add($scope.time.desiredTime, 'minutes').format('h:mm a');
      $scope.time.timeSet = true;
      $scope.time.desiredTime = '';
      console.log($scope.time.timeExpired);
    };

    $scope.resetTime = function() {
      $scope.time.timeExpired = '';
      $scope.time.timeSet = false;
    }

  });