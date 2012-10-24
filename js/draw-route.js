/*
*
* Draws a dotted route on a map. Uses jquery.
*
*/
$(window).load(function() {

	//start & end coordinates of the straight lines that make up the route
	var coords = [
		[578,419]
		,[408,499]
		,[354,415]
		,[293,388]
		,[229,388]
		,[189,372]
		,[176,371]
		,[177,350]
		,[179,335]
		,[181,296]
		,[185,284]
		,[181,244]
		,[149,241]
		,[58,215]
		,[69,149]
	],
	allcoords = getAllCoords(coords); // get all the coordinates for the full route
	revealNextPoint(allcoords); //call the function to reveal the points on the map

});

//function to get all the inbetween coordinates given an array of 'waypoints'
var getAllCoords = function(coords){
	
	var all_coords = [];
	var point_gap = 9; //the distance (in pixels) between the points

	for(i=0;i<coords.length-1;i++) //for each segment
	{
		//start & end coords of the segment
		var x1 = coords[i][0];
		var y1 = coords[i][1];
		var x2 = coords[i+1][0];
		var y2 = coords[i+1][1];
		
		x1 = (x1 == x2) ? x1+.01 : x1; //to avoid cases where slope == infinity - which would break the calculations below
		
		var m = (y2-y1)/(x2-x1); //slope of the segment
		var d = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))); //length of the segment

		var x_next = x1;
		var y_next = y1;
					
		var x_step = (Math.abs(x1-x2))*point_gap/d; //how much the x-coord will increase/decrease by
		var num_dots = d/point_gap; //number of dots to draw for this segment
		x_step = (x1>x2) ? x_step * -1 : x_step; //figure out which direction we're moving in
		
		for (j=0; j<num_dots; j++){
			all_coords.push([x_next,y_next]);
			
			x_prev = x_next;
			x_next = x_next + x_step;
			y_next = (m*(x_next-x_prev))+y_next; //calculate the y-coord from the x-coord & the slope
			
		}
	}
	return all_coords;
};

// recursive function to reveal the points on the map
// given an array of coordinates to reveal, it displays
// the next one, removes it from the array and calls itself again
var revealNextPoint = function(allcoords){

	if (allcoords.length > 0) {
		var css = {
			left: allcoords[0][0]-2, // offset, so center is at origin
			top: allcoords[0][1]-2,
			opacity:0
		}
		var span = $('<span class="point"></span>').css(css);
		$('#map').append(span);
		
		allcoords.shift(); //remove this coordinate from the array

		$(span).animate({
			opacity: 1
		}, 70, "linear", function(){revealNextPoint(allcoords)} );

	}
};

