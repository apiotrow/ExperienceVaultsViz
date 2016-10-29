document.addEventListener('DOMContentLoaded', function () {
	var globs = require('./js/phaservis/eevvStuff.js');
    var eevv = new globs.eevvStuff();
    var d3 = require('./js/phaservis/d3.min.js');
    var $ = require('./js/phaservis/jquery.js')

    // var completeCompiler = require('./js/phaservis/completeCompiler.js');
    // var compiler = new completeCompiler.compilerStuff();

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
    var svgH = 600;
    var svg = d3.select('#vis').append('svg').attr('width',svgW).attr('height',svgH).attr('id','bargSVG');

    //setup button area
    var buttonSVGW= 300;
    var buttonSVGH = 200;
    var buttonSVG = d3.select('#vis').append('svg').attr('width',buttonSVGW).attr('height',buttonSVGH).attr('id','buttonSVG');

    //choices that need to be buttons
    var statObject = statfiles.category_drug;
    var thresh = 200;

    //find a random group for the graph so we have something to render initially
    var keyNames = Object.keys(statObject);
    var randomKey = keyNames[Math.floor(Math.random() * keyNames.length)];
    keyNames = Object.keys(statObject[randomKey]);
    randomKey = keyNames[Math.floor(Math.random() * keyNames.length)];

    barGraphHoriz(statObject, randomKey, thresh);
    //render graph and buttons
    setupButtons(statObject, thresh, svg);
    // var secondButtonSVG = d3.select('#vis').append('svg').attr('width',buttonSVGW).attr('height',buttonSVGH).attr('id','secondButtonSVG');
    // setupButtons(statfiles.drug_context, thresh, secondButtonSVG);

    function setupButtons(statObject, thresh, svgToAppendTo){
    	var g = svgToAppendTo.append('svg:g');
    	var color = d3.scale.category20();
    	var buttonH = 20;
    	var buttonSpacing = 40;
    	var buttonRectPadding = 10;
    	var fontSize = 15;

    	var get = "";
    	for(key in statfiles){
	        if(statfiles[key] == statObject) {
		        get = statfiles[key.substring(key.indexOf('_') + 1)];
		    }    
	    }

    	var data = getStats1(get, "raw", thresh);

        var lastTextEnd = 0;
        var currRow = 0;

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

        	return textx;
        })
        .attr('y', 0) //placeholding. we'll change y later
        .attr("font-family", "sans-serif")
        .attr("dominant-baseline", "text-before-edge")
        .attr('id', 'buttontext')
        .attr('pointer-events', 'none');

        //run through button text and set height according to the row we set earlier
        g.selectAll('#buttontext').each(function () {
        	d3.select(this).attr(
        		'y', 
        		d3.select(this).attr('buttonRow') * buttonH);
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
        .attr('id','buttonRect')
        .on("mouseover", function() { 
        	d3.select(this).attr('stroke-width', 3);
        })
        .on("mouseout", function() { 
        	if(d3.select(this).attr('selected') != 'yes')
        		d3.select(this).attr('stroke-width', 1);
        });

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
    	d3.selectAll(".barGraphStuff").remove(); //remove current graph

        // console.log(statObject);
        var rawOrPerc = "perc";
        var data = getStats2(statObject, stat, rawOrPerc, thresh);
        // var data = getStats1(statObject, rawOrPerc, 1);

        var g = svg.append('svg:g').attr('class','barGraphStuff');

        var barH = bargH / data.length;
        var barAndTextPadding = 10;
        var color = d3.scale.category20();
        var barScale = d3.scale.linear().domain([data[data.length - 1][1], data[0][1]]).range([50, bargW - 60]);

        //bars
        var bars = 
        g.selectAll('rect').data(data).enter().append('rect')
        .style('fill', function(d,i){return color(i)})
        .attr('x', svgW - bargW)
        .attr('y', function(d,i){return (barH * i) + (svgH - bargH)})
        .attr('height', barH)
        .attr('width', function(d,i){return barScale(d[1])})
        .attr('class','bar')
        .attr('stroke','black')
        .attr('stroke-width', 1)
        .attr('id', 'bar')
        .attr('class','barGraphStuff')
        .on("mouseover", function() { 
        	// d3.select(this).attr('stroke','red') 
        	d3.select(this).attr('stroke-width', 4);

        	//bring bar to front, so outline won't be behind any nearby bar
        	this.parentNode.appendChild(this); 
        })
        .on("mouseout", function() { 
        	// d3.select(this).attr('stroke','black')
        	d3.select(this).attr('stroke-width', 1) ;
        });

        //text labels left of bars
        var barText = 
        g.selectAll('text').data(data).enter().append('text')
        .text(function(d,i){return d[0]})
        .attr('x', svgW - bargW - barAndTextPadding)
        .attr('y', function(d,i){return ((barH * i) + barH / 2) + (svgH - bargH)})
        .attr('text-anchor','end')
        .style("font-size", 15)
        .attr("font-family", "sans-serif")
        .attr("dominant-baseline", "central")
        .attr('class','barGraphStuff');

        //percent text at end of each bar
        bars.select('#percText').data(data).enter().append('text')
	    	.text(function(d,i){return (Math.floor(d[1] * 100) / 100) + "%"})
	    	.attr('x',  function(d,i){return barScale(d[1]) + ( svgW - bargW) + 5})
	    	.attr('y', function(d,i){return ((barH * i) + barH / 2) + (svgH - bargH)})
	    	.attr('id','percText')
	    	.style("font-size", 15)
        	.attr("font-family", "sans-serif")
        	.attr("dominant-baseline", "central")
        	.attr('class','barGraphStuff');

        //translucent box that overlays graph and represents the norm for the selected stat
        //i.e. for drug_category, the % of total reports that are of the selected category.
        //this shows in what direction each drug deviates from the norm, and by how much
        var avgBox = svg.append('svg:g');
        var p = "context_gender";
        avgBox.append('rect')
        .attr('x', svgW - bargW)
        .attr('y', (svgH - bargH))
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
        // .style('stroke','black')
        .style('opacity', 0.3)
        .attr('class','barGraphStuff')
        .attr('pointer-events', 'none');

        //top center text
        var graphTitle = svg.append('svg:g');
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
        .attr("font-family", "sans-serif")
        .attr('class','barGraphStuff');
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






    
});