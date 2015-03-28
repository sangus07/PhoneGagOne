
function onBodyLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
}

function onDeviceReady(){
	$("#resultado").html("PhoneGap en marcha");
	
	
}



/*
*
Acelerómetro
*
*/

function acelerometro(){
	$("#resultado1").html("esperando al acelerómetro");
	 //navigator.accelerometer.getCurrentAcceleration(onInfo, onError);
	var watch = navigator.accelerometer.watchAcceleration(onInfoAcc,
                                                       onErrorAcc,
                                                       {frequency: 2000});
	//navigator.accelerometer.clearWatch(watch);
	
}


function onInfoAcc(aceleracion){
	$("#resultado1").html('Acceleration X: ' + aceleracion.x + '<br>' +
          'Acceleration Y: ' + aceleracion.y + '<br>' +
          'Acceleration Z: ' + aceleracion.z + '<br>' +
          'Timestamp: '      + aceleracion.timestamp);
}

function onErrorAcc(){
	alert("No hay acelerómetro");
}

/*
*
*
*/




/*
*
Notificaciones
*
*/

function notificaciones(){
	$("#resultado2").html("Área de notificaciones");
	
	$("#b_alerta").bind("tap", function(e){
		e.preventDefault();
   		e.stopImmediatePropagation();
		navigator.notification.alert("Esto es una alerta", alertCallback, "Alerta!", "ciérrame");
	});
	
	$("#b_comfirmacion").bind("tap", function(){
		e.preventDefault();
   		e.stopImmediatePropagation();
		navigator.notification.confirm("Esto es una confirmación", confirmCallback, "Confirmación", ["Si", "No"])

	});
	
	$("#b_prompt").bind("tap", function(){
		e.preventDefault();
   		e.stopImmediatePropagation();
		navigator.notification.prompt("Esto es un prompt", promptCallback, "Prommpt", ["Si", "Cancelar"], "Tu dirás...")

	});
	
	$("#b_ruido").bind("tap", function(){
		e.preventDefault();
   		e.stopImmediatePropagation();
		navigator.notification.beep(2);
		navigator.notification.vibrate(1000);
	});
}

function alertCallback(){
	$("#resultado2").append("La alerta se ha cerrado<br>");
}
function confirmCallback(buttonIndex){
	$("#resultado2").append("Ha habido una confirmación y han pulsado el botón " + buttonIndex + "<br>");
}
function promptCallback(buttonIndex, input){
	$("#resultado2").append("Ha habido un prompt y han pulsado el botón " + buttonIndex + " han escrito " + input + " br>");
}


/*
*
*
*/






/*
*
Capturas
*
*/

function capturas(e){
	
	$("#b_captura").bind("tap", function(){
		e.preventDefault();
   		e.stopImmediatePropagation();
		
		navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
		/*navigator.device.capture.supportedImageModes
		
		navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:2});
		navigator.device.capture.supportedAudioModes
		
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});

		navigator.device.capture.supportedVideoModes*/
	});
}

function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            uploadFile(mediaFiles[i]);
        }
    }


function uploadFile(mediaFile) {
       /* var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;

        ft.upload(path,
            "http://my.domain.com/upload.php",
            function(result) {
                console.log('Upload success: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent');
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name });
			*/
    }


// capture error callback
var captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};



/*
*
*
*/






/*
*
Geolocalización
*
*/

function geo(){
	$("#resultado4").html("esperando al GPS");
	 //navigator.geolocation.getCurrentPosition(onInfo, onError);
	var watch = navigator.geolocation.watchPosition(onInfoGeo, onErrorGeo, { timeout: 30000 });

	//navigator.geolocation.clearWatch(watch);
	
}


function onInfoGeo(info){
	$("#resultado4").html(
			'Latitud: '          + info.coords.latitude          + '<br>' +
          'Longitud: '         + info.coords.longitude         + '<br>' +
          'Altitud: '          + info.coords.altitude          + '<br>' +
          'Accuracy: '          + info.coords.accuracy          + '<br>' +
          'Altitud Accuracy: ' + info.coords.altitudeAccuracy  + '<br>' +
          'Heading: '           + info.coords.heading           + '<br>' +
          'Speed: '             + info.coords.speed             + '<br>' +
          'Timestamp: '         + info.timestamp                + '<br>');
}

function onErrorGeo(error){
	$("#resultado4").html('code: '    + error.code    + '<br>' +
          'message: ' + error.message);
}

/*
*
*
*/




/*
*
contactos
*
*/

function contactos(e){
	
	$("#b_contactos").bind("tap", function(){
		 $("#resultado5").append("Creando contacto..." );
		e.preventDefault();
   		e.stopImmediatePropagation();
		
		var myContact = navigator.contacts.create();
		myContact.displayName = "test";
		var name = new ContactName();
		name.familyName = "Jorge";
		name.middleName = "G. V.";
		myContact.name = name;
		myContact.phoneNumbers = [];
		myContact.phoneNumbers[0] = new ContactField("home", "987654321");
		
		
							/*
							"addresses":  {
										"streetAddress":"mi casa nº0",
										"locality": "Vigo",
										"region": "Galicia",
										"postalCode": "36210"
										}*/

		
		
		myContact.save(onSaveSuccess,onSaveError);
        
		
		
		/*var options  = new ContactFindOptions();
		options.filter   = "Test";
		options.multiple = true;
		var fields       = ["displayName", "name"];
		navigator.contacts.find(fields, onSuccessContacto, onErrorContacto, options);*/

	});
}

 function onSaveSuccess(contact) {
		$("#resultado5").html("Se ha creado el contacto" );
}

 function onSaveError(contactError) {
		$("#resultado5").html("Error = " + contactError.code);
}


function onSuccessContacto(contacts) {
   $("#resultado5").append('<br>Hemos encontrado ' + contacts.length + ' contactos con ese nombre.: <br>');
   var i, len;
   for (i = 0, len = contacts.length; i < len; i += 1) {
	   $("#resultado5").append('<br>' + contacts[i].displayName);
	}
};

function onErrorContacto(contactError) {
    alert('onError!');
};



/*
*
*
*/




/*
*
audio
*
*/

function audio(e){
	
	$("#b_playAudio").bind("tap", function(){
		e.preventDefault();
   		e.stopImmediatePropagation();
		 $("#resultadoAudio").html("Pidiendo audio");
 			playAudio("http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3");
	});
	
	$("#b_stopAudio").bind("tap", function(){
		e.preventDefault();
   		e.stopImmediatePropagation();
 			stopAudio();
	});
}
	var my_media = null;
    var mediaTimer = null;
	
	function playAudio(src) {
         if (my_media == null) {
              my_media = new Media(src, onSuccess, onError);
         } 
		 my_media.play();

         if (mediaTimer == null) {
              mediaTimer = setInterval(function() {
                 my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
								$("#resultadoAudio").html("Pos = " + position);
                            }
                        },
                        // error callback
                        function(e) {
							$("#resultadoAudio").html("Error = " + e);
                            setAudioPosition("Error: " + e);
                        }
                 );
             }, 1000);
         }
    }

	function stopAudio() {
        if (my_media) {
             my_media.stop();
        }
        clearInterval(mediaTimer);
        mediaTimer = null;
    }
	
	function onSuccess() {
           $("#resultadoAudio").html("playAudio():Audio Success");
    }

     function onError(error) {
         $("#resultadoAudio").html('code: '    + error.code  + '<br>' +
                  'message: ' + error.message + '\n');
      }

/*
*
*
*/
