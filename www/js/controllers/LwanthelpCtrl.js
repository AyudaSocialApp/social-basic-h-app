app.controller('LwanthelpCtrl', function ($scope,$rootScope,$ionicModal,$ionicLoading,$ionicScrollDelegate,$timeout,HelpsSpecialOperations) {

  $scope.ro = "";
  $scope.myhelps = false;
  $scope.needy = true;

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

  function getNeedies(){
    $ionicLoading.show();
    var hso = HelpsSpecialOperations.needies(10);
    hso.then(function(response) {
      $ionicLoading.hide();
      $scope.list = response.data.data;
    });
  }

  getNeedies();


});