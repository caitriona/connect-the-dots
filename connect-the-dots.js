/*
*
* Game of 'Connect the dots' using jquery & CSS3
*
*/
$(document).ready(function() {

	var coords = [
		[177,333]
		,[230,476]
		,[481,176]
		,[455,144]
		,[443,112]
		,[473,77]
		,[501,61]
		,[512,75]
		,[548,102]
		,[542,118]
		,[543,139]
		,[526,154]
	];

	for(i=0;i<coords.length;i++) {

		css = {
			left: coords[i][0]-6,
			top: coords[i][1]-17,
			zIndex: coords.length-i
		}
		
		class_active = (i == 0 ) ? ' active' : '';
		div = $('<div id="dot_'+(i+1)+'" class="dot_container'+class_active+'"><div class="dot"></div><div class="dot_number">'+(i+1)+'</div></div>').css(css);
		$('#canvas').append(div);
	}
	
	$('.active .dot').click(function(){
		//if not first, draw line to next dot
		
		//take active class off current dot
		
		//add active class to next dot	
	});


	$('#line1-transformed').animate({
		width: '200px'
	}, 600, "linear");


	
});
