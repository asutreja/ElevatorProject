
//===================================================================
// Elevator
//===================================================================

// constants
// floors
var GROUND = "G";
var SECOND_FLOOR = 2;
var THIRD_FLOOR = 3;
var FOURTH_FLOOR = 4;

// mechanical states
var GOING_UP = "going up";
var GOING_DOWN = "going down";
var STATIONARY = "stationary";

// occupancy states
// var FULL = "full";
// var NOT_FULL = "not full";

// door states
// var DOORS_OPENING = 1;
var DOOR_OPEN = "door open";
// var DOORS_CLOSING = 13;
var DOOR_CLOSED = "door closed";

var MAX_ELEVATOR_CAPACITY = 5;

var up_requests = [false,false,false,false,false];
var down_requests = [false, false, false, false, false];
// var floor_request = [];

// Constructor
function Elevator(id) {
	this.id = id;
	// initial states
	this.current_floor = GROUND; 
	this.mechanical_state = STATIONARY;
	this.door_state = DOOR_CLOSED;
	this.capacity = 0;
	this.floor_request = [];
	this.current_target_floor = 0;

}
// class methods
Elevator.prototype.openDoor = function(external_button_id, callback) {
	console.log("door opening for " + this.id + " elevator");


	// Need to add ding sound here.... 
		dingSound(1);

	var currElev = this;
	this.door_state = DOOR_OPEN;
	animationOpenDoor(this.id, function() {
		this.door_state = DOOR_OPEN;
		console.log("before calling penguin" + external_button_id);
		penguinControllers(external_button_id, currElev.id);
		animationCloseDoor(currElev.id, function(){

			if (currElev.current_target_floor !== 0){
				callHandler(currElev.id, currElev.current_target_floor);
			} else {
				var floor = 0;
				for (i =1;i < 5;i++){
					if (up_requests[i] == true || down_requests[i] == true){
						floor = i;
					}
				}
				if (floor == 0){
					return;
				} else {
					callHandler(currElev.id, floor);
				}
			}			
		});
		//callback();
	});
}



//--------------------------------------------------------------------------
// Updates elevator's LCD while elevator is moving
//--------------------------------------------------------------------------
function updateLCD(elev, floor_num) {
	var elevator = elev === ELEV_LEFT? "Left": "Right";
	var lcdText = d3.select(".elevatorLCD" + elevator);
		lcdText.transition()
		.text(floor_num);
}
//--------------------------------------------------------------------------
// Controls elevator's motion
//--------------------------------------------------------------------------
Elevator.prototype.goToFloor = function(elev, start_floor, num_floors_to_go, height, direction, external_button_id) {
		
	console.log("goToFloor function currently processing request: " + start_floor);
	var curr_floor = start_floor - num_floors_to_go ;
		console.log("current floor before calling function is: " + curr_floor );
		console.log("start floor: " + start_floor + "---- floors traveled: " + num_floors_to_go);

	// if (this.floor_request.length == 0){
	// 	this.floor_request.push(start_floor);
	// }

	if (this.current_target_floor === 0){
		console.log("added floor here");
		this.current_target_floor = start_floor;
	} 


// UNCOMMENT TO WORK WITH elevetor requests made while moving 
	if (external_button_id !== 0){
		if (this.current_target_floor !== start_floor){
			if (external_button_id % 2 !== 0){
				console.log("floor request added is " + start_floor);
				up_requests[start_floor] = true;
			} else {
				down_requests[start_floor] = true;
			}
			return;
		}
	} 


	var currElev = this;

	if (num_floors_to_go == 0) {
		this.current_target_floor = 0;
		// elevator reached destination at this point
		console.log("reached destination");
		this.mechanical_state = STATIONARY;
		// turn off light in button
		changeButtonColor(0,external_button_id,COLOR_WHITE);
		changeButtonColor(elev, start_floor, COLOR_WHITE);
		// open door

		this.openDoor(external_button_id);
		

		//this.floor_request.shift();
	
// ADDS THE DING SOUND+++++++++++++
		var temp_elev;
		if(elev === ELEV_LEFT){
			temp_elev = "left"
			dingSound(1);

		} else{

			temp_elev = "right"
			dingSound(2);
		}
/////+++++++++++++++++++++++++++
		
		// if (this.floor_request.length>0){
		// 	console.log("still have to process" + this.floor_request[1]);
		// }
		// this.floor_request.shift();
		return;
	} 

	var elevator;
	var which_elev;
	var floors_traveled = num_floors_to_go-1;
	console.log("floors traveled: " + floors_traveled);
	if (elev === ELEV_LEFT) {
		elevator =  "left";
		which_elev = ELEV_LEFT;
	} else {
		elevator =  "right";
		which_elev = ELEV_RIGHT;
	}
	console.log("height before floor passed");
	console.log(height);

	if (direction > 0){
		this.mechanical_state = GOING_UP;
		console.log(this.mechanical_state);
	} else {
		this.mechanical_state = GOING_DOWN;
	}
	var mySquare = d3.select(".elevator_" + elevator);
	mySquare.transition()
	.attr("y",height)
	.duration(ELEVATOR_SPEED)
	.ease("linear")
	.each("end", 
		function() { 
			console.log("passed floor");

			// Need to add Beep sound here when a floor is passed...
			if(elevator === "left"){
				beepSound(1);
			}else{
				beepSound(2);
			}
			
			if (direction > 0) {
				var curr_floor = start_floor - floors_traveled;
				// console.log("CURRRRENNNNTT FLOOOOOR");
				// console.log(curr_floor);
				// console.log("going up " + curr_floor);
				updateLCD(elev, curr_floor);
				
				currElev.current_floor = curr_floor;
				console.log(currElev);

				currElev.goToFloor(elev, start_floor, 
					floors_traveled, height-Y_ELEV_DISTANCE, direction, external_button_id);
			} else {
				// console.log("updating lcd");
				var curr_floor = start_floor + floors_traveled;
				if (curr_floor == 1)
					curr_floor = "G";
				updateLCD(elev, curr_floor);
				
				currElev.current_floor = curr_floor;
				console.log(currElev);
		
				// console.log("going down " + curr_floor);
				currElev.goToFloor(elev, start_floor, 
					floors_traveled, height+Y_ELEV_DISTANCE, direction, external_button_id);
			}

		});

		// for (i = 0;i<3;i++){
		// 	t
		// }
		console.log(this.floor_request[0]);
		var flootStop = false; 

		for (i=0;i<3;i++){
			if (this.floor_request[i] === curr_floor){
				var floorStop = true;
			}
		}
		// remove the floor request
		if (floorStop){
			var index = this.floor_request.indexOf(curr_floor);
			if (index > -1){
				this.floor_request.splice(index, 1);
			}
		}

		if (up_requests[curr_floor] == true && direction > 0 || floorStop) {

			console.log("processing an up request");
			console.log("floor: " + curr_floor);
					// stop and open door
					var dir = "up";
					var ext_button = getCurrentExternalButton(dir, curr_floor);
					
					currElev.mechanical_state = STATIONARY;
					// turn off light in button
					changeButtonColor(0,ext_button,COLOR_WHITE);
					changeButtonColor(this.id, curr_floor, COLOR_WHITE);
					currElev.openDoor(ext_button);
					up_requests[curr_floor] = false;
					console.log("finish processing request for floor: " + this.floor_request[0]);

		}
		if (down_requests[curr_floor] == true && direction < 0 ) {

			console.log("processing a down request");
			console.log("floor: " + curr_floor);
					// stop and open door
					var dir = "down";
					var ext_button = getCurrentExternalButton(dir, curr_floor);
					
				// UNCOMMENT TO WORK PROPERLY
				//	up_requests[curr_floor] = false;

					currElev.mechanical_state = STATIONARY;
					// turn off light in button
					changeButtonColor(0,ext_button,COLOR_WHITE);
					//changeButtonColor(elev, start_floor, COLOR_WHITE);
					// open door

					currElev.openDoor(ext_button);
					up_requests[curr_floor] = false;
					console.log("finish processing request for floor: " + this.floor_request[0]);
					callHandler(this.id, this.floor_request[0]);

		}
	// 	}
}

function checkButtonStates(currElev, curr_floor){
	// if (contains(this.floor_request, curr_floor)){
		// for (i =0; i<3;i++){
			console.log(currElev.floor_request[0]);
		// }
		removeFloorFromArray(currElev.floor_request, curr_floor);
		return true;
	
	return false;
}


// function checkButtonStates(){
// 	if (this.floor_request.length > 0){
// 		//process next internal command
// 		callHandler(this.id, this.floor_request.shift());
// 	} 
// }


function getCurrentExternalButton(dir, curr_floor){
	
	//its an up request from the current floor!
	if (dir === "up"){
		switch(curr_floor){
			case GROUND:
				return GROUND_FLOOR_EXTERNAL_BUTTON;
			case SECOND_FLOOR:
				return SECOND_FLOOR_EXTERNAL_BUTTON_UP;
			case THIRD_FLOOR:
				return THIRD_FLOOR_EXTERNAL_BUTTON_UP;
		}
	} else {
		switch(curr_floor){
			case SECOND_FLOOR:
				return SECOND_FLOOR_EXTERNAL_BUTTON_DOWN;
			case THIRD_FLOOR:
				return THIRD_FLOOR_EXTERNAL_BUTTON_DOWN;
			case FOURTH_FLOOR:
				return THIRD_FLOOR_EXTERNAL_BUTTON;
		}
	}
}

// -----------------------------------------------------
// Elevator animations
// -----------------------------------------------------

function animationOpenDoor(elev, callback){
	this.door_state = DOOR_OPEN;
	var elevator = elev === ELEV_LEFT? "left": "right";
	var mySquare = d3.select(".elevator_" + elevator);
	mySquare.transition()
	.duration(3000)
	.style("fill", COLOR_WHITE)
	.each("end", callback);
//use time duration before changing the button color back
//changeButtonColor(12, "w");
}

function animationCloseDoor(elev, callback){
	var elevator = elev === ELEV_LEFT? "left": "right";
	var mySquare = d3.select(".elevator_" + elevator);
		mySquare.transition()
		.duration(3000)
		.delay(3500)
		.style("fill", "#a7a9ac")
		.each("end", callback);
		this.door_state = DOOR_CLOSED;
	// if (elev === ELEV_LEFT) {
	// 	panelVisible(1, true);
	// } else {
	// 	panelVisible(2, true);
	// }
	//use time duration before changing the color back
	//changeButtonColor(14,"w");
}



// //===================================================================
// // Array Functions
// //===================================================================

//checks array for floor number if it is stored 
function contains(array, floor){
	for (i=0;i<3;i++){
		if (array[i] === floor){
			return true;
		}
	}
	return false;
}

//removves element from array after finding it
function removeFloorFromArray(array, floor){
	var index = array.indexOf(floor);
	if (index > -1){
		array.splice(index, 1);
	}
}



