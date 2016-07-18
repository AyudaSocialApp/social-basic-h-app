app.controller('ModalRegisterR2', function ($scope,$timeout,$state,$rootScope,$ionicLoading,$ionicModal,$timeout,$stateParams,$ionicPopup,$ionicScrollDelegate,Typeidentifications,Sesion,Validations) {


  $scope.objR2 = {
    type_needy_id: 2,
    contributor:""
  };

  $scope.objR2login = {};

  $scope.currentRol = 'Necesitado';

  $scope.openRegisterR2 = false;
  $scope.openLoginR2 = false;

  var viewdestinyloginRegister = "app.needhelp";

  if(typeof $stateParams.viewdestinyloginRegister !== 'undefined'){
    if($stateParams.viewdestinyloginRegiste != ''){
      var viewdestinyloginRegister = $stateParams.viewdestinyloginRegister;
    }
  }


  function allToFalse(){
    $scope.openRegisterR2 = false;
    $scope.openLoginR2 = false;
  }

  $scope.fopenRegister = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR2 = true;
      $scope.openLoginR2 = false;
      //$ionicScrollDelegate.scrollTo(0, 200);
    },400);
  }


  $scope.fopenLogin = function(){
    allToFalse();
    $timeout(function(){
      $scope.openRegisterR2 = false;
      $scope.openLoginR2 = true;
      //$ionicScrollDelegate.scrollTo(0, 200);
    },400);
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

  function initSesionandcontinue(){
        $ionicLoading.show();
        $scope.objR2login.rol = 2;
        var resSesion = Sesion.login($scope.objR2login,'r2');
        resSesion.then(function(response) {
          $ionicLoading.hide();
          if(response.data.success == false){
            msgIncorrectData();
          }else{
            $scope.closeModalRegisterR2();
            $state.transitionTo(viewdestinyloginRegister);
            msgInfoInitSesion();
          }
        });

  }

  $scope.saveR2 = function(form){

    if(form.$valid){
      if(verifyConfirmPass()){
        var reValidationRepeatUser = Validations.repeatUser($scope.objR2.username);
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


  function register(){
    $ionicLoading.show();
    var resRegister = Sesion.register($scope.objR2,'r2');
    resRegister.then(function(response) {
      $ionicLoading.hide();
      if(response.data.success == false){
        msgIncorrectData();
      }else{
        var localSr2= JSON.parse(localStorage.getItem('r2'));
        $scope.objR2login = {email:localSr2.email,password:$scope.objR2.password};
        initSesionandcontinue();
      }
    });
  }



  $scope.loginR2 = function(form){
    if(form.$valid){
      initSesionandcontinue();
    }else{
      msgInvalidData();
    }
  };


  function msgInvalidData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Faltan campos o se han indicado campos erroneos'
    });
  }

  function msgIncorrectData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'Datos incorrectos. Por favor verifique sus datos y vuelva a intentarlo'
    });
  }


  $scope.$on('modal.shown', function() {
    console.log('isSessionR2: '+$scope.isSessionR2);
  });


  function getTypeidentifications(){

    Typeidentifications.get(function (response)
    {
      $scope.list_type_identifications = response.data;
    });

  }

  $scope.textstylephoto2 = "";

  $scope.viewPhoto= function(){
    if($scope.objR2.base64 != null){
      $scope.textstylephoto2 =  "data:"+$scope.objR2.base64.filetype+";base64,"+$scope.objR2.base64.base64;
    }
  }


  function verifyConfirmPass(){
    if($scope.objR2.password == $scope.objR2.confirm){
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