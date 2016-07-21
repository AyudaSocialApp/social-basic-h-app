app.controller('EditR1R2', function ($scope,$timeout,$state,$ionicModal,$rootScope,$ionicScrollDelegate,$stateParams,$ionicLoading,$ionicPopup,Typeidentifications,Sesion,Validations,anchorSmoothScroll,$location) {

  // Bandera para validar elementos de las interfaz
  $scope.isEdit = true;

  $scope.objR1 = {
    id_user:"",
    id_user_rol:"",
    password:"",
    names:"",
    last_names:"",
    privacy:"",
    nit_id:"",
    type_identifications_id:{id:""},
    type_contributors_id:{id:""},
    cellphone_telephone_contact:"",
    name_business:"",
    base64:{base64:"",filetype:""}
  };

  $scope.objR2 = {
    id_user:"",
    id_user_rol:"",
    password:"",
    names:"",
    last_names:"",
    type_identifications_id:{id:""},
    identification:"",
    history:"",
    contributor:"",
    cellphone_telephone_contact:"",
    city:"",
    base64:{base64:"",filetype:""},
    type_needy_id:""
  };

  var currentUserRol1 = "";
  var currentUserRol2 = "";
  var user1 = "";
  var user2 = "";


  function init(){

    if($rootScope.isSessionR1){
      currentUserRol1 = JSON.parse(localStorage.getItem('userrol1'));
      user1 = JSON.parse(localStorage.getItem('r1'));
    }
    if($rootScope.isSessionR2){
      currentUserRol2 = JSON.parse(localStorage.getItem('userrol2'));
      user2 = JSON.parse(localStorage.getItem('r2'));
    }

    $scope.isTwoRoles = ($rootScope.isSessionR1 && $rootScope.isSessionR2);
    $scope.textstylephoto1 = "";
    $scope.textstylephoto2 = "";
  }

  init();

  $scope.gotoElement = function (eID){
    if(!$scope.isEdit){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);
    }
  };


  function fillobjR1(){
    if($rootScope.isSessionR1){
      $scope.objR1.id_user = user1.id;
      $scope.objR1.id_user_rol = currentUserRol1.id;
      $scope.objR1.username =  user1.email;
      $scope.objR1.names = currentUserRol1.names;
      $scope.objR1.last_names = currentUserRol1.last_names;
      $scope.objR1.privacy = currentUserRol1.privacy;
      $scope.objR1.type_identifications_id = {id:currentUserRol1.type_identifications_id};

      $scope.objR1.nit_id = currentUserRol1.nit_id;
      $scope.objR1.type_contributors_id = currentUserRol1.type_contributors_id;
      $scope.objR1.cellphone_telephone_contact = currentUserRol1.cellphone_telephone_contact;
      $scope.objR1.name_business = currentUserRol1.name_business;

      // Objeto foto
      $scope.objR1.base64 = {base64:currentUserRol1.base64,filetype:currentUserRol1.filetype};
      // Mostrar foto actual
      $scope.viewPhoto1();
    }
  }

  $scope.viewPhoto1= function(){
    if($scope.objR1.base64 != null){
      $scope.textstylephoto1 =  "data:"+$scope.objR1.base64.filetype+";base64,"+$scope.objR1.base64.base64;
      $scope.gotoElement('inputphoto1');
    }
  }

  function fillobjR2(){
    if($rootScope.isSessionR2){

      $scope.objR2.id_user = user2.id;
      $scope.objR2.id_user_rol = currentUserRol2.id;
      $scope.objR2.username =  user2.email;
      $scope.objR2.names = currentUserRol2.names;
      $scope.objR2.last_names = currentUserRol2.last_names;
      $scope.objR2.identification = currentUserRol2.identification;
      $scope.objR2.type_identifications_id = {id:currentUserRol2.type_identifications_id};

      $scope.objR2.history = currentUserRol2.history;
      $scope.objR2.contributor = currentUserRol2.contributor;
      $scope.objR2.cellphone_telephone_contact = currentUserRol2.cellphone_telephone_contact;
      $scope.objR2.city = currentUserRol2.city;
      $scope.objR2.type_needy_id = currentUserRol2.type_needy_id;
      // objeto foto
      $scope.objR2.base64 = {base64:currentUserRol2.base64,filetype:currentUserRol2.filetype};
      // Mostrar foto actual
      $scope.viewPhoto2();
    }
  }

  $scope.viewPhoto2= function(){
    if($scope.objR2.base64 != null){
      $scope.textstylephoto2 =  "data:"+$scope.objR2.base64.filetype+";base64,"+$scope.objR2.base64.base64;
      $scope.gotoElement('inputphoto2');
    }
  }


  $scope.fEditNeedy = function(){
    $scope.openRegisterR1 = false;
    $scope.openRegisterR2 = true;
  }

  $scope.fEditContributor = function(){
    $scope.openRegisterR1 = true;
    $scope.openRegisterR2 = false;
  }

  function determineEditNeedy(){
    if(!$rootScope.isSessionR1 && $rootScope.isSessionR2){
      $scope.fEditNeedy();
    }
  }
  function determineEditContributor(){
    if(!$rootScope.isSessionR2 && $rootScope.isSessionR1){
      $scope.fEditContributor();
    }
  }

  function determiteInitShow(){
    if($scope.isTwoRoles){
    $scope.openRegisterR1 = false;
    $scope.openRegisterR2 = false;
    }
    determineEditNeedy();
    determineEditContributor();
  }


  fillobjR1();
  fillobjR2();

  // Si solo hay un rol activo de mostra ese formulario automaticamente y se esconde los botones de selección
  // Si estan los dos roles en ronces se muestran los botones de seleccion y se ocultan ambos ambos formularios
  determiteInitShow();

  // Despues de editar solo se muestra un mensaje de editado con exito
  $scope.saveR1 = function(){
    $ionicLoading.show();
    var editSe = Sesion.editRegister($scope.objR1,'r1');
    editSe.then(function(response) {
      $ionicLoading.hide();
      msgSuccessEdit();
      $scope.closemodalEditR1orR2();
    });
  }


  $scope.saveR2 = function(){
    $ionicLoading.show();
    var editSe = Sesion.editRegister($scope.objR2,'r2');
    editSe.then(function(response) {
      $ionicLoading.hide();
      msgSuccessEdit();
      $scope.closemodalEditR1orR2();
    });
  }

  function msgSuccessEdit(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Datos Actualizados correctamente'
    });
  }



  function verifyConfirmPass(){
    if($scope.objR1.password == $scope.objR1.confirm){
      return true;
    }else{
      return false;
    }
  }

  function msgVerifyConfirmPass(){
      var alertPopup = $ionicPopup.alert({
      title: 'Alerta',
      template: 'La contraseña y su confirmación no coinciden'
    });
  }

  function getTypeidentifications(){

    Typeidentifications.get(function (response)
    {
      $scope.list_type_identifications = response.data;
    });

  }

  getTypeidentifications();

  $scope.$on('modal.shown', function() {
    $ionicScrollDelegate.scrollTop();
    init();
    determiteInitShow();
    fillobjR1();
    fillobjR2();
  });


});