app.controller('AboutthisCtrl', function ($scope,$ionicPopup,$ionicLoading,Ideas) {

  $scope.viewFields = false;

  $scope.obj = {
    content:"",
    users_id:""
  }

  // verifico si existe informacion de login en localstorage
  function processLoginAndRol(rol){
    if(localStorage.getItem('r'+rol) !== null && localStorage.getItem('r'+rol) !== ''){
      
      try {
        $scope.obj.users_id = JSON.parse(localStorage.getItem('r'+rol)).id;
      } catch(e) {
        console.log(e);
      }
      
      return true;
    }
    return false;
  }

  $scope.fViewFields = function(){
    $scope.viewFields = true;
  }

  $scope.send = function(form){

    if(form.$valid){
      if(processLoginAndRol(1) || processLoginAndRol(2)){
        $ionicLoading.show();
        Ideas.save($scope.obj,function (response) {
          $ionicLoading.hide();
          $scope.list_type_helps = response.data;
          $scope.obj.content="";
          msgSuccessData();
        });
      }else{
        msgIncorrectSesion();
      }
    }else{
      msgIncorrectData();
    }
  }


  function msgSuccessData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'Aporte enviado con éxito. Gracias !!'
    });
  }


  function msgIncorrectData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'Debe indicar un contenido'
    });
  }

  function msgIncorrectSesion(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'Debe iniciar sesión como necesitado o colaborador'
    });
  }


});