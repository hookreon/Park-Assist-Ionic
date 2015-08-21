angular.module('modalAssist', ['parkAssist'])
  .controller('ModalCtrl', function($scope, $ionicModal, $state, $cordovaGeolocation, MapOptions, TrafficLayer, $rootScope, MapFactory, $ionicPopup, $timeout) {
	 
	 $scope.searched = {
	   text: ''
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

	  $scope.showAlert = function() {
	    var alertPopup = $ionicPopup.alert({
	      title: 'That\'s outside of Santa Monica',
	      template: 'Please select a Santa Monica location'
	    });
	    alertPopup.then(function(res) {
	      $scope.openModal();
	    });
	  };

	  $scope.submitDestination = function() {
	  	
	  	var text = $scope.searched.text;

	    console.log(text);

	    if( text.formatted_address && text.formatted_address.match(/Santa Monica/) ) {
	      MapFactory.findSpot([text.geometry.location.G, text.geometry.location.K], true);
	    } else {
	    	console.log( 'You selected something outside of Santa Monica' );
	      // $rootScope.$broadcast('$scope.searched.text', 'Please select a Santa Monica Location.');
	      $scope.showAlert();
	    }
	    $scope.modal.hide();
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