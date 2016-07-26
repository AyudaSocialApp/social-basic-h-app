app.controller('LwanthelpCtrl', function ($scope,$ionicPopup,$rootScope,$ionicModal,$ionicLoading,$ionicScrollDelegate,$timeout,HelpsSpecialOperations) {

  $scope.ro = "";
  $scope.myhelps = false;
  $scope.needy = true;
  $scope.maxId = "-";
  $scope.list = "";


  $scope.goWantHelp = function(ro,help){
    $scope.ro = ro;
    $rootScope.currentHelpDetail = help;
    openmodalWantHelp();
  };


  // ## modal del registo o login de colaborador
  $ionicModal.fromTemplateUrl('templates/modals/wanthelp.html', {
    scope: $scope
  }).then(function(modalWantHelp) {
    $scope.modalWantHelp = modalWantHelp;
  });

  function openmodalWantHelp() {
    $scope.modalWantHelp.show();
  }

  $scope.closemodalWantHelp = function() {
    $ionicScrollDelegate.scrollTop();
    $timeout(
      function(){
        $scope.modalWantHelp.hide();
      },250);
    
  };
  // ## 

  $scope.getNeedies = function(){
    if($scope.maxId < 1){
      forMomentNotMoreNedies();
    }else{
      $ionicLoading.show();
      var hso = HelpsSpecialOperations.needies($scope.maxId);
      hso.then(function(response) {
        $ionicLoading.hide();
        mixArrays(response.data.data.list);
        $scope.maxId = response.data.data.maxId;
      });
    }
  }

  function forMomentNotMoreNedies() {
    var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'En el momento No hay (mas) solicitudes de ayuda'
    });
  }

  function mixArrays(data) {
      if ($scope.list != "") {
          $scope.list = $scope.list.concat(data);
      }else{
        $scope.list = data;
      }
  }

  $scope.getNeedies();


});