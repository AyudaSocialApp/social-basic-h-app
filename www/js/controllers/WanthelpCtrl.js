app.controller('WanthelpCtrl', function ($scope,$ionicScrollDelegate,$rootScope,$ionicPopup,HelpsSpecialOperations) {

  // mostrar boton de aceptar si es true
  $scope.viewBtnAccept = false;

  // mostrar el boton de informado (cuando se le notifica que han aceptado una ayuda) si es true
  $scope.viewBtnInfo = false;

  // si estoy viendo mis ayudas
  $scope.viewMysHelps = false;

  // si estoy viendo los necesidatos
  $scope.viewinfoNeedy = false;

  $scope.viewInfoAcceptHelp = false;

  $scope.controls = {
    viewhistoryHelpsRequets: false,
    viewlinkHA: false
  }

  function configView(){
    if($scope.ro == 1){
      $scope.viewBtnInfo = false;
      $scope.viewBtnAccept = true;
      $scope.viewMysHelps = false;
    }
    if($scope.ro== 2){
      $scope.viewBtnInfo = true;
      $scope.viewBtnAccept = false;
      $scope.viewMysHelps = false;
    }

    if($scope.myhelps){
      $scope.viewMysHelps = true;
    }

    if($scope.needy){
      $scope.viewBtnInfo = false;
      $scope.viewBtnAccept = false;
      $scope.viewMysHelps = false;
      $scope.viewinfoNeedy = true;
    }

  }

  $scope.fviewHistoryHelpsRequets = function (){
     // Traer historial en este momento (ultimos 3 meses)
     $scope.controls.viewhistoryHelpsRequets = true;
     $scope.controls.viewlinkHA = false;
  }

  $scope.acceptHelp = function(){
    $scope.viewInfoAcceptHelp = true;
    msgAcceptHelp();
  }

  $scope.saveHelp = function(){
    // guardar ayuda en bs

    // muestro la confirmación
    msgResWithContact();
  }


  function msgResWithContact(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Ayuda registrada con éxito. El necesitado debe aceptar la ayuda a traves de la misma app para que el sistema te muestre los datos de contacto.'
    });
  }

  function msgAcceptHelp(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Ayuda aceptada con éxito. Ahora puedes ver el lugar, día y hora que propone el cliente para entregarte la ayuda y así como tu, él también tendrá acceso a tu número celular.'
    });
  }

  function getHistoRequest() {
    var lashelp = HelpsSpecialOperations.lastHelpsNeedy($rootScope.currentHelpDetail.needy.id);
    lashelp.then(function (response) {
      $scope.currenthistoRequest = response.data.data;
    });
  }

  


  $scope.$on('modal.shown', function() {
    configView();
    getHistoRequest();
  });


});