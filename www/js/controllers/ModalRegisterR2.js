app.controller('ModalRegisterR2', function ($scope,$state,$ionicModal,$timeout) {


  $scope.objR2 = {};

  $scope.currentRol = 'Necesitado';

  $scope.openRegisterR2 = false;
  $scope.openLoginR2 = false;


  function allToFalse(){
    $scope.openRegisterR2 = false;
    $scope.openLoginR2 = false;
  }

  $scope.fopenRegister = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR2 = true;
      $scope.openLoginR2 = false;
    },400);
  }


  $scope.fopenLogin = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR2 = false;
      $scope.openLoginR2 = true;
    },400);
  }


  $scope.saveR2 = function(){
    // Save in server, save in localStorage and then redirect to want help
    // ***
    $scope.closeModalRegisterR2();
    $state.transitionTo("app.needhelp");
  };



});