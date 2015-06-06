/* use 1 for left elevator and 2 for right elevator sound */


//--------------------------------------------------------------------------
// Alarm and emergency sounds for elevators
//--------------------------------------------------------------------------
function soundEmergency(x){
	var sound = document.getElementById('emergency' + x);
	sound.load();
	sound.play();
}

function soundAlarm(x){
		
	var sound = document.getElementById('audiotag' + x);
	sound.load();
	sound.play();
}

function cancelAlarm(x){
	document.getElementById('audiotag' + x).pause();
}

function emergencyHandler(elev, user_request){
	var fileNum = elev === ELEV_LEFT? 1: 2;
	var elevator = elev === ELEV_LEFT? "left": "right";

	console.log(user_request);


 	 if (user_request == 30 || user_request == 31){
 	 	soundAlarm(fileNum);
 	 }

	 if (user_request == 32 || user_request == 33){
	 	var change_request = (user_request % 2) === 0? 30:31;
	 	cancelAlarm(fileNum);
	 	for (i = 0; i < 4; i++) { 
   			 
   			 changeButtonColor(elev,change_request,COLOR_WHITE);
   			 change_request += 2;
	 	}
 	 }

 	  if (user_request == 34 || user_request == 35){
 	 	soundAlarm(fileNum);
 	 }

 	  if (user_request == 36 || user_request == 37){
 	 	soundEmergency(fileNum);
 	 }
}

function dingSound(x){

	var sound = document.getElementById('ding' + x);
	sound.load();
	sound.play();
}

function beepSound(x){
	var sound = document.getElementById('beep' + x);
	sound.load();
	sound.play();
}