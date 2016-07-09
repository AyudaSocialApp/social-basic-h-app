app.controller('ModalRegisterR2', function ($scope,$state,$ionicModal,$timeout,$ionicScrollDelegate,Sesion) {


  $scope.objR2 = {
    type_needy_id: 2
  };

  $scope.objR2login = {};

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


  $scope.saveR2 = function(){
    // Save in server, save in localStorage and then redirect to want help
    // ***
    $scope.closeModalRegisterR2();
    $state.transitionTo("app.needhelp");
  };


  $scope.loginR2 = function(form){
    if(form.$valid){
        var resSesion = Sesion.login($scope.objR2login,'r2');
        resSesion.then(function(response) {
          if(response.data.success == false){
            msgIncorrectLoginData();
          }else{
            $scope.closeModalRegisterR2();
            $state.transitionTo("app.needhelp");
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


  $scope.$on('modal.shown', function() {
    console.log('isSessionR2: '+$scope.isSessionR2);
  });


});