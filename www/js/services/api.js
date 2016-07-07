app.factory('Users',function($resource,CONFIG){

  return $resource(CONFIG.URLAPI+"/users/:id",
    {
      id:"@_id"
    },
    {
      update:
      {
        method:"PUT",
        params: {id: "@id"}
      }
    });
});


app.factory('Sesion',function($http,$state,$ionicPopup,CONFIG){


  function msgLogout(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Sesión Cerrada con éxito'
    });
  }

  function process(){

    // mirar si hay un token valido actualmente

    // si no hay mirar los datos de sesion en localStorage para tratar de hacer otro token y reasinar variables de sesión.

    // si los datos de sesion no estan o no se puede generar un token
    // con los mismos entonces hay que mostrar el formulario de login
    // registro de algún rol (se podría mostrar un modal indicado que debe iniciar sesión o registrarse)
    // o enviar una bandera para mostrarle un mensaje al usuario
  }

  return {
    login: function(credentials) {
      $http.post(CONFIG.URLAPI + "/login",credentials)
      .success(function (response) {
        localStorage.setItem('jwt',response.data.token.token);
      });
    },
    logout: function(){
      $http.get(CONFIG.URLAPI + "/logout")
      .success(function (response) {
        $rootScope.isSessionR2 = true;
        localStorage.removeItem('r1');
        localStorage.removeItem('r2');
        msgLogout();
        $state.transitionTo("app.welcome");
      });
    },
    initSesion: function(){
      process();
    }

  };

});
