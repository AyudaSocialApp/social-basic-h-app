app.controller('ModalRegisterR2', function ($scope,$state,$rootScope,$ionicModal,$timeout,$stateParams,$ionicScrollDelegate,Typeidentifications,Sesion) {


  $scope.objR2 = {
    type_needy_id: 2
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


  function initSesionandcontinue(){

        var resSesion = Sesion.login($scope.objR2login,'r2');
        resSesion.then(function(response) {
          if(response.data.success == false){
            msgIncorrectData();
          }else{
            $scope.closeModalRegisterR2();
            $state.transitionTo(viewdestinyloginRegister);
          }
        });

  }

  $scope.saveR2 = function(form){
    if(form.$valid){
      register();
    }else{
      msgInvalidData();
    }

  };


  function register(){
    var resRegister = Sesion.register($scope.objR2,'r2');
    resRegister.then(function(response) {

      if(response.data.success == false){
        msgIncorrectData();
      }else{
        var localSr2= JSON.parse(localStorage.getItem('r2'));
        $scope.objR2login({email:localSr2.email,password:$scope.objR2.password});
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

  getTypeidentifications();

});