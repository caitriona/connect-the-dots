/*
*
* Game of 'Connect the dots' using jquery & CSS3
*
*/
$(document).ready(function() {

	var coords = [
		[192,27]
		,[183,55]
		,[307,375]
		,[192,521]
		,[67,566]
		,[28,625]
		,[47,691]
		,[98,721]
		,[184,688]
		,[229,621]
		,[306,461]
		,[343,436]
		,[379,465]
		,[456,789]
		,[504,809]
		,[557,780]
		,[575,694]
		,[517,550]
		,[454,514]
		,[374,372]
		,[443,133]
		,[460,16]
		,[336,306]
		,[199,40]
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
			
			//if it's the first dot, no line to draw, just make the next dot active
			if (i== 0){
				$('div#dot_container_'+(i+1)).addClass('active'); //make next dot active
				return false;
			}

			//draw line from previous dot to this dot
			x1 = coords[i-1][0];
			y1 = coords[i-1][1];
			x2 = coords[i][0];
			y2 = coords[i][1];
			
			var m = (y2-y1)/(x2-x1); //slope of the segment
			var angle = (Math.atan(m))*180/(Math.PI);
			var d = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))); //length of the segment
            var transform;

            if (x2 >= x1){
                transform = (360 + angle) % 360;
            } else {
                transform = 180 + angle;
            }

			var id ='line_'+new Date().getTime()
			var line = "<div id='"+id+"'class='line'>&nbsp;</div>";
			
			$('#canvas').append(line);
			
			$('#'+id).css({
				'left': x1,
				'top': y1,
				'width': '0px',
				'transform' : 'rotate('+transform+'deg)',
				'transform-origin' : '0px 0px',
				'-ms-transform' : 'rotate('+transform+'deg)',
				'-ms-transform-origin' : '0px 0px',
				'-moz-transform' : 'rotate('+transform+'deg)',
				'-moz-transform-origin' : '0px 0px',
				'-webkit-transform' : 'rotate('+transform+'deg)',
				'-webkit-transform-origin' : '0px 0px',
				'-o-transform' : 'rotate('+transform+'deg)',
				'-o-transform-origin' : '0px 0px'
			});

			$('#'+id).animate({
				width: d,
				}, 400, "linear", function(){
						//make the next dot active
						if (i < coords.length)
							$('div#dot_container_'+(i+1)).addClass('active');
					});

			
			//if it's the last dot, reveal the image
			if (i == coords.length-1){
				revealImage();
			}
			
		}
		
	});

var revealImage = function(){
	//do stuff
}

	
});
