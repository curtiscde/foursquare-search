'use strict';

var fsApp = angular.module("fsApp", ['ngRoute'])

.controller('mainController', function($scope, $route, $http) {

  $scope.submitSearch = function(){

    if ($scope.searchText){

      var searchUrl = config.foursquareApi.url
                      + "/venues/search?v=20161016&intent=checkin"
                      + "&client_id=" + config.foursquareApi.clientId
                      + "&client_secret=" + config.foursquareApi.clientSecret
                      + "&near=" + $scope.searchText;


      $http.get(searchUrl).then(function(response){
          console.log(response); //TODO: Remove



        }, function(){
          console.log("error");
        });

      }

  };

});
