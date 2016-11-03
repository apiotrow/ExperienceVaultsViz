//all the bar graph shit

module.exports = {
    doit: function(){
    	// var globs = require('./js/phaservis/eevvStuff.js');
     //    var eevv = new globs.eevvStuff();
        var d3 = require('./js/phaservis/d3.min.js');
        var $ = require('./js/phaservis/jquery.js')
    	var _ = require('./js/phaservis/lodash.js');

        //stat files
        var statfiles = {
             context: require('./JSONS/output/context.json'),
             context_drug: require('./JSONS/output/context_drug.json'),
             context_category :require('./JSONS/output/context_category.json'),
             context_gender :require('./JSONS/output/context_gender.json'),
             context_intensity: require('./JSONS/output/context_intensity.json'),
             context_nonsubstance: require('./JSONS/output/context_nonsubstance.json'),

             intensity: require('./JSONS/output/intensity.json'),
             intensity_context :require('./JSONS/output/intensity_context.json'),
             intensity_drug: require('./JSONS/output/intensity_drug.json'),
             intensity_category :require('./JSONS/output/intensity_category.json'),
             intensity_gender: require('./JSONS/output/intensity_gender.json'),
             intensity_nonsubstance: require('./JSONS/output/intensity_nonsubstance.json'),

             gender: require('./JSONS/output/gender.json'),
             gender_context :require('./JSONS/output/gender_context.json'),
             gender_intensity: require('./JSONS/output/gender_intensity.json'),
             gender_drug: require('./JSONS/output/gender_drug.json'),
             gender_category: require('./JSONS/output/gender_category.json'),
             gender_nonsubstance: require('./JSONS/output/gender_nonsubstance.json'),

             drug: require('./JSONS/output/drug.json'),
             drug_context: require('./JSONS/output/drug_context.json'),
             drug_intensity: require('./JSONS/output/drug_intensity.json'),
             drug_gender: require('./JSONS/output/drug_gender.json'),
             drug_category: require('./JSONS/output/drug_category.json'),
             drug_nonsubstance: require('./JSONS/output/drug_nonsubstance.json'),

             category: require('./JSONS/output/category.json'),
             category_context: require('./JSONS/output/category_context.json'),
             category_intensity: require('./JSONS/output/category_intensity.json'),
             category_gender: require('./JSONS/output/category_gender.json'),
             category_drug: require('./JSONS/output/category_drug.json'),
             category_nonsubstance: require('./JSONS/output/category_nonsubstance.json'),

             nonsubstance: require('./JSONS/output/nonsubstance.json'),
             nonsubstance_context: require('./JSONS/output/nonsubstance_context.json'),
             nonsubstance_intensity: require('./JSONS/output/nonsubstance_intensity.json'),
             nonsubstance_gender: require('./JSONS/output/nonsubstance_gender.json'),
             nonsubstance_drug: require('./JSONS/output/nonsubstance_drug.json'),
             nonsubstance_category: require('./JSONS/output/nonsubstance_category.json'),
        };






        //setup drawing area
        var svgW = 1000;
        var bargW = 500;
        var bargH = 570;
        var svgH = 670;
        var svg = d3.select('#vis').append('svg').attr('width',svgW).attr('height',svgH).attr('id','bargSVG');

        //choices that need to be buttons
        var currStatObject; //global holder for current statobject
        var thresh = 10;

        //find a random group for the graph so we have something to render initially
        randomKey = getRandomKey(statfiles.category_drug, thresh);

        barGraphHoriz(statfiles.category_drug, randomKey, thresh);
        //render graph and buttons
        setupButtons(statfiles.category_drug, thresh, svg, 300, 200, "particular", 0, 50);

        setupGroupButton(thresh, svg, 100, 150, "group1", svgW / 2 - 100, bargH + 100);
        setupGroupButton(thresh, svg, 100, 150, "group2", svgW / 2 + 100, bargH + 100);

        function setupGroupButton(thresh, svgToAppendTo, buttonSVGW, buttonSVGH, buttonClass, xOffset, yOffset){
        	var g = svgToAppendTo.append('svg:g');
        	var color = d3.scale.category20();
        	var buttonH = 20;
        	var buttonSpacing = 20;
        	var buttonRectPadding = 5;
        	var fontSize = 15;

        	var data = [];
        	for(key in statfiles){
    			if(key.indexOf('_') == -1) {
    				var dataEntry = [key, 0];
    				data.push(dataEntry);
    			}
    		}

    		var lastTextEnd = 0; //holder for the last button text's right end. used to prevent overflow.
            var currRow = 0; //iterator for setting up button rows

            //set button text
            var buttonText =
            g.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .style("font-size", fontSize)
            .attr('text-anchor','start')
            .text(function(d,i){return d[0]})
            .attr('x', function(d,i){
            	var textx = lastTextEnd;
            	lastTextEnd += this.getComputedTextLength() + buttonSpacing;
            	
            	//if this text is going off the edge of the SVG, start a new row.
            	//the + 20 is hardcoded ass, and is there to make the button, not text, edge
            	//is used to determine if button is off the SVG or not.
            	if(lastTextEnd + 20 > buttonSVGW){
            		currRow += 1;
            		textx = 0;
            		lastTextEnd = this.getComputedTextLength() + buttonSpacing;
            	}
            	
            	//set row property so we can adjust row Y later
            	d3.select(this).attr("buttonRow", currRow);

            	return textx + xOffset;
            })
            .attr('y', 0) //placeholding. we change y in the row setup below
            .attr("font-family", "sans-serif")
            .attr("dominant-baseline", "text-before-edge")
            .attr('id', 'buttontext')
            .attr('pointer-events', 'none');

            //run through button text and set height according to the row we set earlier
            g.selectAll('#buttontext').each(function () {
            	d3.select(this).attr(
            		'y', 
            		d3.select(this).attr('buttonRow') * buttonH + yOffset);
            });

            //collect info about each text for button
            var buttonLocations = [];
            g.selectAll('#buttontext').each(function () {
            	var buttonXY = [];
            	buttonXY.push(d3.select(this).attr('x'));
            	buttonXY.push(d3.select(this).attr('y'));
            	buttonXY.push(this.getComputedTextLength());
            	buttonXY.push(window.getComputedStyle(this).height);
            	buttonXY.push(data); //so we have access to the stat object
            	buttonLocations.push(buttonXY);
            });

            //create button rectangles using button dimenstions, etc
        	g.selectAll('rect').data(buttonLocations).enter().append('rect')
        	.attr('x', function(d,i){
        		return d[0] - buttonRectPadding;
        	})
        	.attr('y', function(d,i){
        		return d[1];
        	})
        	.attr('height', function(d,i){
        		return d[3];
        	})
        	.attr('width', function(d,i){
        		return d[2] + buttonRectPadding * 2;
        	})
        	.attr('class','bar')
        	.attr('stroke','black')
        	.style('fill', function(d,i){return color(i)})
        	.on("click", function(d,i){

    			var currGroup1;
    			var currGroup2;
    			var proposedGroup = d[4][i][0];

    			//get current 1st and 2nd group
    			for(key in statfiles){
    				if(statfiles[key] == currStatObject) {
    					currGroup1 = key.substring(0, key.indexOf('_'));
    					currGroup2 = key.substring(key.indexOf('_') + 1);
    		    	}
    			}

    			if(d3.select(this).attr('class') == "group1"){
    				if(currGroup1 != proposedGroup && currGroup2 != proposedGroup){
    					statObject = statfiles[proposedGroup + "_" + currGroup2];

    					randomKey = getRandomKey(statObject, thresh);

    				    d3.selectAll("#particularButtonsHolder").remove(); //remove current graph
    				    barGraphHoriz(statObject, randomKey, thresh);
    	   				setupButtons(statObject, thresh, svg, 300, 200, "particular", 0, 50);
    				}
    			}else if(d3.select(this).attr('class') == "group2"){
    				if(currGroup1 != proposedGroup && currGroup2 != proposedGroup){
    					statObject = statfiles[currGroup1 + "_" + proposedGroup];

    					randomKey = getRandomKey(statObject, thresh);

    				    d3.selectAll("#particularButtonsHolder").remove(); //remove current graph
    				    barGraphHoriz(statObject, randomKey, thresh);
    	   				setupButtons(statObject, thresh, svg, 300, 200, "particular", 0, 50);
    				}
    			}
       			

       			//set button outline to thick red and set every other button
       			//to regular (to unselect previously selected button)
       			g.selectAll('#buttonRect').each(function () {
            		d3.select(this).attr('stroke-width', 1);
            		d3.select(this).attr('stroke', 'black');
            		d3.select(this).attr('selected','no');
            	});
            	d3.select(this).attr('stroke-width', 3);
            	d3.select(this).attr('stroke', 'red');

            	//tag button with a property that says it's selected.
            	//we use this to prevent loss of selected button in .mouseout
            	d3.select(this).attr('selected', 'yes');
            })
            .attr('id', "buttonRect")
            .on("mouseover", function() { 
            	d3.select(this).attr('stroke-width', 3);
            })
            .on("mouseout", function() { 
            	if(d3.select(this).attr('selected') != 'yes')
            		d3.select(this).attr('stroke-width', 1);
            })
            .attr('class',buttonClass);

            //put separator between button groups
            // d3.select('#vis').append("hr");

        	//move text in front of buttons
        	g.selectAll('#buttontext').each(function(){
    	    	this.parentNode.appendChild(this);
    	  	});

        	//if we want to get bottomest button from buttons themselves
        	//rather than the original Y value we found
        	/*
    	  	var lowestButton = 0;
        	g.selectAll('#buttonRect').each(function(){
    	    	var y = parseFloat(d3.select(this).attr('y'));
    	    	if(y > lowestButton)
    	    		lowestButton = y;
    	  	});
    		*/

    		//if svg isn't tall enough to fit all buttons,
    	  	//make the button area SVG tall enough that it fits all the buttons
        	var highestY = buttonLocations[buttonLocations.length - 1][1];
        	var ynum = parseFloat(highestY);
        	if(svgToAppendTo.attr('height') < ynum + 30)
           		svgToAppendTo.attr('height', ynum + 30);

            //move entire g to the right so left side of buttons on left side don't chopped off
            g.attr('transform','translate(20,0)');
        }

        function setupButtons(statObject, thresh, svgToAppendTo, buttonSVGW, buttonSVGH, buttonClass, xOffset, yOffset){
        	var g = svgToAppendTo.append('svg:g').attr('id','particularButtonsHolder');
        	var color = d3.scale.category20();
        	var buttonH = 20;
        	var buttonSpacing = 20;
        	var buttonRectPadding = 5;
        	var fontSize = 15;

        	//get the raw numbers of the second group, so we can
        	//filter out ones that don't meet our chosen threshold
        	var data = [];

    		currStatObject = statObject; //so we have global access to statobject

    		// g.attr('class','particular');

        	for(key in statfiles){
    	        if(statfiles[key] == statObject) {
    	        	var getObject = statfiles[key.substring(key.indexOf('_') + 1)];
    	        	data = getStats1(getObject, "raw", thresh);
    		    }    
    	    }

            var lastTextEnd = 0; //holder for the last button text's right end. used to prevent overflow.
            var currRow = 0; //iterator for setting up button rows

            //set button text
            var buttonText =
            g.selectAll('text').data(data).enter().append('text')
            .style("font-size", fontSize)
            .attr('text-anchor','start')
            .text(function(d,i){return d[0]})
            .attr('x', function(d,i){
            	var textx = lastTextEnd;
            	lastTextEnd += this.getComputedTextLength() + buttonSpacing;
            	
            	//if this text is going off the edge of the SVG, start a new row.
            	//the + 20 is hardcoded ass, and is there to make the button, not text, edge
            	//is used to determine if button is off the SVG or not.
            	if(lastTextEnd + 20 > buttonSVGW){
            		currRow += 1;
            		textx = 0;
            		lastTextEnd = this.getComputedTextLength() + buttonSpacing;
            	}
            	
            	//set row property so we can adjust row Y later
            	d3.select(this).attr("buttonRow", currRow);

            	return textx + xOffset;
            })
            .attr('y', 0) //placeholding. we change y in the row setup below
            .attr("font-family", "sans-serif")
            .attr("dominant-baseline", "text-before-edge")
            .attr('id', 'buttontext')
            .attr('pointer-events', 'none');

            //run through button text and set height according to the row we set earlier
            g.selectAll('#buttontext').each(function () {
            	d3.select(this).attr(
            		'y', 
            		d3.select(this).attr('buttonRow') * buttonH + yOffset);
            });

            //collect info about each text for button
            var buttonLocations = [];
            g.selectAll('#buttontext').each(function () {
            	var buttonXY = [];
            	buttonXY.push(d3.select(this).attr('x'));
            	buttonXY.push(d3.select(this).attr('y'));
            	buttonXY.push(this.getComputedTextLength());
            	buttonXY.push(window.getComputedStyle(this).height);
            	buttonXY.push(data); //so we have access to the stat object
            	buttonLocations.push(buttonXY);
            });

            //create button rectangles using button dimenstions, etc
        	g.selectAll('rect').data(buttonLocations).enter().append('rect')
        	.attr('x', function(d,i){
        		return d[0] - buttonRectPadding;
        	})
        	.attr('y', function(d,i){
        		return d[1];
        	})
        	.attr('height', function(d,i){
        		return d[3];
        	})
        	.attr('width', function(d,i){
        		return d[2] + buttonRectPadding * 2;
        	})
        	.attr('class','bar')
        	.attr('stroke','black')
        	.style('fill', function(d,i){return color(i)})
        	.on("click", function(d,i){
    			barGraphHoriz(statObject, d[4][i][0], thresh);
       			
       			//set button outline to thick red and set every other button
       			//to regular (to unselect previously selected button)
       			g.selectAll('#buttonRect').each(function () {
            		d3.select(this).attr('stroke-width', 1);
            		d3.select(this).attr('stroke', 'black');
            		d3.select(this).attr('selected','no');
            	});
            	d3.select(this).attr('stroke-width', 3);
            	d3.select(this).attr('stroke', 'red');

            	//tag button with a property that says it's selected.
            	//we use this to prevent loss of selected button in .mouseout
            	d3.select(this).attr('selected', 'yes');
            })
            .attr('id', "buttonRect")
            .on("mouseover", function() { 
            	d3.select(this).attr('stroke-width', 3);
            })
            .on("mouseout", function() { 
            	if(d3.select(this).attr('selected') != 'yes')
            		d3.select(this).attr('stroke-width', 1);
            })
            .attr('class',buttonClass);

            //put separator between button groups
            // d3.select('#vis').append("hr");

        	//move text in front of buttons
        	g.selectAll('#buttontext').each(function(){
    	    	this.parentNode.appendChild(this);
    	  	});

        	//if we want to get bottomest button from buttons themselves
        	//rather than the original Y value we found
        	/*
    	  	var lowestButton = 0;
        	g.selectAll('#buttonRect').each(function(){
    	    	var y = parseFloat(d3.select(this).attr('y'));
    	    	if(y > lowestButton)
    	    		lowestButton = y;
    	  	});
    		*/

    		//if svg isn't tall enough to fit all buttons,
    	  	//make the button area SVG tall enough that it fits all the buttons
        	var highestY = buttonLocations[buttonLocations.length - 1][1];
        	var ynum = parseFloat(highestY);
        	if(svgToAppendTo.attr('height') < ynum + 30)
           		svgToAppendTo.attr('height', ynum + 30);

            //move entire g to the right so left side of buttons on left side don't chopped off
            g.attr('transform','translate(20,0)');
        }



        function barGraphHoriz(statObject, stat, thresh){
        	d3.selectAll(".barGraphStuff").selectAll("*").remove(); //remove current graph
        	var graphYOffset = 40;

            var rawOrPerc = "perc";

            var data = getStats2(statObject, stat, rawOrPerc, thresh);
            // var data = getStats1(statObject, rawOrPerc, 1);

            var graphHolderG = svg.append('svg:g').attr('class','barGraphStuff');

            var g = graphHolderG.append('svg:g');

            var barH = bargH / data.length;
            var barAndTextPadding = 10;
            var color = d3.scale.category20();
            var barScale = d3.scale.linear().domain([data[data.length - 1][1], data[0][1]]).range([50, bargW - 60]);

            //bars
            var bars = 
            g.selectAll('rect').data(data).enter().append('rect')
            .style('fill', function(d,i){return color(i)})
            .attr('x', svgW - bargW)
            // .attr('y', function(d,i){return (barH * i) + (svgH - bargH)})
            .attr('y', function(d,i){return (barH * i) + graphYOffset})
            .attr('height', barH)
            .attr('width', function(d,i){return barScale(d[1])})
            .attr('class','bar')
            .attr('stroke','black')
            .attr('stroke-width', 1)
            .attr('id', 'bar')
            .on("mouseover", function() { 
            	d3.select(this).attr('stroke-width', 4);

            	//bring bar to front, so outline won't be behind any nearby bar
            	this.parentNode.appendChild(this); 
            })
            .on("mouseout", function() { 
            	d3.select(this).attr('stroke-width', 1) ;
            });

            //text labels left of bars
            var barText = 
            g.selectAll('text').data(data).enter().append('text')
            .text(function(d,i){return d[0]})
            .attr('x', svgW - bargW - barAndTextPadding)
            .attr('y', function(d,i){return ((barH * i) + barH / 2) + graphYOffset})
            .attr('text-anchor','end')
            .style("font-size", 15)
            .attr("font-family", "sans-serif")
            .attr("dominant-baseline", "central");

            //percent text at end of each bar
          //   bars.select('#percText').data(data).enter().append('text')
    	    	// .text(function(d,i){return (Math.floor(d[1] * 100) / 100) + "%"})
    	    	// .attr('x',  function(d,i){return barScale(d[1]) + ( svgW - bargW) + 5})
    	    	// .attr('y', function(d,i){return ((barH * i) + barH / 2) + graphYOffset})
    	    	// .attr('id','percText')
    	    	// .style("font-size", 15)
          //   	.attr("font-family", "sans-serif")
          //   	.attr("dominant-baseline", "central");

            //translucent box that overlays graph and represents the norm for the selected stat
            //i.e. for drug_category, the % of total reports that are of the selected category.
            //this shows in what direction each drug deviates from the norm, and by how much
            var avgBox = graphHolderG.append('svg:g');
            var p = "context_gender";
            avgBox.append('rect')
            .attr('x', svgW - bargW)
            .attr('y', graphYOffset)
            .attr('height', bargH)
            .attr('width', function(){
                //e.g. if picked category_context.json, get stat from context.json
                for(key in statfiles){
                    if(statfiles[key] == statObject) {
                        return barScale(statfiles[key.substring(key.indexOf('_') + 1)][stat][rawOrPerc]);
                    }    
                }
            })
            .style('fill','blue')
            .style('opacity', 0.3)
            .attr('pointer-events', 'none');

            //top center text
            var graphTitle = graphHolderG.append('svg:g');
            graphTitle.append('text').text(function(){
                //get object name for json we picked
                for(key in statfiles){
                    if(statfiles[key] == statObject)
                        // return key + ": " + stat;
                    	return stat;
                }
            })
            .attr('x', svgW / 2)
            .attr('y', 20)
            .attr('text-anchor','middle')
            .attr("font-family", "sans-serif");
        }

        function getRandomKey(statObject, thresh){

        	var keyNames1 = Object.keys(statObject);
    	    var randomKey1 = keyNames1[Math.floor(Math.random() * keyNames1.length)];
    	    var keyNames2 = Object.keys(statObject[randomKey1]);
    	    var randomKey2 = keyNames2[Math.floor(Math.random() * keyNames2.length)];
    	    
    		var inf = 0;

            while(randomKey1 === undefined || randomKey2 === undefined){
                keyNames1 = Object.keys(statObject);
                randomKey1 = keyNames1[Math.floor(Math.random() * keyNames1.length)];
                keyNames2 = Object.keys(statObject[randomKey1]);
                randomKey2 = keyNames2[Math.floor(Math.random() * keyNames2.length)];
            }

            console.log(console.log(randomKey1 + ", " + randomKey2));

    	    while(statObject[randomKey1][randomKey2]['total'] < thresh){
    	    	// console.log(randomKey2);
    	    	// console.log(statObject[randomKey1][randomKey2]);
    	    	randomKey1 = keyNames1[Math.floor(Math.random() * keyNames1.length)];
    	    	randomKey2 = keyNames2[Math.floor(Math.random() * keyNames2.length)];
    	    	inf++;
    	    	if (inf > 100){
    	    		console.log("invinie");
    	    		 break;
    	    	}
    	    }

    	    return randomKey2;
        }

        //for statfiles with only 1 group
        //outputs sorted array for chosen stat (raw, perc, whatever)
        function getStats1(file, stat, thresh)
        {
            var sortable=[];
            for(var key in file)
                if(file.hasOwnProperty(key)
                	&& file[key]["raw"] >= thresh)
                    sortable.push([key, file[key][stat]]);

            sortable.sort(function(a, b){
                return b[1]-a[1];
            });
            return sortable;
        }

        //for statfiles where two groups are compared.
        //outputs a sorted array with the chosen group and stat.
        //---
        //file is context_gender or whatever
        //group is the value for gender we want, e.g. "Female", "Not-Specified"
        //stat is raw, perc, total, whatever
        //thresh is minimum total (to avoid the top being 100% for something with 1 entry)
        function getStats2(file, group, stat, thresh)
        {
            var sortable=[];
            for(var key in file)
                // if(file.hasOwnProperty(key)){
                    //make sure it has an entry for "Female" or whatever.
                    //if it doesn't, that means it was 0
                    if(file[key].hasOwnProperty(group)
                         && file[key][group]["total"] >= thresh)
                        sortable.push([key, file[key][group][stat]]);
                // }

            sortable.sort(function(a, b){
                return b[1]-a[1];
            });
            return sortable;
        }

        function clone(obj) {
    	    if(obj == null || typeof(obj) != 'object')
    	        return obj;    
    	    var temp = new obj.constructor(); 
    	    for(var key in obj)
    	        temp[key] = clone(obj[key]);    
    	    return temp;
    	}
    }
}

