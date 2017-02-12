'use strict';

var fsApp = angular.module("fsApp", ['ngRoute'])

.controller('mainController', function($scope, $route, $http) {

  $scope.submitSearch = function(){

    if ($scope.searchText){

      $scope.searchTerm = $scope.searchText;

      var searchUrl = config.foursquareApi.url
                      + "/venues/search?v=20161016&intent=checkin"
                      + "&client_id=" + config.foursquareApi.clientId
                      + "&client_secret=" + config.foursquareApi.clientSecret
                      + "&near=" + $scope.searchText;

      //Reset error message & results
      $scope.errorMessage = "";
      $scope.venues = [];

      $http.get(searchUrl).then(function(response){
          console.log(response); //TODO: Remove
          console.log(response.status);

          if (response.status !== 200){
            $scope.errorMessage = "Something went wrong";
          }
          else{
            $scope.venues = mapResultsToVenues(response);
            console.log($scope.venues);
          }

        }, function(){
          $scope.errorMessage = "Something went wrong";
        });

      }

  };

  var mapResultsToVenues = function(apiResponse){
    var venues = [];
    for(var i = 0; i<apiResponse.data.response.venues.length; i++){

      var venue = apiResponse.data.response.venues[i];

      venues.push({
        name: venue.name
      });

    };
    return venues;
  };

});
