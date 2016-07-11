app.controller('ModalRegisterR1', function ($scope,$state,$ionicModal,$rootScope,$timeout,$ionicScrollDelegate,$stateParams,$ionicPopup,Typeidentifications,Sesion) {


  $scope.objR1 = {
    privacy: false,
    type_contributors_id: 2
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
            $scope.objR1login({email:localSr1.email,password:$scope.objR1.password});
            initSesionandcontinue();
          }
        });
  }

  $scope.saveR1 = function(form){
    // Save in server, save in localStorage and then redirect to want help
    // ***
    if(form.$valid){
      register();
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

  getTypeidentifications();

});