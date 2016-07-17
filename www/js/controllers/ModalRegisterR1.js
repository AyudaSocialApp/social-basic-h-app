app.controller('ModalRegisterR1', function ($scope,$state,$ionicModal,$rootScope,$timeout,$ionicScrollDelegate,$stateParams,$ionicPopup,Typeidentifications,Sesion,Validations) {


  $scope.objR1 = {
    privacy: false,
    type_contributors_id: 2,
    name_business: ""
  };

  $scope.objR1login = {};

  $scope.currentRol = 'Colaborador';

  $scope.openRegisterR1 = false;
  $scope.openLoginR1 = false;

  var viewdestinyloginRegister = 'app.lwanthelp';

  if(typeof $stateParams.viewdestinyloginRegister !== 'undefined'){
    if($stateParams.viewdestinyloginRegiste != ''){
      viewdestinyloginRegister = $stateParams.viewdestinyloginRegister;
    }
  }


  function allToFalse(){
    $scope.openRegisterR1 = false;
    $scope.openLoginR1 = false;
  }

  $scope.fopenRegister = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR1 = true;
      $scope.openLoginR1 = false;
      //$ionicScrollDelegate.scrollTo(0, 200);
    },400);
  }


  $scope.fopenLogin = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR1 = false;
      $scope.openLoginR1 = true;
      //$ionicScrollDelegate.scrollTo(0, 200);
    },400);
  }


  function initSesionandcontinue(){

        var regSesion = Sesion.login($scope.objR1login,'r1');
        regSesion.then(function(response) {
          if(response.data.success == false){
            msgIncorrectData();
          }else{
            $scope.closeModalRegisterR1();
            $state.transitionTo(viewdestinyloginRegister);
          }
        });

  }

  function register(){
        var resRegister = Sesion.register($scope.objR1,'r1');
        resRegister.then(function(response) {

          if(response.data.success == false){
            msgIncorrectData();
          }else{
            var localSr1 = JSON.parse(localStorage.getItem('r1'));
            $scope.objR1login = {email:localSr1.email,password:$scope.objR1.password};
            initSesionandcontinue();
          }
        });
  }

  $scope.saveR1 = function(form){

    if(form.$valid){
      if(verifyConfirmPass()){
        var reValidationRepeatUser = Validations.repeatUser($scope.objR1.username);
        reValidationRepeatUser.then(function(response) {
          if(response.data.data.res == true){
            msgValidateRepeatUser();
          }else{
            register();
          }
        });
      }else{
        msgVerifyConfirmPass();
      }
    }else{
      msgInvalidData();
    }

  };


  $scope.loginR1 = function(form){
    if(form.$valid){
      initSesionandcontinue();
    }else{
      msgInvalidData();
    }
  };

  function msgInvalidData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Faltan campos o se han indicado campos erroneos.'
    });
  }

  function msgIncorrectData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'Datos incorrectos. Por favor verifique sus datos y vuelva a intentarlo'
    });
  }

  

  function getTypeidentifications(){

    Typeidentifications.get(function (response)
    {
      $scope.list_type_identifications = response.data;
    });

  }


  $scope.textstylephoto = "";

  $scope.viewPhoto= function(){
    if($scope.objR1.base64 != null){
      $scope.textstylephoto =  "data:"+$scope.objR1.base64.filetype+";base64,"+$scope.objR1.base64.base64;
    }
  }


  function verifyConfirmPass(){
    if($scope.objR1.password == $scope.objR1.confirm){
      return true;
    }else{
      return false;
    }
  }

  function msgVerifyConfirmPass(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'La contraseña y su confirmación no coinciden'
    });
  }


  function msgValidateRepeatUser(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'El usuario indicado no esta disponible, por favor indique otro.'
    });
  }

  getTypeidentifications();

});