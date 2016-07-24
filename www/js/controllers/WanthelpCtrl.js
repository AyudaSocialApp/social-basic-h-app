app.controller('WanthelpCtrl', function ($scope,$ionicScrollDelegate,$rootScope,$ionicPopup,Typehelps,HelpsSpecialOperations,ContributorsSpecialOperations,NeediesSpecialOperations) {

  // mostrar boton de aceptar si es true
  $scope.viewBtnAccept = false;

  // mostrar el boton de informado (cuando se le notifica que han aceptado una ayuda) si es true
  $scope.viewBtnInfo = false;

  // si estoy viendo mis ayudas
  $scope.viewMysHelps = false;

  // si estoy viendo los necesidatos
  $scope.viewinfoNeedy = false;

  $scope.currentImageNeedy = "";

  $scope.sending = false;

  $scope.viewInfoAcceptHelp = false;

  $scope.controls = {
    viewhistoryHelpsRequets: false,
    viewlinkHA: true
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

  $scope.saveHelp = function(form){
    // guardar ayuda en bs
    if(form.$valid){
      $scope.sending = true; 
      // pending service
      msgResWithContact();
      $scope.modalWantHelp.hide();
    }else{
      msgInvalidData();
    }
    
  }

  function msgInvalidData(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Faltan campos o se han indicado campos erroneos.'
    });
  }


  function msgResWithContact(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Ayuda registrada con éxito. Cuando el necesitado acepte la ayuda, el sistema te avisará y podras ver el telefono de contacto'
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


  function getBigImageNeedy(idneedy) {
    $scope.currentImageNeedy = "";
    var req = NeediesSpecialOperations.getBigImage(idneedy);
    req.then(function (response) {
      $scope.currentImageNeedy = 'data:'+$rootScope.currentHelpDetail.needy.filetype+";base64,"+response.data.data;
    });
  }
  


  function getTypehelps(){
    Typehelps.get(function (response)
    {
      $scope.list_type_helps = response.data;
    });
  }

  getTypehelps();


  $scope.$on('modal.shown', function() {
    configView();
    getHistoRequest();
    getBigImageNeedy($rootScope.currentHelpDetail.needy.id);
  });


});