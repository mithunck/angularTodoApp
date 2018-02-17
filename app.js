var todomvc = angular.module('todomvc', ['firebase','ngRoute']);

todomvc.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path("/home");
      }
    });
    var config = {
        apiKey: "AIzaSyCUaEqhVn5VICcY-Eo-QSfkYgAI6Uzu-Z0",
        authDomain: "angularjstodoapp-72911.firebaseapp.com",
        databaseURL: "https://angularjstodoapp-72911.firebaseio.com",
        projectId: "angularjstodoapp-72911",
        storageBucket: "angularjstodoapp-72911.appspot.com",
        messagingSenderId: "259748892014"
      };
   firebase.initializeApp(config);
  });
  
  todomvc.config(function($routeProvider) {
    $routeProvider.when("/home", {
      controller: "HomeCtrl",
      templateUrl: "views/home.html"

    }).when("/mytodos", {
      controller: "todosCtrl",
      templateUrl: "views/mytodos.html",
      resolve: {
        // controller will not be loaded until $requireSignIn resolves
        "currentAuth": ["Auth", function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $routeChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
    }) .otherwise({
        redirectTo: '/home'
     });
  });
  
  todomvc.controller("HomeCtrl", function($scope,$location,Auth) {

    $scope.signIn = function() {
      $scope.loginError=null;
      Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
        console.log($scope.email)
        $location.path("/mytodos");
      }).catch(function(error) {
        console.error("Authentication failed:", error);
        if(error.code=="auth/user-not-found"){
        $scope.loginError="User not found";
        }
        else{
          $scope.loginError="Wrong password";
        }
      });
    };
    $scope.signUp= function(){
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          $scope.error = error;
        });
    };

    $scope.resetPassword = function(){
      Auth.$sendPasswordResetEmail($scope.email).then(function() {
        $scope.loginError="Password reset email sent.";
      }).catch(function(error) {
        // An error happened.
      });
    };


  });
  
  todomvc.controller("todosCtrl", function($scope,$firebaseArray,currentAuth) {
    var currentDate= function(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime;
    }
    var user =currentAuth.uid;
    var database = firebase.database().ref('users/'+user);
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
  
   todomvc.factory("Auth", function($firebaseAuth) {
      return $firebaseAuth();
    }
   );

