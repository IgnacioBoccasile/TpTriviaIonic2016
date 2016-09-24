angular.module('starter.controllers', ['ngCordova'])

.controller('AutorCtrl', function($scope) {})

.controller('TriviaCtrl', function($scope, $cordovaNativeAudio, $cordovaVibration, $timeout, $window) {
	
	$scope.misPreguntas = [];
	
	$scope.misPreguntas = new Firebase('https://tptrivia-63793.firebaseio.com/preguntas');
	
	$scope.numeroAleatorio = Math.floor((Math.random() * 40) + 1);
	
	$scope.misPreguntas.on('child_added', function (snapshot) 
	{
		$timeout(function()
		{
			var message = snapshot.val();

			if(message.id == $scope.numeroAleatorio)
			{		
				$scope.preguntaRandom = message;
				
				$scope.Respuesta = message.respuesta;	
			}
		});
	});
	
	$scope.verificarOpcionElegida = function(opElegida)
	{
		if(opElegida === $scope.Respuesta)
		{	
			try
			{
				$cordovaVibration.vibrate(200);   			
			}
			
			catch(Exception)
			{
				console.log(Exception.Message);
			}
			
			try
			{
				$cordovaNativeAudio.play('Correcto');
			}
			
			catch(Exception)
			{
				console.log(Exception.Message);
			}
				
			document.getElementById(opElegida).className = "button button-block button-balanced";		
		}
		
		else
		{	
			try
			{ 
				$cordovaVibration.vibrate([200,200,200]);			
            }
			
			catch(ex)
			{
				console.log(ex);
			}
			
			try
			{
				$cordovaNativeAudio.play('Incorrecto');
			}
			
			catch(Exception)
			{
				console.log(Exception.Message);
			}
		
			document.getElementById(opElegida).className = "button button-block button-assertive";		
		}
	}

	$scope.bloqueado = false;
	
	$scope.bloquear = function()
	{
		$scope.bloqueado = true;
		
		return $scope.bloqueado;
	}

    $scope.pasarDePregunta = function() 
	{ 
		try
		{
			$cordovaVibration.vibrate(50);
			$cordovaNativeAudio.play('Sig');
		}
		
		catch(Exception)
		{
			console.log(Exception.Message);
		}
		
		$window.location.reload();
	}
})

.controller('InicioCtrl', function($scope, $cordovaNativeAudio, $cordovaVibration, $timeout){
	
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
		});
	});		
});