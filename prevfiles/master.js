"use strict";

/* jshint esversion:6 */

var app = angular.module("MyApp", ["ngRoute"]);

app.controller("masterController", function ($scope, $http, getAllMovies) {

  $scope.allMovies = [];
  getAllMovies.loadMovies().then(function (response) {
    return $scope.allMovies = response.data;
  });
});

app.controller("singleMovie", function ($http, $scope, $routeParams, getAllMovies) {
  $scope.id = $routeParams.id;
  getAllMovies.LoadSingleMovie($scope.id).then(function (response) {
    return $scope.single = response.data;
  });
});

app.service("getAllMovies", function ($http) {
  this.loadMovies = function () {
    return $http.get('http://netflixroulette.net/api/api.php?director=Quentin%20Tarantino');
  };
  this.LoadSingleMovie = function (id) {
    return $http.get("http://netflixroulette.net/api/api.php?title=" + id);
  };
});

//app config
app.config(function ($routeProvider) {

  $routeProvider.when("/allmovies", { templateUrl: "allmovies.html" }).when("/film/:id", { templateUrl: "film.html", controller: "singleMovie" }).when("/about", { templateUrl: "about.html" }).otherwise({
    templateUrl: "start.html"
  });
});