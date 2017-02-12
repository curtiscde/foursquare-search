'use strict';

var fsApp = angular.module("fsApp", ['ngRoute'])

.controller('mainController', function($scope, $route, $http, $sce) {

  $scope.submitSearch = function(){

    if ($scope.searchText){

      $scope.searchTerm = $scope.searchText;

      var searchUrl = config.foursquareApi.url
                      + "/venues/explore?v=20161016&venuePhotos=1"
                      + "&client_id=" + config.foursquareApi.clientId
                      + "&client_secret=" + config.foursquareApi.clientSecret
                      + "&near=" + $scope.searchText;

      //Reset error message & results
      $scope.errorMessage = "";
      $scope.venues = null;

      $http.get(searchUrl).then(function(response){

          if (response.status !== 200){
            $scope.errorMessage = "Something went wrong";
          }
          else{
            $scope.venues = mapResultsToVenues(response);
          }

        }, function(){
          $scope.errorMessage = "Something went wrong";
        });

      }

  };

  var mapResultsToVenues = function(apiResponse){
    var venues = [];
    for(var i = 0; i<apiResponse.data.response.groups.length; i++){

      var group = apiResponse.data.response.groups[i];

      for(var v = 0; v<group.items.length; v++){

        var venue = group.items[v].venue;

        var venueItem = {
          name: venue.name,
          imageUrl: "images/default-venue.png",
          rating: venue.rating,
          ratingColor: venue.ratingColor
        };

        if (venue.photos.groups.length
            && venue.photos.groups[0].items.length){
              var img = venue.photos.groups[0].items[0];
              venueItem.imageUrl = img.prefix + "74x74" + img.suffix;
        }

        venues.push(venueItem);

      }

    };
    return venues;
  };

});
