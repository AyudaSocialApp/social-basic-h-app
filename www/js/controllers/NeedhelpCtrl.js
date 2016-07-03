app.controller('NeedhelpCtrl', function ($scope,$timeout,$ionicPopup) {

  $scope.varcontrols  = {
    hidden:false
  }


  function msgRequest(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Solicitud realizada con éxito'
    });
  }


  $scope.fconfirmNeedHelp = function(){

    $scope.varcontrols.hidden = true;
    $timeout(
      function(){
        msgRequest();
      },1200);

  }

});