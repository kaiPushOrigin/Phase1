


var SMUnity = angular.module('SMUnity', []);

SMUnity.config(function ($locationProvider){
	$locationProvider.html5Mode(true).hashPrefix('!');
});

SMUnity.controller('courseCtrl', ['$scope', '$location', '$http', function ($scope, $location,$http){
	var query = "?A=" + $location.search().A;
	//console.log($location.search().A)
	$http({
        url: "http://localhost:3000/api/users/" + query,
        method: "GET",
    })
    .success(function(data){
        console.log("SUCCESS");
        $scope.courses = data[0].courses;
        //console.log($scope.courses);
    }).error(function() {
        console.log("FAIL");
        $scope.courses = [
		{code:'CSCI 2341' , prof:'Dr. Porter Scobey' }
		];
	});
}]);
