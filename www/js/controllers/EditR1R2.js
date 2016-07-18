app.controller('EditR1R2', function ($scope,$ionicModal,$rootScope,$ionicPopup,$ionicScrollDelegate,$timeout) {

  // Bandera para validar elementos de las interfaz
  $scope.isEdit = true;

  $scope.objR1 = {
    names:""
  };
  $scope.objR2 = {
    names:""
  };
  $scope.isTwoRoles = ($rootScope.isSessionR1 && $rootScope.isSessionR2);
  $scope.textstylephoto1 = "";
  $scope.textstylephoto2 = "";

  function fillobjR1(){
    if($rootScope.isSessionR1){
      var currentR1 =  JSON.parse(localStorage.getItem('userrol1'));
      $scope.objR1.names = $rootScope.currentR1.names;
      // *** Resto de campos
      // cargar imagen despues de tener el obj lleno
      $scope.viewPhoto1();
    }
  }

  $scope.viewPhoto1= function(){
    if($scope.objR1.base64 != null){
      $scope.textstylephoto1 =  "data:"+$scope.objR1.base64.filetype+";base64,"+$scope.objR1.base64.base64;
    }
  }

  function fillobjR2(){
    if($rootScope.isSessionR2){
      var currentR2 =  JSON.parse(localStorage.getItem('userrol2'));
      $scope.objR2.names = $rootScope.currentR2.names;
      // *** Resto de campos
      // cargar imagen despues de tener el obj lleno
      $scope.viewPhoto2();
    }
  }

  $scope.viewPhoto2= function(){
    if($scope.objR2.base64 != null){
      $scope.textstylephoto2 =  "data:"+$scope.objR2.base64.filetype+";base64,"+$scope.objR2.base64.base64;
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
    // editar el obj1
    // mostrar mensaje de editado correctamente
    $scope.closemodalEditR1orR2();
  }

  $scope.saveR2 = function(){
    // editar el obj2
    // mostrar mensaje de editado correctamente
    $scope.closemodalEditR1orR2();
  }

});