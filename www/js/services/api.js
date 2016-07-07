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


app.factory('Sesion',function($http,$state,CONFIG){

  return {
    login: function(idless) {
      $http.get(CONFIG.URLAPI + "/login")
      .success(function (response) {
        localStorage.setItem('jwt',response.data.token.token);
        console.log(localStorage.getItem('jwt'));
      });
    },
    logout: function(){
      $http.get(CONFIG.URLAPI + "/logout")
      .success(function (response) {
        $state.transitionTo("app.welcome");
      });
    }
  };

});
