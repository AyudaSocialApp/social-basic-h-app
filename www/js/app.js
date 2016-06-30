// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material']);

app.run(function ($ionicPlatform) {
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

    .state('app.wanthelp', {
        url: '/wanthelp',
        views: {
            'menuContent': {
                templateUrl: 'templates/views/wanthelp.html',
                controller: 'WanthelpCtrl'
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


    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/welcome');
});
