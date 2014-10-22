$(document).ready(function() {
	var useRandomColor = false;
	var fadeToWhite = false;
	var grayScale = false;

	$("body").on("mouseenter", ".grid-box", function() {
		if (grayScale)
		{
			var count = $(this).data("grayscale");
			if (count < 10) count++;
			$(this).data("grayscale", count);
			color = 256 - Math.floor(25.6*count);
			$(this).css({"background-color": "rgb("+color+", "+color+", "+color+")"});
			console.log("count: " + count);
		}
		else  // not grayscale
		{
			if (useRandomColor)
			{
				red = Math.floor((Math.random() * 256) + 1);
				blue = Math.floor((Math.random() * 256) + 1);
				green = Math.floor((Math.random() * 256) + 1);
				$(this).stop(true, true).css({"background-color": "rgb("+red+", "+green+", "+blue+")"});
			}
			else
			{
				$(this).stop(true, true).css({"background-color": "black"});
			}
			if (fadeToWhite)
			{
				$(this).stop(true, true).fadeTo(1000, 0, function() {
					$(this).css({"background-color": "white", "opacity": "1"});
				});
			}
		}
	});

	$("#newGrid").click(function() { promptForNewGridSize(); });
	$("#clearGrid").click(function() { clearGrid(); });
	$("#randomColor").click(function() { useRandomColor = !useRandomColor; });
	$("#fadeToWhite").click(function() { 
		$(".grid-box").fadeTo(1000, 0, function() {
			$(this).css({"background-color": "white", "opacity": "1"});
		});
		fadeToWhite = !fadeToWhite; 
	});
$("#grayScale").click(function() { 
	grayScale = !grayScale; 
	useRandomColor = false;
	fadeToWhite = false;
});
	
	// Create initial grid
	makeGrid(32);
});

function promptForNewGridSize()
{
	makeGrid(prompt("Number of rows"));
}

function clearGrid()
{
	$(".grid-box").css({"background-color": "white"});
	$('.grid-box').data("grayscale", "0");
}

function makeGrid(numGrids)
{
	var $grid = $("#grid");
	$grid.html("");
	for (var i = 0; i<numGrids; i++)
	{
		var $grid = $("#grid");
		var $tr = $("<tr>");
		$grid.append($tr);
		for (var j=0; j<numGrids; j++)
		{
			$tr.append("<td class='grid-box' data-grayscale='0'></td>");
		}
		$grid.append("</tr>");
	}	
	var dim = 960 / numGrids;
	$(".grid-box").css({"height":dim+"px", "width":dim+"px"});
}

