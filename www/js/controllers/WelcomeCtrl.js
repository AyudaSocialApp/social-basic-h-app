app.controller('WelcomeCtrl', function ($scope,$state,$ionicModal,$timeout,$stateParams,$rootScope,Sesion) {


  $scope.goNeedHelp = function(){
    processNeedhelp();
  }

  $scope.goLwanthelp = function(){
    processLwanthelp();
  }
  $rootScope.viewdestinyloginRegister = '';

  if(typeof $stateParams.viewdestinyloginRegister !== 'undefined'){
    $rootScope.viewdestinyloginRegister = $stateParams.viewdestinyloginRegister;
  }

  // ## modal del registo o login de colaborador
  $ionicModal.fromTemplateUrl('templates/modals/registerR1.html', {
    scope: $scope
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
  // ## 


  // ## modal del registro o  login del necesitado
  $ionicModal.fromTemplateUrl('templates/modals/registerR2.html', {
    scope: $scope
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

  // ##


  // verifico si existe informacion de login en localstorage
  function processLoginAndRol(rol){
    if(localStorage.getItem('r'+rol) !== null && localStorage.getItem('r'+rol) !== ''){
      return true;
    }
    return false;
  }

  // Si hay sesión siguo para el listado de necesitados
  function processLwanthelp(){
    if(!processLoginAndRol(1)){
      openModalRegisterR1();
    }else{
      $state.transitionTo("app.lwanthelp");
    }
  }

  // Si hay sesión siguo para el formulario de necesito ayuda
  function processNeedhelp(){
    if(!processLoginAndRol(2)){
      openModalRegisterR2();
    }else{
      $state.transitionTo("app.needhelp");
    }
  }


  if(typeof $rootScope.nameusersesionr1 === 'undefined'){
    $rootScope.nameusersesionr1 = '';
  }

  if(typeof $rootScope.nameusersesionr2 === 'undefined'){
    $rootScope.nameusersesionr2 = '';
  }


  if(localStorage.getItem('r1') !== null && localStorage.getItem('r1') !== ""){
    $rootScope.nameusersesionr1 = JSON.parse(localStorage.getItem('r1')).email;
  }

  if(localStorage.getItem('r2') !== null && localStorage.getItem('r2') !== ""){
    $rootScope.nameusersesionr2 = JSON.parse(localStorage.getItem('r2')).email;
  }


});