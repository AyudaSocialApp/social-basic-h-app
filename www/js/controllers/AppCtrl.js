app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout,$rootScope) {
    // Form data for the login modal
    $scope.loginData = {};

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        //location.href = 'https://twitter.com/satish_vr2011';
        window.open('https://twitter.com/', '_blank');
    });

    var fab2 = document.getElementById('fab2');
    fab2.addEventListener('click', function () {
        //location.href = 'https://twitter.com/satish_vr2011';
        window.open('https://www.facebook.com/', '_blank');
    });

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">Sobre esto</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       Esta aplicación fue creada por los hermanos Rincón para cambiar el mundo' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

    $rootScope.isSessionR1 = false;
    $rootScope.isSessionR2 = false;

    // init vars localstorage
    if(localStorage.getItem('r1') === null || localStorage.getItem('r1') === ""){
      localStorage.setItem('r1',"");
    }else{
      $rootScope.isSessionR1 = true;
    }

    if(localStorage.getItem('r2') === null  || localStorage.getItem('r1') === ""){
      localStorage.setItem('r2',"");
    }else{
      $rootScope.isSessionR2 = true;
    }
    // end init vars localstorage






  // ## modal del registo o login de colaborador
  $ionicModal.fromTemplateUrl('templates/modals/registerR1.html', {
    scope: $scope
  }).then(function(ModalRegisterR1) {
    $scope.ModalRegisterR1 = ModalRegisterR1;
  });

  function openModalRegisterR1() {
    $scope.objR1 = {};
    $scope.ModalRegisterR1.show();
  }

  $scope.closeModalRegisterR1 = function() {
    $scope.ModalRegisterR1.hide();
  };
  // ## 


  // verifico si existe informacion de login en localstorage
  function processLoginAndRol(rol){
    if(localStorage.getItem('r'+rol) !== null && localStorage.getItem('r'+rol) !== ''){
      return true;
    }
    return false;
  }




  // Si hay sesión siguo para el listado de necesitados
  $scope.processLwanthelp = function(){
    if(!processLoginAndRol(1)){
      openModalRegisterR1();
    }else{
      $state.transitionTo("app.lwanthelp");
    }
  }




});