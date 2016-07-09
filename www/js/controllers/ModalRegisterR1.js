app.controller('ModalRegisterR1', function ($scope,$state,$ionicModal,$timeout,$ionicScrollDelegate,$ionicPopup,Sesion) {


  $scope.objR1 = {
    privacy: false,
    type_contributors_id: 2
  };

  $scope.objR1login = {};

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


  $scope.saveR1 = function(){
    // Save in server, save in localStorage and then redirect to want help
    // ***
    $scope.closeModalRegisterR1();
    $state.transitionTo("app.lwanthelp");
  };


  $scope.loginR1 = function(form){
    if(form.$valid){
        var resSesion = Sesion.login($scope.objR1login,'r1');
        resSesion.then(function(response) {
          if(response.data.success == false){
            msgIncorrectLoginData();
          }else{
            $scope.closeModalRegisterR1();
            $state.transitionTo("app.lwanthelp");
          }
        });

    }else{
      msgInvalidLoginData();
    }
  };

  function msgInvalidLoginData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Faltan campos o se han indicado campos erroneos, como el correo'
    });
  }

  function msgIncorrectLoginData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'Datos de acceso incorrectos. Por favor verifique sus datos y vuelva a intentarlo'
    });
  }

});