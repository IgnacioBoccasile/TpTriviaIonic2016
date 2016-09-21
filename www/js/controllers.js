angular.module('starter.controllers', ['ngCordova'])

.controller('AutorCtrl', function($scope) {})

.controller('TriviaCtrl', function($scope, $cordovaNativeAudio, $cordovaVibration) {
		
	$scope.respuestaCorrecta = function()
	{
		try
		{
			$cordovaVibration.vibrate(30);
			$cordovaNativeAudio.play('RespuestaCorrecta');
		}
		
		catch(Exception)
		{
			console.log(Exception.Message);
		}
	}
	
	$scope.respuestaIncorrecta = function()
	{
		try
		{
			$cordovaVibration.vibrate(30);
			$cordovaNativeAudio.play('RespuestaIncorrecta');
		}
		
		catch(Exception)
		{
			console.log(Exception.Message);
		}
	}
	
})

.controller('InicioCtrl', function($scope, $ionicPlatform, $cordovaNativeAudio, $cordovaVibration){
	
	$scope.bandera = false;
	
	$scope.MisMensajes=[];
	
	var messagesRef = new Firebase('https://tptrivia-63793.firebaseio.com/Usuarios');
	
	$scope.miBoton = function()
	{
		try
		{
			$cordovaVibration.vibrate(30);
			$cordovaNativeAudio.play('Guardar');
		}
		
		catch(Exception)
		{
			console.log(Exception.Message);
		}
		
		$scope.bandera = true;
		
		var nombre = $('#nombre').val();
		messagesRef.push({usuario:nombre});
	}
	
	messagesRef.on('child_added', function (snapshot) 
	{
		$timeout(function()
		{
			var message = snapshot.val();
			$scope.MisMensajes.push(message);
			console.log($scope.MisMensajes);
		});
	});			
});
