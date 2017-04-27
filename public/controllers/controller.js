var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
function($scope, $http) {

  var refresh = function(){
		console.log("Message from console");
		$http.get('/todolist').then(function(response){
			console.log("Got data!");
			$scope.todolist = response.data;
		});
	};

	refresh();

  $scope.addTodo = function(){
    console.log($scope.todo);
    $http.post('/todolist', $scope.todo).then(function(response){
			console.log(response);
			refresh();
		});
  };

  $scope.remove = function(id){
    console.log(id);
    $http.delete('/todolist/' + id).then(function(response){
      refresh();
    });
  };

  $scope.edit = function(id){
		console.log(id);
		$http.get('/todolist/' + id).then(function(response){
			$scope.todo = response.data;
		});
	};

  $scope.update = function(){
		console.log($scope.todo._id);
		$http.put('/todolist/' + $scope.todo._id, $scope.todo).then(function(response){
			refresh();
		});
	};

  $scope.deselect = function(){
		$scope.todo = "";
    location.reload(true);
	};


  $scope.updateComplete = function(){
    console.log($scope.todo._id);
    $http.put('/todolist/' + $scope.todo._id, $scope.todo).then(function(response){
      refresh();
    });
  };

  $scope.complete = function(id){
    console.log(id);
    $http.get('/todolist/' + id).then(function(response){
      $scope.todo = response.data;
      updateComplete();
    });
  };


}]);
