app.controller('ModalRegisterR1', function ($scope,$timeout,$state,$ionicModal,$rootScope,$timeout,$ionicScrollDelegate,$stateParams,$ionicLoading,$ionicPopup,Typeidentifications,Sesion,Validations,anchorSmoothScroll,$location) {


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

  $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');
      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);
  };


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
    $ionicLoading.show();
    $scope.objR1login.rol = 1;
    var regSesion = Sesion.login($scope.objR1login,'r1');
    regSesion.then(function(response) {
      $ionicLoading.hide();
      if(response.data == 'Error Rol'){
        msgErrorRol('Colaborador');
      }else{
        if(response.data.success == false){
          msgIncorrectData();
        }else{
          $scope.closeModalRegisterR1();
          $state.transitionTo(viewdestinyloginRegister);
          // ** Message init sesion
          msgInfoInitSesion();
        }
      }

    });
  }

  function register(){
    $ionicLoading.show();
    var resRegister = Sesion.register($scope.objR1,'r1');
    resRegister.then(function(response) {
      $ionicLoading.hide();
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

  function msgInfoInitSesion(){

   var myPopupInitSesion = $ionicPopup.show({
     template: '<br/><center>Sesión iniciada</center><br/><br/>',
     title: 'Aviso'
   });

   $timeout(function(){
      myPopupInitSesion.close();
   },1250);

  }
  

  function getTypeidentifications(){

    Typeidentifications.get(function (response)
    {
      $scope.list_type_identifications = response.data;
    });

  }


  $scope.textstylephoto1 = "";

  $scope.viewPhoto= function(){
    if($scope.objR1.base64 != null){
      $scope.textstylephoto1 =  "data:"+$scope.objR1.base64.filetype+";base64,"+$scope.objR1.base64.base64;
      $scope.gotoElement('inputphoto1');
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

  function msgErrorRol(namerol){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'Este usuario No esta registrado como '+namerol
    });
  }

  getTypeidentifications();

  $scope.$on('modal.shown', function() {
    $ionicScrollDelegate.scrollTop();
  });

});