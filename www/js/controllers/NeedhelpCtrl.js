app.controller('NeedhelpCtrl', function ($scope, $timeout, $rootScope, $ionicPopup,Typehelps,HelpsSpecialOperations) {

  var currentUserRol2 = "";
  var user2 = "";

  if ($rootScope.isSessionR2) {
    currentUserRol2 = JSON.parse(localStorage.getItem('userrol2'));
    user2 = JSON.parse(localStorage.getItem('r2'));
  }

  $scope.varcontrols = {
    hidden: false
  }

  $scope.help = {
    type_helps_id: 1,
    description: currentUserRol2.history,
    needy_id: currentUserRol2.id
  }


  function msgRequest() {
    var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Solicitud realizada con éxito'
    });
  }

  function getTypehelps(){
    Typehelps.get(function (response)
    {
      $scope.list_type_helps = response.data;
    });
  }

  getTypehelps();

  $scope.fconfirmNeedHelp = function(){    
    $scope.varcontrols.hidden = true;
    var shelp = HelpsSpecialOperations.store($scope.help);
    shelp.then(function(response) {
      msgRequest();
      getHistoRequest();
    });
  }

  function getHistoRequest(){    
    var lashelp = HelpsSpecialOperations.lastHelpsNeedy(currentUserRol2.id);
    lashelp.then(function(response) {
      $scope.histoRequest = response.data.data;
    });
  }

  getHistoRequest();



});