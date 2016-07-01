app.controller('ModalRegisterR1', function ($scope,$state,$ionicModal,$timeout) {


  $scope.objR1 = {};

  $scope.currentRol = 'Colaborador';

  $scope.openRegisterR1 = false;
  $scope.openLoginR1 = false;


  function allToFalse(){
    $scope.openRegisterR1 = false;
    $scope.openLoginR1 = false;
  }

  $scope.fopenRegister = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR1 = true;
      $scope.openLoginR1 = false;
    },400);
  }


  $scope.fopenLogin = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR1 = false;
      $scope.openLoginR1 = true;
    },400);
  }


  $scope.saveR1 = function(){
    // Save in server, save in localStorage and then redirect to want help
    // ***
    $scope.closeModalRegisterR1();
    $state.transitionTo("app.wanthelp");
  };



});