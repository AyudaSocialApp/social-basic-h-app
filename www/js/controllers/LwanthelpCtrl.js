app.controller('LwanthelpCtrl', function ($scope,$ionicModal) {

  $scope.goWantHelp = function(){
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
    $scope.modalWantHelp.hide();
  };
  // ## 

});