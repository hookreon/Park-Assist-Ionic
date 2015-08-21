angular.module('parkAssist')
  .factory('GeocoderFactory', function($q) {
    
    var geocoder = new google.maps.Geocoder();

    var parseLatLng = function(lat, lng) {
      var latLng = new google.maps.LatLng(lat, lng);
      var deferred = $q.defer();

      var geocodeOptions = {
        location: latLng
      };

      geocoder.geocode(geocodeOptions, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject('No results found.');
          } 
        } else {
          deferred.reject('Geocoder failed due to: ' + status);
        }
      });
      return deferred.promise;
    };

    var parseAddress = function(address) {
      var deferred = $q.defer();

      var geocodeOptions = {
        address: address
      };

      geocoder.geocode(geocodeOptions, function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          deferred.reject('Geocoder failed due to: ' + status);
        }
        deferred.resolve(results[0]);
      });
      return deferred.promise;
    };

    return {
      parseLatLng: parseLatLng,
      parseAddress: parseAddress
    };
    
  });