app.controller('MyhelpsCtrl', function ($scope,$ionicModal,$ionicScrollDelegate,$timeout) {

  $scope.ro = "";
  $scope.myhelps = true;

  $scope.goWantHelp = function(ro){
    $scope.ro = ro;
    openmodalWantHelp();
  };

  // ## modal del registo o login de colaborador
  $ionicModal.fromTemplateUrl('templates/modals/wanthelp.html', {
    scope: $scope,
    focusFirstInput: true
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


});