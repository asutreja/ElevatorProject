function manager_getElevator(to_this_floor, button_id) {
	console.log("manager gettting elevator");
	
// Condition where both elevators are stationary on the same floor

	var bothElevatorsOnSameFloor = 
		(leftElevator.current_floor === rightElevator.current_floor );

	var stationaryElevatorsSeperateFloor = 
		(leftElevator.current_floor !== rightElevator.current_floor 
			&& (leftElevator.mechanical_state === STATIONARY 
			&& rightElevator.mechanical_state === STATIONARY));

	var oneElevatorMovingOneStationary = 
		((leftElevator.mechanical_state !== STATIONARY 
			&& rightElevator.mechanical_state === STATIONARY) ||
		(rightElevator.mechanical_state !== STATIONARY 
			&& leftElevator.mechanical_state === STATIONARY));

	if (bothElevatorsOnSameFloor) {
		// open left ? TBD
		if (leftElevator.door_state == DOOR_OPEN){
			callElevatorManager(rightElevator, to_this_floor, button_id);
		} else {
		callElevatorManager(leftElevator, to_this_floor, button_id);
		}
	} 

// Condition where elevators are on different floors but stationary

	else if (stationaryElevatorsSeperateFloor) {
		console.log("on seperate floors and stationary");
		//calculate which elevator is closer
		var closerElevator = checkElevatorHeightDifference(to_this_floor, button_id);

		if (closerElevator === ELEV_LEFT){
			if (closerElevator.door_state !== DOOR_OPEN){
				console.log("the door state of the closer elevator is :" + closerElevator.door_state);
				callElevatorManager(leftElevator, to_this_floor, button_id);
			} else {
				callElevatorManager(rightElevator, to_this_floor, button_id);
			}
		} else {
			if (closerElevator.door_state !== DOOR_OPEN){
				callElevatorManager(rightElevator, to_this_floor, button_id);
			} else {
				callElevatorManager(rightElevator, to_this_floor, button_id);
			}
		}
	} 

//Condition where one is moving but the other is not.  checking direction first
// to see if that settles the race 
//===================================HAVE TO START HANDLING A QUEUE OR ARRAY OF SELECTED FLOORS========================
	
	else if (oneElevatorMovingOneStationary){
		var movingElevator = 
			leftElevator.mechanical_state !== STATIONARY? leftElevator: rightElevator;
		var stationaryElevator = 
			leftElevator.mechanical_state === STATIONARY? leftElevator: rightElevator;
		console.log(movingElevator);
		console.log("one elevator in motion");
		var elevFloor = movingElevator.current_floor === GROUND? 1: movingElevator.current_floor;
		
// these conditions may not be good enough for corner cases..... given that one person
// is clicking though its hard to create corner cases. not checking what the button direction
// is yet becuase that may be handled by having the boolean array that the elevator will
// check for while moving
		if ((elevFloor > to_this_floor) && (elevFloor.mechanical_state === GOING_DOWN)){
			callElevatorManager(movingElevator, to_this_floor, button_id);
		} if ((elevFloor < to_this_floor) && (elevFloor.mechanical_state === GOING_UP)){
			callElevatorManager(movingElevator, to_this_floor, button_id);
		} else {
			callElevatorManager(stationaryElevator, to_this_floor, button_id);
		}

	}
// have not yet triggered with condition with user tests.  perhaps state changes
// are not occurring correctly but regardless it may be close enough without it.
	else{

		console.log("BOTH ELEVATORS ARE MOVING!!!!!!!!!!!!!!!!!!!!!!!!!");
	}
}

function convertGtoOneLeft(){
	return leftElevator.current_floor === GROUND? 1: leftElevator.current_floor;
}

function convertGtoOneRight(){
	return rightElevator.current_floor === GROUND? 1: rightElevator.current_floor;
}

function checkElevatorHeightDifference(to_this_floor, button_id){

	var left = convertGtoOneLeft();
	var right = convertGtoOneRight();

	var checkLeft = Math.abs(left - to_this_floor);
	var checkRight = Math.abs(right - to_this_floor);

	var test = false;
	//handles the case of a tie.. send left elevator if door is closed, right if not
	if (checkLeft == checkRight){
		if (leftElevator.door_state == DOOR_OPEN && rightElevator.door_state == DOOR_CLOSED){
			return ELEV_RIGHT;
		} else {
			return ELEV_LEFT;
		}
	} if (checkLeft > checkRight){
		if (rightElevator.door_state == DOOR_OPEN && leftElevator.door_state == DOOR_CLOSED){
			return ELEV_LEFT;
		} else {
			return ELEV_RIGHT;
		}
	} else {
		if (leftElevator.door_state == DOOR_OPEN && leftElevator.door_start == DOOR_CLOSED){
			return ELEV_RIGHT;
		} else {
			return ELEV_LEFT;
		}
	}

	return ELEV_LEFT;
}
function callElevatorManager(elev, to_this_floor, button_id){
	console.log("callElevatorManager");
	if (elev.current_floor === GROUND) {
		console.log("ground");
		switch (to_this_floor) {
			case 1:
				elev.goToFloor(elev.id, to_this_floor, 0, GROUND_FLOOR_HEIGHT, 1, button_id);	
				break;
			case 2:
				elev.goToFloor(elev.id, to_this_floor, 1, GROUND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1, button_id);	
				break;
			case 3:
				elev.goToFloor(elev.id, to_this_floor, 2, GROUND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1, button_id);
				break;
			case 4:
				elev.goToFloor(elev.id, to_this_floor, 3, GROUND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1, button_id);	
				break;
		}
	} else if (elev.current_floor === SECOND_FLOOR) {
		console.log("second");
		switch (to_this_floor) {
			case 1:
				elev.goToFloor(elev.id, to_this_floor, 1, SECOND_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1, button_id);
				break;
			case 3:
				elev.goToFloor(elev.id, to_this_floor, 1, SECOND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1, button_id);
				break;
			case 4:
				elev.goToFloor(elev.id, to_this_floor, 2, SECOND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1, button_id);
				break;
		}
	} else if (elev.current_floor === THIRD_FLOOR) {
		console.log("third");
		switch (to_this_floor) {
			case 1:
				elev.goToFloor(elev.id, to_this_floor, 2, THIRD_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1, button_id);
				break;
			case 2:
				elev.goToFloor(elev.id, to_this_floor, 1, THIRD_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1, button_id);
				break;
			case 4:
				elev.goToFloor(elev.id, to_this_floor, 1, THIRD_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1, button_id);
				break;
		}
	} else if (elev.current_floor === FOURTH_FLOOR) {
		console.log("fourth");
		switch (to_this_floor) {
			case 1:
				elev.goToFloor(elev.id, to_this_floor, 3, FOURTH_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1, button_id);
				break;
			case 2:
				elev.goToFloor(elev.id, to_this_floor, 2, FOURTH_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1, button_id);
				break;
			case 3:
				elev.goToFloor(elev.id, to_this_floor, 1, FOURTH_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1, button_id);
				break;
		}
	} else {
		console.log("bug again");
	}

}