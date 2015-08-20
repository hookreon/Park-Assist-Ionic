angular.module('parkAssist')
  .factory('GeocoderFactory', function($q) {
    
    var geocoder = new google.maps.Geocoder();

    var parseLatLng = function(lat, lng) {
      var latLng = new google.maps.LatLng(lat, lng);
      var deffered  = $q.defer();

      var geocodeOptions = {
        location: latLng
      };

      geocoder.geocode(geocodeOptions, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            deffered.resolve(results[0]);
          } else {
            deffered.reject('No results found.');
          } 
        } else {
          deffered.reject('Geocoder failed due to: ', status);
        }
      });
      return deffered.promise;
    };

    var parseAddress = function(address) {
      var deffered = $q.defer();

      var geocodeOptions = {
        address: address
      };

      geocoder.geocode(geocodeOptions, function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          deffered.reject('Geocoder failed due to: ', status);
        }
        deffered.resolve(results[0]);
      });
      return deffered.promise;
    };

    return {
      parseLatLng: parseLatLng,
      parseAddress: parseAddress
    };
    
  });