/*
*
* Game of 'Connect the dots' using jquery & CSS3
*
*/
$(document).ready(function() {

	var coords = [
		[0,300]
		,[100,200]
		,[100,100]
		,[0,100]
		,[0,250]
		,[200,350]
		,[400,350]
		,[200,150]
		,[50,350]
	];

	for(i=0;i<coords.length;i++) {

		css = {
			left: coords[i][0]-6,
			top: coords[i][1]-17,
			zIndex: coords.length-i //to ensure lower numbers are on top of higher ones in case of ovarlap
		}
		
		class_active = (i == 0) ? ' active' : '';
		div = $('<div id="dot_container_'+i+'" order_value="'+i+'" class="dot_container'+class_active+'"><div class="dot"></div><div class="dot_number">'+(i+1)+'</div></div>').css(css);
		$('#canvas').append(div);
	}
	
	$('.dot_container').click(function(){
		
		if ($(this).hasClass('active')) {
		
			i = parseInt($(this).attr('order_value'));
			
			//take active class off current dot
			$(this).removeClass('active');
			
			//make the next dot active
			if (i < coords.length)
				$('div#dot_container_'+(i+1)).addClass('active');
			

			//if it's the first dot, exit
			if (i== 0)
				return false;

			//draw line from previous dot to this dot
			x1 = coords[i-1][0];
			y1 = coords[i-1][1];
			x2 = coords[i][0];
			y2 = coords[i][1];
			
			x1 = (x1 == x2) ? x1+.01 : x1; //to avoid cases where slope == infinity - which would break the calculations below
			
			var m = (y2-y1)/(x2-x1); //slope of the segment
			var d = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))); //length of the segment
			var angle = (Math.atan(m))*180/(Math.PI);
			
			alert('m:'+m+', angle:'+angle);
			
			//if it's the last dot, reveal the image
			if (i == coords.length-1){
				revealImage();
			}
			
		}
		
		//add active class to next dot	
	});
	


//	$('#line1-transformed').animate({
//		width: '200px'
//	}, 600, "linear");

var revealImage = function(){
	alert('cd');
}

	
});
