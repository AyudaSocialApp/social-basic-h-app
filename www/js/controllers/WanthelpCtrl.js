app.controller('WanthelpCtrl', function ($scope, $ionicLoading,$ionicScrollDelegate, $state,$rootScope, $ionicPopup, Typehelps, HelpsSpecialOperations, ContributorsSpecialOperations, NeediesSpecialOperations) {

  // mostrar boton de aceptar si es true
  $scope.viewBtnAccept = false;

  // mostrar el boton de informado (cuando se le notifica que han aceptado una ayuda) si es true
  $scope.viewBtnInfo = false;

  // si estoy viendo mis ayudas
  $scope.viewMysHelps = false;

  // si estoy viendo los necesidatos
  $scope.viewinfoNeedy = false;

  $scope.currentImageNeedy = "";

  $scope.currentImageContributor = "";

  $scope.sending = false;

  $scope.viewInfoAcceptHelp = false;

  $scope.controls = {
    viewhistoryHelpsRequets: false,
    viewlinkHA: true
  }


  $scope.obj = {
    id_help: "",
    id_contributor: ""
  }

  $scope.objaccept = {
    id_help: "",
    accepted: ""
  }

  var currentUserRol1 = "";

  try {
    if ($rootScope.isSessionR1) {
      currentUserRol1 = JSON.parse(localStorage.getItem('userrol1'));
    }
  } catch (error) { }


  function fillCurrentObj() {
    $scope.obj.id_help = $rootScope.currentHelpDetail.id;
    $scope.obj.id_contributor = currentUserRol1.id;
    $scope.objaccept.accepted = true;
    $scope.obj.type_helps_id = {id:$rootScope.currentHelpDetail.type_helps_id};
    $scope.objaccept.id_help = $rootScope.currentHelpDetail.id;
    $scope.viewInfoAcceptHelp = $rootScope.currentHelpDetail.accepted;
  }

  function configView() {

    if ($scope.ro == 1) {
      $scope.viewBtnInfo = false;
      $scope.viewBtnAccept = true;
      $scope.viewMysHelps = false;
    }
    if ($scope.ro == 2) {
      $scope.viewBtnInfo = true;
      $scope.viewBtnAccept = false;
      $scope.viewMysHelps = false;
    }

    if ($scope.myhelps) {
      $scope.viewMysHelps = true;
    }

    if ($scope.needy) {
      $scope.viewBtnInfo = false;
      $scope.viewBtnAccept = false;
      $scope.viewMysHelps = false;
      $scope.viewinfoNeedy = true;
    }

  }

  $scope.fviewHistoryHelpsRequets = function () {
    // Traer historial en este momento (ultimos 3 meses)
    $scope.controls.viewhistoryHelpsRequets = true;
    $scope.controls.viewlinkHA = false;
  }

  $scope.acceptHelp = function () {
    $ionicLoading.show();
    var req = HelpsSpecialOperations.registerHelpAccepted($scope.objaccept);
    req.then(function (response) {
      $ionicLoading.hide();
      $scope.viewInfoAcceptHelp = true;
      msgAcceptHelp();
    });

  }

  $scope.saveHelp = function (form) {
    $ionicLoading.show();
    // guardar ayuda en bs
    if (form.$valid) {
      $ionicLoading.hide();
      $scope.sending = true;

      var req = HelpsSpecialOperations.registerHelpContributor($scope.obj);
      req.then(function (response) {
        msgResWithContact();
        $scope.getNeedies();
        $scope.modalWantHelp.hide();
      });

    } else {
      msgInvalidData();
    }

  }

  $scope.getNeedies = function(){
    $ionicLoading.show();
    var hso = HelpsSpecialOperations.needies(1000);
    hso.then(function(response) {
      $ionicLoading.hide();
      $scope.list = response.data.data;
    });
  }

  function msgInvalidData() {
    var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Faltan campos o se han indicado campos erroneos.'
    });
  }


  function msgResWithContact() {
    var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Ayuda registrada con éxito. Cuando el necesitado acepte la ayuda, el sistema te avisará y podras ver el telefono de contacto'
    });
  }

  function msgAcceptHelp() {
    var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Ayuda aceptada con éxito. Ahora puedes ver el lugar, día y hora que propone el cliente para entregarte la ayuda y así como tu, él también tendrá acceso a tu número celular.'
    });
  }
  

  function getHistoRequest() {

    if(typeof $rootScope.currentHelpDetail.needy !== 'undefined'){
      var lashelp = HelpsSpecialOperations.lastHelpsNeedy($rootScope.currentHelpDetail.needy.id);
      lashelp.then(function (response) {
        $scope.currenthistoRequest = response.data.data;
      });
    }

  }


  function getBigImageNeedy(idneedy) {
    $scope.currentImageNeedy = "";
    var req = NeediesSpecialOperations.getBigImage(idneedy);
    req.then(function (response) {
      $scope.currentImageNeedy = 'data:' + $rootScope.currentHelpDetail.needy.filetype + ";base64," + response.data.data;
    });
  }

  function getBigImageContributor(idcontributor) {
    $scope.currentImageNeedy = "";
    var req = ContributorsSpecialOperations.getBigImage(idcontributor);
    req.then(function (response) {
      $scope.currentImageContributor = 'data:' + $rootScope.currentHelpDetail.contributor.filetype + ";base64," + response.data.data;
    });
  }



  function getTypehelps() {
    Typehelps.get(function (response) {
      $scope.list_type_helps = response.data;
    });
  }

  getTypehelps();

  $scope.$on('modal.shown', function () {

    configView();
    fillCurrentObj();
    $scope.sending = false;
    getHistoRequest();
    if(typeof $rootScope.currentHelpDetail.needy !== 'undefined' ){
      getBigImageNeedy($rootScope.currentHelpDetail.needy.id);
    }

    if(typeof $rootScope.currentHelpDetail.contributor !== 'undefined'){
      getBigImageContributor($rootScope.currentHelpDetail.contributor.id);
    }

  });


  $scope.$on('modal.hidden', function () {

    $state.go($state.current, {}, {reload: true});

  });




});