
//--------------------------------------------------------------------------
// Checks array for floor number if it is stored 
//--------------------------------------------------------------------------
function contains(array, floor){
	for (i=0;i<3;i++){
		if (array[i] === floor){
			return true;
		}
	}
	return false;
}

//--------------------------------------------------------------------------
// Removes element from array after finding it
//--------------------------------------------------------------------------
function removeFloorFromArray(array, floor){
	var index = array.indexOf(floor);
	if (index > -1){
		array.splice(index, 1);
	}
}
