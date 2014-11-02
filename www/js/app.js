// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('vllaznia', ['ionic', 'vllaznia.services', 'vllaznia.controllers', 'easypiechart', 'ngSanitize'])
//angular.module('starter', ['angular-carousel'])

.run(function($ionicPlatform) {
   var gaPlugin;
   gaPlugin = window.plugins.gaPlugin;
   gaPlugin.init(successHandler, errorHandler, "UA-2341193-8", 10);
   document.addEventListener("deviceready", initPushwoosh, true);
   test();


function initPushwoosh()
{
    //get pushwoosh plugin
    var pushNotification = window.plugins.pushNotification;
    //notify plugin that device is ready, this is VERY important as it will dispatch on start push notification
    pushNotification.onDeviceReady();
 
    //register for push notifications
    pushNotification.registerDevice({ projectid: "455582282730", appid : "1539D-59149" },
        function(status) {
            //this is push token
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
 
    //this function gets called when push notifications has been received
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
            var userData = event.notification.userdata;
                                 
            if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
                                     
        alert(title);
    });
}

  $ionicPlatform.ready(function() {
   if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


function test(){
alert("function OK!")
}


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.index', {
      url: "/index",
      views: {
        'menuContent' :{
          templateUrl: "templates/index.html",
          controller: 'IndexCtrl'
        }
      }
    })

    .state('app.lajmet', {
      url: "/lajmet",
      views: {
        'menuContent' :{
          templateUrl: "templates/lajmet.html",
          controller: 'LajmeCtrl'
        }
      }
    })
    .state('app.lajmi', {
      url: "/lajmi/:lajmiId",
      views: {
        'menuContent' :{
          templateUrl: "templates/lajmet-detaje.html",
          controller: 'LajmeDetCtrl'
        }
      }
    })
    .state('app.ndeshjet', {
      url: "/ndeshjet",
      views: {
        'menuContent' :{
          templateUrl: "templates/ndeshjet.html",
          controller: 'NdeshjetCtrl'
        }
      }
    })
    .state('app.ndeshja', {
      url: "/ndeshja/:ndeshjaId",
      views: {
        'menuContent' :{
          templateUrl: "templates/ndeshja.html",
          controller: 'NdeshjetDetCtrl'
        }
      }
    })

    .state('app.klubi', {
      url: "/klubi",
      views: {
        'menuContent' :{
          templateUrl: "templates/klubi.html",
          controller: 'KlubiCtrl'
        }
      }
    })
    .state('app.tv', {
      url: "/tv",
      views: {
        'menuContent' :{
          templateUrl: "templates/tv.html"
        }
      }
    })
    .state('app.forumi', {
      url: "/forumi",
      views: {
        'menuContent' :{
          templateUrl: "templates/forumi.html",
          controller: 'ForumiCtrl'
        }
      }
    })
    .state('app.multimedia', {
      url: "/multimedia",
      views: {
        'menuContent' :{
          templateUrl: "templates/multimedia.html"
        }
      }
    })
    .state('app.klasifikimi', {
      url: "/klasifikimi",
      views: {
        'menuContent' :{
          templateUrl: "templates/klasifikimi.html",
          controller: 'KlasifikimiCtrl'
        }
      }
    })
    .state('app.klasifikimidet', {
      url: "/klasifikimidet/:klasifikimiId",
      views: {
        'menuContent' :{
          templateUrl: "templates/klasifikimidet.html",
          controller: 'KlasifikimiDetCtrl'
        }
      }
    })
    .state('app.ekipi', {
      url: "/ekipi",
      views: {
        'menuContent' :{
          templateUrl: "templates/lojtaret.html",
          controller: 'LojtaretCtrl'
        }
      }
    })

   .state('app.credits', {
      url: "/credits",
      views: {
        'menuContent' :{
          templateUrl: "templates/credits.html"
        }
      }
    })

    .state('app.lojtari', {
      url: "/ekipi/:lojtariId",
      views: {
        'menuContent' :{
          templateUrl: "templates/lojtari.html",
          controller: 'LojtaretDetCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');
});

