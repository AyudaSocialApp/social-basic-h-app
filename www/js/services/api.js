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

app.factory('Helps',function($resource,CONFIG){

  return $resource(CONFIG.URLAPI+"/helps/:id",
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


app.factory('Typeidentifications',function($resource,CONFIG){

  return $resource(CONFIG.URLAPI+"/typeidentifications/:id",
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


app.factory('Validations',function($http,CONFIG){
  return {
    repeatUser: function(user) {
      return $http.get(CONFIG.URLAPI + "/validate_user/"+user)
      .success(function (response) {
          return response;
      });
    }
  };
});


app.factory('Sesion',function($http,$state,$ionicPopup,$rootScope,CONFIG){


  function msgLogout(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Sesión Cerrada con éxito'
    });
  }


  return {

    register: function(credentials,rol) {
      var onlyNum = rol.substr(rol.length - 1);
      return $http.post(CONFIG.URLAPI + "/register/"+onlyNum,credentials)
      .success(function (response) {
          if(response.success != false){
            if(rol == 'r1'){
              $rootScope.isSessionR1 = true;
              localStorage.setItem('r1',JSON.stringify(response.data.user));
            }
            if(rol == 'r2'){
              $rootScope.isSessionR2 = true;
              localStorage.setItem('r2',JSON.stringify(response.data.user));
            }
          }
          return response;
      });
    },

    login: function(credentials,rol) {
      return $http.post(CONFIG.URLAPI + "/login",credentials)
      .success(function (response) {

          if(response.success != false){
            localStorage.setItem('jwt',response.data.token.token);
            if(rol == 'r1'){
              $rootScope.isSessionR1 = true;
              localStorage.setItem('r1',JSON.stringify(response.data.user));
            }
            if(rol == 'r2'){
              $rootScope.isSessionR2 = true;
              localStorage.setItem('r2',JSON.stringify(response.data.user));
            }
          }

          return response;

      });
    },
    logout: function(){

      $http.get(CONFIG.URLAPI + "/logout")
      .success(function (response) {
        $rootScope.isSessionR2 = false;
        $rootScope.isSessionR1 = false;
        localStorage.removeItem('r1');
        localStorage.removeItem('r2');
        msgLogout();
        $state.transitionTo("app.welcome");
      });
      localStorage.removeItem('jwt');
    },
    initSesion: function(){
      process();
    }

  };

});
