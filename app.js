var todomvc = angular.module('todomvc', ['firebase']);


todomvc.controller('TodoCtrl',function($scope,$firebaseArray){
    var config = {
        apiKey: "AIzaSyCUaEqhVn5VICcY-Eo-QSfkYgAI6Uzu-Z0",
        authDomain: "angularjstodoapp-72911.firebaseapp.com",
        databaseURL: "https://angularjstodoapp-72911.firebaseio.com",
        projectId: "angularjstodoapp-72911",
        storageBucket: "angularjstodoapp-72911.appspot.com",
        messagingSenderId: "259748892014"
      };
    firebase.initializeApp(config);
    var database = firebase.database().ref();
    $scope.todos = $firebaseArray(database);
    $scope.newTodo = '';

    $scope.addTodo =function(){
        var newTodo= $scope.newTodo.trim();
        if(!newTodo.length){
            alert("Enter something..");
        }
        $scope.todos.$add({
            title:newTodo,
            completed:false
        });
    };
    $scope.removeTodo = function(todo){
        $scope.todos.$remove(todo);
    }

});