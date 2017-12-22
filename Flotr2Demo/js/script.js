var container = document.getElementById('container');
var start = (new Date).getTime();
var data, graph, offset, i;
var mode = 1;
var fmode = 1; // 1- basic sin, 2 - sin(1/x)

// toggle mode
function toggleMode(i) {
	mode = i;
}
// toggle func
function toggleFunc(i) {
	fmode = i;
}

// Draw a sine curve at time t
function animateSine(t) {
	data = [];
	data2 = [];

	// little offset between steps
	offset = 2 * Math.PI * (t - start) / 10000;

	if(fmode == 2 && offset > 15) {
		start = t;
	}

	for(i = 0; i < 4 * Math.PI; i += 0.2) {
		if(fmode == 1) {
			data.push([i, Math.sin(i - offset)]);
			data2.push([i, Math.sin(i * 2 - offset)]);
		} else if(fmode == 2) {
			data.push([i, Math.sin(1 / (i - offset))]);
			// data2.push([i, Math.sin(1/(i*2-offset))]);
		}
	}

	// prepare properties
	var properties;
	switch(mode) {
		case 1:
			properties = {
				yaxis: {
					max: 2,
					min: -2
				}
			};
			break;
		case 2:
			properties = {
				yaxis: {
					max: 2,
					min: -2
				},
				bars: {
					show: true,
					horizontal: false,
					shadowSize: 0,
					barWidth: 0.5
				}
			};
			break;
		case 3:
			properties = {
				yaxis: {
					max: 2,
					min: -2
				},
				radar: {
					show: true
				},
				grid: {
					circular: true,
					minorHorizontalLines: true
				}
			};
			break;
		case 4:
			properties = {
				yaxis: {
					max: 2,
					min: -2
				},
				bubbles: {
					show: true,
					baseRadius: 5
				},
			};
			break;
	}

	// draw graph
	if(fmode == 1) {
		graph = Flotr.draw(container, [data, data2], properties);
	} else if(fmode == 2) {
		graph = Flotr.draw(container, [data], properties);
	}

	// main loop
	setTimeout(function() {
		animateSine((new Date).getTime());
	}, 10);
}

animateSine(start);