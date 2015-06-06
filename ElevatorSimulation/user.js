

// not mapping to the correct button yet

//--------------------------------------------------------------------------
// Creates elevator user
//--------------------------------------------------------------------------
function createUser(floor){

	switch (floor) {
		case 1:
			var dataset1 = [0];

			//Width and height
			var w = 80;
			var h = 1000;

			//Create SVG Element
			var svg = d3.select("body")
				.append("svg")
				.attr("width", 60)
				.attr("height", 1000)
				.attr("class", "penguin");
			//Import the plane
			d3.xml("https://rawgit.com/VengadoraVG/moving-to-gnulinux/master/img/tux.svg", "image/svg+xml", function(xml) {  
				var importedNode = document.importNode(xml.documentElement, true);
				svg.selectAll("g")
				.data(dataset1)
				.enter()
				.append("g")
				.attr("transform", function(d, i){ 
					return "translate(" + (i * w) + "," 
						+ h + ")"
				+"scale("+ 0 +")";
			})
			    .each(function(d, i){ 
			        var plane = this.appendChild(importedNode.cloneNode(true)); 
			        d3.select(plane).select("path").attr("fill", "blue");
			    })
			.transition()
			.duration(2000)
			.attr("transform", function(d, i){ 
				return "translate(" + (i * w) + "," 
					+ (h - d*4 - w) + ")"
			+"scale("+ 0.3 +")";
			});    
			});
				break;
			case 2:
				var dataset1 = [70];
				
			//Width and height
			var w = 80;
			var h = 1000;

			//Create SVG Element
			var svg = d3.select("body")
				.append("svg")
				.attr("width", 60)
				.attr("height", 1000);

			//Import the plane
			d3.xml("https://rawgit.com/VengadoraVG/moving-to-gnulinux/master/img/tux.svg", "image/svg+xml", function(xml) {  
				var importedNode = document.importNode(xml.documentElement, true);
				svg.selectAll("g")
				.data(dataset1)
				.enter()
				.append("g")
				.attr("transform", function(d, i){ 
					return "translate(" + (i * w) + "," 
						+ h + ")"
				+"scale("+ 0 +")";
			})
			    .each(function(d, i){ 
			        var plane = this.appendChild(importedNode.cloneNode(true)); 
			        d3.select(plane).select("path").attr("fill", "blue");
			    })
			.transition()
			.duration(2000)
			.attr("transform", function(d, i){ 
				return "translate(" + (i * w) + "," 
					+ (h - d*4 - w) + ")"
			+"scale("+ 0.3 +")";
			});    
			});
				break;
			case 3:
				var dataset1 = [135];
				
			//Width and height
			var w = 80;
			var h = 1000;

			//Create SVG Element
			var svg = d3.select("body")
				.append("svg")
				.attr("width", 60)
				.attr("height", 1000);
			//Import the plane
			d3.xml("https://rawgit.com/VengadoraVG/moving-to-gnulinux/master/img/tux.svg", "image/svg+xml", function(xml) {  
				var importedNode = document.importNode(xml.documentElement, true);
				svg.selectAll("g")
				.data(dataset1)
				.enter()
				.append("g")
				.attr("transform", function(d, i){ 
					return "translate(" + (i * w) + "," 
						+ h + ")"
				+"scale("+ 0 +")";
			})
			    .each(function(d, i){ 
			        var plane = this.appendChild(importedNode.cloneNode(true)); 
			        d3.select(plane).select("path").attr("fill", "blue");
			    })
			.transition()
			.duration(2000)
			.attr("transform", function(d, i){ 
				return "translate(" + (i * w) + "," 
					+ (h - d*4 - w) + ")"
			+"scale("+ 0.3 +")";
			});    
			});
				break;
			case 4:
				var dataset1 = [205];
				
			//Width and height
			var w = 80;
			var h = 1000;

			//Create SVG Element
			var svg = d3.select("body")
				.append("svg")
				.attr("width", 60)
				.attr("height", 1000);
			//Import the plane
			d3.xml("https://rawgit.com/VengadoraVG/moving-to-gnulinux/master/img/tux.svg", "image/svg+xml", function(xml) {  
				var importedNode = document.importNode(xml.documentElement, true);
				svg.selectAll("g")
				.data(dataset1)
				.enter()
				.append("g")
				.attr("transform", function(d, i){ 
					return "translate(" + (i * w) + "," 
						+ h + ")"
				+"scale("+ 0 +")";
			})
			    .each(function(d, i){ 
			        var plane = this.appendChild(importedNode.cloneNode(true)); 
			        d3.select(plane).select("path").attr("fill", "blue");
			    })
			.transition()
			.duration(2000)
			.attr("transform", function(d, i){ 
				return "translate(" + (i * w) + "," 
					+ (h - d*4 - w) + ")"
			+"scale("+ 0.3 +")";
			});    
			});
				break;

	}
}