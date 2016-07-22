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


app.factory('Typehelps',function($resource,CONFIG){

  return $resource(CONFIG.URLAPI+"/typehelps/:id",
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

app.factory('HelpsSpecialOperations',function($http,CONFIG){
  return {
    store: function(obj) {
      return $http.post(CONFIG.URLAPI + "/helps_e",obj)
      .success(function (response) {
          return response;
      });
    },
    lastHelpsNeedy: function(idneedy) {
      return $http.get(CONFIG.URLAPI + "/helps_e/lastneedy/"+idneedy)
      .success(function (response) {
          return response;
      });
    },
    needies: function(maxId) {
      return $http.get(CONFIG.URLAPI + "/helps_e/allneedy/"+maxId)
      .success(function (response) {
          return response;
      });
    }
  };
});


app.factory('Sesion',function($http,$state,$ionicPopup,$rootScope,$ionicLoading,CONFIG){


  function msgLogout(){
      var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Sesión Cerrada con éxito'
    });
  }

  function initSesionR1ViewVars(user){
    $rootScope.nameusersesionr1 = user.email;
  }

  function initSesionR2ViewVars(user){
    $rootScope.nameusersesionr2 = user.email;
  }

  return {

    editRegister: function(credentials,rol) {
      var onlyNum = rol.substr(rol.length - 1);
      return $http.post(CONFIG.URLAPI + "/edit_register/"+onlyNum,credentials)
      .success(function (response) {
          if(response.success != false){
            if(rol == 'r1'){
              $rootScope.isSessionR1 = true;
              localStorage.setItem('r1',JSON.stringify(response.data.user));
              localStorage.setItem('userrol1',JSON.stringify(response.data.userrol));
              initSesionR1ViewVars(response.data.user);
            }
            if(rol == 'r2'){
              $rootScope.isSessionR2 = true;
              localStorage.setItem('r2',JSON.stringify(response.data.user));
              localStorage.setItem('userrol2',JSON.stringify(response.data.userrol));
              initSesionR2ViewVars(response.data.user);
            }
          }
          return response;
      });
    },


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
            if(typeof response.data.token !== 'undefined'){
              localStorage.setItem('jwt',response.data.token.token);
            }
            
            if(rol == 'r1'){
              $rootScope.isSessionR1 = true;
              localStorage.setItem('r1',JSON.stringify(response.data.user));
              localStorage.setItem('userrol1',JSON.stringify(response.data.userrol[0]));
              initSesionR1ViewVars(response.data.user);
            }
            if(rol == 'r2'){
              $rootScope.isSessionR2 = true;
              localStorage.setItem('r2',JSON.stringify(response.data.user));
              localStorage.setItem('userrol2',JSON.stringify(response.data.userrol[0]));
              initSesionR2ViewVars(response.data.user);
            }
          }

          return response;

      });
    },
    logout: function(){
      $ionicLoading.show();
      $http.get(CONFIG.URLAPI + "/logout")
      .success(function (response) {
        $ionicLoading.hide();
        $rootScope.isSessionR2 = false;
        $rootScope.isSessionR1 = false;
        localStorage.removeItem('r1');
        localStorage.removeItem('r2');
        localStorage.removeItem('userrol1');
        localStorage.removeItem('userrol2');
        $rootScope.nameusersesionr1 = "";
        $rootScope.nameusersesionr2 = "";
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
