app.controller('WelcomeCtrl', function ($scope,$state,$ionicModal) {


  $scope.objR1 = {};
  $scope.objR2 = {};

  $scope.openRegisterR1 = false;
  $scope.openLoginR1 = false;

  $scope.goNeedHelp = function(){
    processNeedhelp();
  }

  $scope.goWanthelp = function(){
    processWanthelp();
  }



  $scope.fopenRegisterR1 = function(){
    $scope.openRegisterR1 = true;
    $scope.openLoginR1 = false;
  }


  $scope.fopenLoginR1 = function(){
    $scope.openRegisterR1 = false;
    $scope.openLoginR1 = true;
  }


  $ionicModal.fromTemplateUrl('templates/modals/registerR1.html', {
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(ModalRegisterR1) {
    $scope.ModalRegisterR1 = ModalRegisterR1;
  });

  function openModalRegisterR1() {
    $scope.objR1 = {};
    $scope.ModalRegisterR1.show();
  }

  $scope.closeModalRegisterR1 = function() {
    $scope.ModalRegisterR1.hide();
  };

  $scope.saveR1 = function(){
    // Save in server, save in localStorage and then redirect to want help
    // ***
    // $state.transitionTo("app.wanthelp");
  };




  $ionicModal.fromTemplateUrl('templates/modals/registerR2.html', {
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(ModalRegisterR2) {
    $scope.ModalRegisterR2 = ModalRegisterR2;
  });

  function openModalRegisterR2() {
    $scope.objR2 = {};
    $scope.ModalRegisterR2.show();
  }

  $scope.closeModalRegisterR2 = function() {
    $scope.ModalRegisterR2.hide();
  };

  $scope.saveR2 = function(){
    // Save in server, save in localStorage and then redirect to want help
    // ***
    // $state.transitionTo("app.needhelp");
  };







  function processLoginAndRol(rol){

    if(localStorage.getItem('r'+rol) !== null && localStorage.getItem('r'+rol) !== ''){
      return true;
    }
    return false;
  }

  function processWanthelp(){
    if(!processLoginAndRol(1)){
      openModalRegisterR1();
    }else{
      $state.transitionTo("app.wanthelp");
    }
  }

  function processNeedhelp(){
    if(!processLoginAndRol(2)){
      openModalRegisterR2();
    }else{
      $state.transitionTo("app.needhelp");
    }
  }



});