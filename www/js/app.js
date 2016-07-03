// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material']);

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

})

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
