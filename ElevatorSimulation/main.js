var leftElevator;
var rightElevator;

//--------------------------------------------------------------------------
// Runs when html is loaded
//--------------------------------------------------------------------------
function main() {
	// panelVisible(1, false);
	// panelVisible(2, false);

	console.log("initializing 2 elevators");
	leftElevator = new Elevator(ELEV_LEFT);
	rightElevator = new Elevator(ELEV_RIGHT);
	console.log(leftElevator);
}
