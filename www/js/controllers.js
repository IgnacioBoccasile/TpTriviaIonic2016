angular.module('starter.controllers', ['ngCordova'])

.controller('AutorCtrl', function($scope) {})

.controller('TriviaCtrl', function($scope, $cordovaNativeAudio, $cordovaVibration, $timeout, $window) {
	
	$scope.Preguntas = [];
	
	$scope.Preguntas = new Firebase('https://tptrivia-63793.firebaseio.com/preguntas');
	
	$scope.NumeroRandom = Math.floor((Math.random() * 3) + 1);
	
	$scope.Preguntas.on('child_added', function(snapshot) 
	{
		$timeout(function()
		{
			var message = snapshot.val();

			if(message.id == $scope.NumeroRandom)
			{
				$scope.pregElegida = message;
				
				$scope.respuesta = message.respuesta;			
			}
		});
	});
	
	$scope.Validar = function(respuestaElegida)
	{
		if(respuestaElegida === $scope.respuesta)
		{
			$cordovaNativeAudio.play('RespuestaCorrecta');
			
			document.getElementById(respuestaElegida).className = "button button-large  button-balanced";
			
			try
			{
				$cordovaVibration.vibrate(300);   
			}
			
			catch(ex)
			{
				console.log(ex);
			}
		}
		
		else
		{
			$cordovaNativeAudio.play('RespuestaIncorrecta');
			
			document.getElementById(respuestaElegida).className = "button button-large button-assertive";
			
			try
			{ 
				$cordovaVibration.vibrate([300,300,300]);
            }
			
			catch(ex)
			{
				console.log(ex);
			}
		}
	}
	
	//document.getElementById(op1).className = "button button-assertive";

	$scope.Desh = false;
	
	$scope.Deshabilitar = function()
	{
		$scope.Desh = true;
		
		return $scope.Desh;
	}

    $scope.siguientePregunta = function() 
	{ 
		$window.location.reload();
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
