angular.module('modalAssist', ['parkAssist'])
  .controller('ModalCtrl', function($scope, $ionicModal, $state, $cordovaGeolocation, MapOptions, TrafficLayer, $rootScope, MapFactory) {
	 $scope.searched = {
	   text: 'Enter Your Preferred Destination Here'
	 };
	 $ionicModal.fromTemplateUrl('templates/modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $scope.openModal = function() {
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	  	
	  	var text = $scope.searched.text;

	    console.log(text.formatted_address);

	    if( text.formatted_address.match(/Santa Monica/) ) {
	      MapFactory.findSpot([text.geometry.location.G, text.geometry.location.K], true);
		    $scope.modal.hide();
	      return true;
	    } else {
	      $rootScope.$broadcast('$scope.searched.text', 'Please select a Santa Monica Location.');
	    }
	  };
	  // //Cleanup the modal when we're done with it!
	  // $scope.$on('$destroy', function() {
	  //   $scope.modal.remove();
	  // });
	  // // Execute action on hide modal
	  // $scope.$on('modal.hidden', function() {
	  //   // Execute action
	  // });
	  // // Execute action on remove modal
	  // $scope.$on('modal.removed', function() {
	  //   // Execute action
	  // });
  });