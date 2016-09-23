angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
	if(window.plugins && window.plugins.NativeAudio)
	{
		window.plugins.NativeAudio.preloadSimple('Guardar', 'audio/Guardar.mp3');
		window.plugins.NativeAudio.preloadSimple('Correcto', 'audio/Correcto.mp3');
		window.plugins.NativeAudio.preloadSimple('Incorrecto', 'audio/Incorrecto.mp3');
	}
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.autor', {
    url: '/autor',
    views: {
      'tab-autor': {
        templateUrl: 'templates/tab-autor.html',
        controller: 'AutorCtrl'
      }
    }
  })

  .state('tab.trivia', {
      url: '/trivia',
      views: {
        'tab-trivia': {
          templateUrl: 'templates/tab-trivia.html',
          controller: 'TriviaCtrl'
        }
      }
    })

  .state('tab.inicio', {
    url: '/inicio',
    views: {
      'tab-inicio': {
        templateUrl: 'templates/tab-inicio.html',
        controller: 'InicioCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/inicio');

});
