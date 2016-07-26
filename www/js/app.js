// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','angular-jwt','ionic-material','naif.base64','ngResource','ngCordova']);

app.run(function ($ionicPlatform,$rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        // ################## device ###########
        if(device.platform === "iOS") {
            window.plugin.notification.local.promptForPermission();
        }

    });

    $rootScope.isSessionR1 = false;
    $rootScope.isSessionR2 = false;

    // init vars localstorage
    if(localStorage.getItem('r1') === null || localStorage.getItem('r1') === ""){
      localStorage.setItem('r1',"");
    }else{
      $rootScope.isSessionR1 = true;
    }

    if(localStorage.getItem('r2') === null || localStorage.getItem('r2') === ""){
      localStorage.setItem('r2',"");
    }else{
      $rootScope.isSessionR2 = true;
    }
    // end init vars localstorage

    if(typeof $rootScope.nameusersesionr1 === 'undefined'){
      $rootScope.nameusersesionr1 = '';
    }

    if(typeof $rootScope.nameusersesionr2 === 'undefined'){
      $rootScope.nameusersesionr2 = '';
    }


  if(localStorage.getItem('r1') !== null && localStorage.getItem('r1') !== ""){
    $rootScope.nameusersesionr1 = JSON.parse(localStorage.getItem('r1')).email;
  }

  if(localStorage.getItem('r2') !== null && localStorage.getItem('r2') !== ""){
    $rootScope.nameusersesionr2 = JSON.parse(localStorage.getItem('r2')).email;
  }

  // Roles a detallar
  $rootScope.currentHelpDetail = {};

});


app.constant('CONFIG', {
 URLAPI: "http://localhost/social/social-basic-api/public/api/v1",
 APPVERSION: '1.0.0'
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    // Examples
    .state('appexample', {
        url: '/appexample',
        abstract: true,
        templateUrl: 'templates/examples/menu.html',
        controller: 'AppexampleCtrl'
    })

    .state('appexample.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/examples/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })

    .state('appexample.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/examples/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('appexample.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/examples/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('appexample.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/examples/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('appexample.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/examples/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })

    // Views

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/views/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.welcome', {
        url: '/welcome',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/welcome.html',
                controller: 'WelcomeCtrl'
            }
        }
    })
    .state('app.welcome2', {
        url: '/welcome2/:viewdestinyloginRegister',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/welcome.html',
                controller: 'WelcomeCtrl'
            }
        }
    })
    .state('app.myhelps', {
        url: '/myhelps',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/myhelps.html',
                controller: 'MyhelpsCtrl'
            }
        }
    })

    .state('app.lwanthelp', {
        url: '/lwanthelp',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/lwanthelp.html',
                controller: 'LwanthelpCtrl'
            }
        }
    })
    .state('app.notifications', {
        url: '/notifications',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/notifications.html',
                controller: 'NotificationsCtrl'
            }
        }
    })
    .state('app.aboutthis', {
        url: '/aboutthis',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/aboutthis.html',
                controller: 'AboutthisCtrl'
            }
        }
    })

    .state('app.needhelp', {
        url: '/needhelp',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/needhelp.html',
                controller: 'NeedhelpCtrl'
            }
        }
    })


    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/welcome');
});


app.factory('authHttpResponseInterceptor', ['$injector','$q', function ($injector,$q) {


      function msgChangeOrCreateToken(){
          var alertPopup = $injector.get('$ionicPopup').alert({
          title: 'Aviso',
          template: 'Debe iniciar o reiniciar sesión como colaborador o necesitado para continuar'
        });
      }


    return {
      response: function (response) {

        // Renovar token en el cliente
        var token = response.config.headers.Authorization;
        if ('undefined' !== typeof token && null !== token) {
            localStorage.setItem('jwt',token.split(' ')[1]);
        }

        if (response.status === 401) {
          console.log("Response 401");
        }

        if (response.status === 400) {
          console.log("Response 400");

        }

        if (response.status === 500) {
          
          console.log("Response 500");

        }
        if (response.status === 404) {
          console.log("Response 500");

        }

        return response || $q.when(response);
      },
      responseError: function (rejection) {

        if (rejection.status === 401) {
          console.log("Response Error 401", rejection);
          msgChangeOrCreateToken();
          $injector.get('$state').transitionTo("app.welcome2", { viewdestinyloginRegister: 'app.welcome' });
        }

        if (rejection.status === 400) {
          console.log("Response Error 400", rejection);
          msgChangeOrCreateToken();
          $injector.get('$state').transitionTo("app.welcome2", { viewdestinyloginRegister: 'app.welcome' });
        }
        if (rejection.status === 500) {
          console.log("Response Error 500", rejection);
        }
        if (rejection.status === 404) {
          console.log("Response Error 404", rejection);
        }

        try {
          $injector.get('$ionicLoading').hide();
        } catch(e) { }

        return $q.reject(rejection);
      }
    }
  }]);

app.config(['$injector', function ($injector) {
    //Http Intercpetor to check auth failures for xhr requests
    var $hp = $injector.get('$httpProvider');
    $hp.interceptors.push('authHttpResponseInterceptor');

}]);

app.config(['jwtInterceptorProvider','$httpProvider', function(jwtInterceptorProvider,$httpProvider){
    jwtInterceptorProvider.tokenGetter = function(jwtHelper, $http,CONFIG) {
        var jwt = localStorage.getItem('jwt');
        if(jwt){
            if(jwtHelper.isTokenExpired(jwt)){
                return $http({
                    url : CONFIG.URLAPI + '/token',
                    skipAuthorization : true,
                    method: 'GET',
                    headers : { Authorization : 'Bearer '+ jwt},
                }).then(function(response){
                    localStorage.setItem('jwt',response.data.token);
                    return response.data.token;
                },function(response){
                    localStorage.removeItem('jwt');
                });
            }else{
                return jwt; 
            }
        }
    }
    $httpProvider.interceptors.push('jwtInterceptor');
}]);