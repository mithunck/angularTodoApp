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
    var currentDate= function(){
             var today = new Date();
             var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
             var dateTime = date+' '+time;
             return dateTime;
    }


    $scope.todos = $firebaseArray(database);
    $scope.newTodo = '';

    $scope.addTodo =function(){
        var newTodo= $scope.newTodo.trim();
        if(!newTodo.length){
            alert("Enter something..");
        }
        $scope.todos.$add({
            title:newTodo,
            completed:false,
            dateTime:currentDate(),
        });
    };
    $scope.removeTodo = function(todo){
        $scope.todos.$remove(todo);
    }

});