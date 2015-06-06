
//--------------------------------------------------------------------------
// Internal buttons call handler
//--------------------------------------------------------------------------
function callHandler(elev, user_request){

// function manager_getElevator(to_this_floor, button_id) {
// 	console.log("manager gettting elevator");
// 	var bothElevatorsOnSameFloor = 
// 		(leftElevator.current_floor == to_this_floor) && (rightElevator.current_floor == to_this_floor);
// 	if (bothElevatorsOnSameFloor) {
// 		// open left ? TBD
// 		leftElevator.openDoor(button_id);
// 	}

	var elevator;
	var currElevator;
	if (elev === ELEV_LEFT) {
		elevator = "left";
		currElevator = leftElevator;
	} else {
		elevator = "right";
		currElevator = rightElevator;
	}

	var mySquare = d3.select(".elevator_" + elevator);
	currYCord = mySquare.attr("y");

	//call to this function should be associated
	// with the outside control panel
	// createUser(user_request);

	// console.log(user_request);
	changeButtonColor(elev, user_request, COLOR_YELLOW);


	if(user_request >= 30 && user_request <= 37){
		emergencyHandler(elev,user_request);

	}

// ADD a floor request to elevator array
	if (user_request < 5){

	if (!contains(currElevator.floor_request, user_request)){
		currElevator.floor_request.push(user_request);
	}
	console.log("++++++++++++++++request for floor " + currElevator.floor_request[1]);
	}

	if (currYCord == GROUND_FLOOR_HEIGHT) {
		console.log("ground");
		switch (user_request) {
			case 1:
				currElevator.goToFloor(elev, user_request, 0, GROUND_FLOOR_HEIGHT, 1);	
				break;
			case 2:
				currElevator.goToFloor(elev, user_request, 1, GROUND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1);	
				break;
			case 3:
				currElevator.goToFloor(elev, user_request, 2, GROUND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1);
				break;
			case 4:
				currElevator.goToFloor(elev, user_request, 3, GROUND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1);	
				break;
		}
	} else if (currYCord == SECOND_FLOOR_HEIGHT) {
		console.log("second");
		switch (user_request) {
			case 1:
				currElevator.goToFloor(elev, user_request, 1, SECOND_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1);
				break;
			case 3:
				currElevator.goToFloor(elev, user_request, 1, SECOND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1);
				break;
			case 4:
				currElevator.goToFloor(elev, user_request, 2, SECOND_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1);
				break;
		}
	} else if (currYCord == THIRD_FLOOR_HEIGHT) {
		console.log("third");
		switch (user_request) {
			case 1:
				currElevator.goToFloor(elev, user_request, 2, THIRD_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1 );
				break;
			case 2:
				currElevator.goToFloor(elev, user_request, 1, THIRD_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1);
				break;
			case 4:
				currElevator.goToFloor(elev, user_request, 1, THIRD_FLOOR_HEIGHT-Y_ELEV_DISTANCE, 1);
				break;
		}
	} else if (currYCord == FOURTH_FLOOR_HEIGHT) {
		console.log("fourth");
		switch (user_request) {
			case 1:
				currElevator.goToFloor(elev, user_request, 3, FOURTH_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1);
				break;
			case 2:
				currElevator.goToFloor(elev, user_request, 2, FOURTH_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1);
				break;
			case 3:
				currElevator.goToFloor(elev, user_request, 1, FOURTH_FLOOR_HEIGHT+Y_ELEV_DISTANCE, -1);
				break;
		}
	}
}	
	

//--------------------------------------------------------------------------
// External buttons call handler
//--------------------------------------------------------------------------
function callHandlerExternal(user_request){
	changeButtonColor(1,user_request, COLOR_YELLOW);
	console.log(user_request);
		switch(user_request){
			case FOURTH_FLOOR_EXTERNAL_BUTTON:
				console.log("fourth floor go down pressed");
				
				var penguin = d3.selectAll(".fourthfloorPenguin")
					.transition()
					.duration(1500)
					.attr("x",PENGUIN_MIDDLE)
					.style("opacity", 100);
					// movePenguinLeft(penguin);
					manager_getElevator(4, FOURTH_FLOOR_EXTERNAL_BUTTON);
				break;
			case THIRD_FLOOR_EXTERNAL_BUTTON_UP:
				console.log("third floor go up pressed");				
				var penguin = d3.selectAll(".thirdfloorPenguinLeft")
					.transition()
					.duration(1500)
					.style("opacity", 100)
					.attr("x",PENGUIN_MIDDLE);
					// movePenguinRight(penguin);
					manager_getElevator(3, THIRD_FLOOR_EXTERNAL_BUTTON_UP);
				break;
			case THIRD_FLOOR_EXTERNAL_BUTTON_DOWN:
				console.log("third floor go down pressed");

				var penguin = d3.selectAll(".thirdfloorPenguinRight")
					.transition()
					.duration(1500)
					.style("opacity", 100)
					.attr("x",PENGUIN_MIDDLE);
					// movePenguinLeft(penguin);
					manager_getElevator(3, THIRD_FLOOR_EXTERNAL_BUTTON_DOWN);
				break;
			case SECOND_FLOOR_EXTERNAL_BUTTON_UP:
				console.log("second floor go up pressed");

				var penguin = d3.selectAll(".secondfloorPenguinLeft")
					.transition()
					.duration(1500)
					.style("opacity", 100)
					.attr("x",PENGUIN_MIDDLE);
					// movePenguinRight(penguin);
					manager_getElevator(2, SECOND_FLOOR_EXTERNAL_BUTTON_UP);
				break;
			case SECOND_FLOOR_EXTERNAL_BUTTON_DOWN:
				console.log("second floor go down pressed");
				manager_getElevator(2, SECOND_FLOOR_EXTERNAL_BUTTON_DOWN);
				var penguin = d3.selectAll(".secondfloorPenguinRight")
					.transition()
					.duration(1500)
					.style("opacity", 100)
					.attr("x",PENGUIN_MIDDLE);
					// movePenguinLeft(penguin);
				break;
			case GROUND_FLOOR_EXTERNAL_BUTTON:
				console.log("first floor go up pressed");
				manager_getElevator(1, GROUND_FLOOR_EXTERNAL_BUTTON);
				var penguin = d3.selectAll(".groundfloorPenguin")
					.transition()
					.duration(1500)
					.style("opacity", 100)
					.attr("x",PENGUIN_MIDDLE);
					// movePenguinLeft(penguin);
				break;

		}
}