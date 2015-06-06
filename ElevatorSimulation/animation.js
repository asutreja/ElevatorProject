
//--------------------------------------------------------------------------
// Changes buttons' colors
//--------------------------------------------------------------------------
function changeButtonColor(elev, floor, color){
	var elevator = elev === ELEV_LEFT ? "Left": "Right";
	var currentElev = elev === ELEV_LEFT? leftElevator: rightElevator;
	switch(floor) {

			case 1:
				var mySquare = d3.select(".groundFloorButton" + elevator);
					mySquare.transition()
					.style("fill", color);

					if(leftElevator.current_floor === GROUND || leftElevator.current_floor === 1) { 
						console.log("ping");
						mySquare.transition()
						.delay(200)
						.style("fill", "white");
					}

				break;
			case 2:
				var mySquare = d3.select(".secondFloorButton" + elevator);
					mySquare.transition()
					.style("fill", color);



					if(leftElevator.current_floor === SECOND_FLOOR){
						console.log("ping");
						mySquare.transition()
						.delay(200)
						.style("fill", "white");
					}


				break;
			case 3:
			var mySquare = d3.select(".thirdFloorButton" + elevator);
					mySquare.transition()
					.style("fill", color);



					if(leftElevator.current_floor === THIRD_FLOOR){
						console.log("ping");
						mySquare.transition()
						.delay(200)
						.style("fill", "white");
					}


				break;
			case 4:
				var mySquare = d3.select(".fourthFloorButton" + elevator);
					mySquare.transition()
					.style("fill", color);


					if(leftElevator.current_floor === FOURTH_FLOOR){
						console.log("ping");
						mySquare.transition()
						.delay(200)
						.style("fill", "white");
					}


				break;
			case 12: // Need to fix door open buttons here.

				var mySquare = d3.select(".doorOpenButton" + elevator);
					mySquare.transition()
					.style("fill", color);

					currentElev.door_state = DOOR_OPEN; 

					mySquare.transition()
					.delay(200)
					.style("fill", "white");

					animationOpenDoor(elev);

			setTimeout(animationCloseDoor(elev), 3000);

				break;
			case 14: // Need to fix door close buttons here.

				var mySquare = d3.select(".doorCloseButton" + elevator);
					mySquare.transition()
					.style("fill", color);

					currentElev.door_state = DOOR_CLOSED; 
					mySquare.transition()
					.delay(200)
					.style("fill", "white");

					animationCloseDoor(elev);

				break;
			case FOURTH_FLOOR_EXTERNAL_BUTTON:
				var mySquare = d3.select(".fourthFloorButtonDown");
					mySquare.transition()
					.style("fill", color);
				break;
			case THIRD_FLOOR_EXTERNAL_BUTTON_UP:
				var mySquare = d3.select(".thirdFloorButtonUp");
					mySquare.transition()
					.style("fill", color);
				break;
			case THIRD_FLOOR_EXTERNAL_BUTTON_DOWN:
				var mySquare = d3.select(".thirdFloorButtonDown");
					mySquare.transition()
					.style("fill", color);
				break;
			case SECOND_FLOOR_EXTERNAL_BUTTON_UP:
				var mySquare = d3.select(".secondFloorButtonUp");
					mySquare.transition()
					.style("fill", color);
				break;
			case SECOND_FLOOR_EXTERNAL_BUTTON_DOWN:
				var mySquare = d3.select(".secondFloorButtonDown");
					mySquare.transition()
					.style("fill", color);
				break;
			case GROUND_FLOOR_EXTERNAL_BUTTON:
				var mySquare = d3.select(".groundFloorButtonUp");
					mySquare.transition()
					.style("fill", color);
				break;
			case ALARM_LEFT:
				var mySquare = d3.select(".alarmButtonLeft");
					mySquare.transition()
					.style("fill", color);
				break;
			case ALARM_RIGHT:
				var mySquare = d3.select(".alarmButtonRight");
					mySquare.transition()
					.style("fill", color);
				break;
			case PUSH_TO_CANCEL_LEFT:
				var mySquare = d3.select(".callCancelButtonLeft");
					mySquare.transition()
					.style("fill", color);
				break;
			case PUSH_TO_CANCEL_RIGHT:
				var mySquare = d3.select(".callCancelButtonRight");
					mySquare.transition()
					.style("fill", color);
				break;
			case FIRE_LEFT:
				var mySquare = d3.select(".fireDepartmentButtonLeft");
					mySquare.transition()
					.style("fill", color);
				break;
			case FIRE_RIGHT:
				var mySquare = d3.select(".fireDepartmentButtonRight");
					mySquare.transition()
					.style("fill", color);
				break;
			case PUSH_TO_CALL_LEFT:
				var mySquare = d3.select(".pushToCallButtonLeft");
					mySquare.transition()
					.style("fill", color);
				break;
			case PUSH_TO_CALL_RIGHT:
				var mySquare = d3.select(".pushToCallButtonRight");
					mySquare.transition()
					.style("fill", color);
				break;
			}
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
// User animations
//--------------------------------------------------------------------------
function penguinControllers(external_button, elev){
	console.log("in penguin " + external_button);
	var elevator = elev === ELEV_LEFT? 1:2;

	switch(external_button){
		case 20: 
			var penguin = d3.select(".fourthFloorPenguin");
			switch (elevator){
				case 1:
					movePenguinLeft(penguin);
					penguinFadeOut(penguin);
					break;
				case 2:
					movePenguinRight(penguin);
					penguinFadeOut(penguin);

					break;
			}
			break;
		case 21: 
			var penguin = d3.select(".thirdFloorPenguinLeft");
			switch (elevator){
				case 1:
					movePenguinLeft(penguin);
					penguinFadeOut(penguin);
					break;
				case 2:
					movePenguinRight(penguin);
					penguinFadeOut(penguin);
					break;
			}
			break;
		case 22: 
			var penguin = d3.select(".thirdFloorPenguinRight");
			switch (elevator){
				case 1:
					movePenguinLeft(penguin);
					penguinFadeOut(penguin);
					break;
				case 2:
					movePenguinRight(penguin);
					penguinFadeOut(penguin);
					break;
			}
			break;
		case 23: 
			var penguin = d3.select(".secondFloorPenguinLeft");
			switch (elevator){
				case 1:
					movePenguinLeft(penguin);
					penguinFadeOut(penguin);
					break;
				case 2:
					movePenguinRight(penguin);
					penguinFadeOut(penguin);
			}
			break;
		case 24: 
			var penguin = d3.select(".secondFloorPenguinRight");
			switch (elevator){
				case 1:
					movePenguinLeft(penguin);
					penguinFadeOut(penguin);
					break;
				case 2:
					movePenguinRight(penguin);
					penguinFadeOut(penguin);
			}
			break;
		case 25: 
			var penguin = d3.select(".groundFloorPenguin");
			switch (elevator){
				case 1:
					movePenguinLeft(penguin);
					penguinFadeOut(penguin);
					break;
				case 2:
					movePenguinRight(penguin);
					penguinFadeOut(penguin);
			}
			break;
	}
}

function movePenguinLeft(penguin){
	penguin
	.transition()
	.duration(3000)
	.attr("x",10);	
	// .each("end", function() {
	// 	penguinFadeOut(penguin);
	// });
}

function movePenguinRight(penguin){
	penguin
	.transition()
	.duration(2000)
	.attr("x",430);
}

function penguinFadeOut(penguin){
		
		penguin
		.transition()
		.delay(3000)
		.duration(3000)
		.style("opacity", 0)
		.each("end", function(){
			penguin
			.transition()
			.attr("x",PENGUIN_MIDDLE);
		});
}

//--------------------------------------------------------------------------
// Controls the opacity of the left or right panel
// x = 1 = left panel, 2 = right panel; bool = true = visible, false = hidden
//--------------------------------------------------------------------------
function panelVisible(x, bool){ 

	var panel = d3.select(".panel" + x);
	if(bool === true){
		panel
		.transition()
		.duration(2000)
		.delay(2000)
		.style('opacity',100)	
	}else{
		panel
		.transition()
		.duration(900)
		.delay(4000)
		.style('opacity',0)	
	}
}