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
    var svgW = 900;
    var bargW = 600;
    var bargH = 570;
    var svgH = 600;
    var svg = d3.select('#vis').append('svg').attr('width',svgW).attr('height',svgH).attr('id','bargSVG');

    //setup drug button area
    var buttonSVGW= 900;
    var buttonSVGH = 350;
    var buttonSVG = d3.select('#vis').append('svg').attr('width',buttonSVGW).attr('height',buttonSVGH).attr('id','buttonSVG');

    
    var statObject = statfiles.drug_category;
    barGraphHoriz(statObject, eevv.categories.badTrip);
    setupButtons(statObject);

    // var statObject = statfiles.context;
    // barGraphHoriz(statObject);
    // setupButtons(statObject);

    function setupButtons(statObject){
    	var g = buttonSVG.append('svg:g');
    	var color = d3.scale.category20();
    	var buttonH = 40;
    	var buttonW = 80;
    	var buttonSpacing = 10;

    	var get = "";
    	for(key in statfiles){
	        if(statfiles[key] == statObject) {
		        get = statfiles[key.substring(key.indexOf('_') + 1)];
		    }    
	    }

    	var data = getStats1(get, "raw", 200);
    	console.log(data);

        var lastTextEnd = 0;
        var currRow = 0;

        //set button text
        var buttonText =
        g.selectAll('text').data(data).enter().append('text')
        .style("font-size", 20)
        .attr('text-anchor','start')
        .text(function(d,i){return d[0]})
        .attr('x', function(d,i){
        	var textx = lastTextEnd;
        	lastTextEnd += this.getComputedTextLength() + 30;
        	
        	//if this text is going off the edge of the SVG, start a new row
        	if(lastTextEnd > buttonSVGW){
        		currRow += 1;
        		textx = 0;
        		lastTextEnd = this.getComputedTextLength() + 30;
        	}
        	
        	//set row property so we can adjust row Y later
        	d3.select(this).attr("buttonRow", currRow);

        	return textx;
        })
        .attr('y', 0) //placeholding. we'll change y later
        .attr("font-family", "sans-serif")
        .attr("dominant-baseline", "text-before-edge")
        .attr('id', 'buttontext');

        //run through button text and set height according to the row we set earlier
        g.selectAll('#buttontext').each(function () {
        	d3.select(this).attr(
        		'y', 
        		d3.select(this).attr('buttonRow') * buttonH + 20);
        });

        // var r = buttonSVG.append('svg:g');

        //collect info about each text for button
        var buttonLocations = [];
        g.selectAll('#buttontext').each(function () {
        	var buttonXY = [];
        	buttonXY.push(d3.select(this).attr('x'));
        	buttonXY.push(d3.select(this).attr('y'));
        	buttonXY.push(this.getComputedTextLength());
        	buttonXY.push(window.getComputedStyle(this).height);
        	buttonLocations.push(buttonXY);
        });

        //create button rectangles using button dimenstions, etc
    	g.selectAll('rect').data(buttonLocations).enter().append('rect')
    	.attr('x', function(d,i){
    		return d[0];
    	})
    	.attr('y', function(d,i){
    		return d[1];
    	})
    	.attr('height', function(d,i){
    		return d[3];
    	})
    	.attr('width', function(d,i){
    		return d[2];
    	})
    	.attr('class','bar')
    	.attr('stroke','black')
    	.style('fill', function(d,i){return color(i)});

    	//move text in front of buttons
    	g.selectAll('#buttontext').each(function(){
	    	this.parentNode.appendChild(this);
	  	});
    }

    function barGraphHoriz(statObject, stat){
    	svg.selectAll("*").remove(); //remove current graph

        // console.log(statObject);
        var rawOrPerc = "perc";
        var data = getStats2(statObject, stat, rawOrPerc, 200);
        // var data = getStats1(statObject, rawOrPerc, 1);

        var g = svg.append('svg:g');

        var barH = bargH / data.length;
        var barAndTextPadding = 10;
        var color = d3.scale.category20();
        var barScale = d3.scale.linear().domain([data[data.length - 1][1], data[0][1]]).range([50, bargW]);

        //bars representing stat
        var bars = 
        g.selectAll('rect').data(data).enter().append('rect')
        .style('fill', function(d,i){return color(i)})
        .attr('x', svgW - bargW)
        .attr('y', function(d,i){return (barH * i) + (svgH - bargH)})
        .attr('height', barH)
        .attr('width', function(d,i){return barScale(d[1])})
        .attr('class','bar')
        .attr('stroke','black');

        //text labels left of bars
        var barText = 
        g.selectAll('text').data(data).enter().append('text')
        .text(function(d,i){return d[0]})
        .attr('x', svgW - bargW - barAndTextPadding)
        .attr('y', function(d,i){return ((barH * i) + barH / 2) + (svgH - bargH)})
        .attr('text-anchor','end')
        .style("font-size", 15)
        .attr("font-family", "sans-serif")
        .attr("dominant-baseline", "central");

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
        .style('opacity', 0.3);

        //top center text
        var graphTitle = svg.append('svg:g');
        graphTitle.append('text').text(function(){
            //get object name for json we picked
            for(key in statfiles){
                if(statfiles[key] == statObject)
                    return key + ": " + stat;
            }
        })
        .attr('x', svgW / 2)
        .attr('y', 20)
        .attr('text-anchor','middle');
    }


/*
    function barGraphOne(){
        var g = svg.append("svg:g");
        var margin_x = 32;
        var margin_y = 20;

        //BAR GRAPH
        //---
        var testfile = statfiles.context_gender;
        var gender = "Female";
        var data = getStats2(testfile, gender, "raw", 250);
        console.log(data);

        var y = d3.scaleLinear().domain([0, data[0][1]]).range([0 + margin_y, svgH - margin_y]);
        var x = d3.scaleLinear().domain([0, data.length]).range([0 + margin_x, svgW - margin_x]);
        // var x = d3.scaleOrdinal().band([0,svgW]);


        //numbers on scale
        g.selectAll('.yLabel').data(y.ticks(5)).enter().append('svg:text').attr('class','yLabel')
        .text(String).attr('x',25).attr('y', function(d,i){return svgH - y(d)}).attr('text-anchor','end');

        //%s on scale
        g.selectAll('.yPercents').data(y.ticks(5)).enter().append('svg:text').attr('class','yPercents').text("%")
        .attr('x',25).attr('y', function(d,i){return svgH - y(d)});

        //horizonal grid lines
        var yGrid = g.selectAll('.yGrid').data(y.ticks(5)).enter().append('svg:line').attr('class','yGrid')
        .attr('x1', 0).attr('y1', function(d,i){return svgH - y(d)})
        .attr('x2', svgW).attr('y2', function(d,i){return svgH - y(d)}).attr('stroke','gray');

        //bars
        var bar = g.selectAll('rect')
        .data(data).enter().append('rect')
        .attr('x',function(d,i){return x(i);})
        .attr('y', function(d,i){return svgH - y(d[1]);}) //top of bars
        .attr('height',function(d,i){return y(d[1]) - margin_y;}) //don't go past bottom margin
        .attr('width', 20)
        .style('fill','blue')
        .style('opacity', 1)
        .attr('class','bar');



        //bar labels
        var labels = g.selectAll(".bar").enter().data(data).enter().append('svg:text')
        .text(function(d,i){return d[0];})
        .attr('x',function(d,i){return x(i);})
        .attr('y', function(d,i){return svgH - y(d[1]);})
        // .attr('dx',function(d,i){return x(i);})
        // .attr('dy', function(d,i){return svgH - y(d[1]);})
        .attr("transform", function(d,i){return "rotate("+-25+","+x(i)+"," +(svgH - y(d[1]))+")";})
        .attr('class','barlabel');
        // g.selectAll('.barlabel').attr('transform','translate(20,0)');


        // labels.attr('transform','translate(20,0)');
        bar.attr('transform','translate(20,0)'); //push them right so scale numbers aren't on top
        yGrid.attr('transform','translate(50,0)');
        // g..attr('transform', 'rotate(30, 150, 100)');

        //load gender alone data
        testfile = statfiles.gender;
        data = getStats1(testfile, "perc", 1);

        //make translucent block showing the average
        var avgBlock = g.append('rect').attr('x', 50).attr('y', y(testfile[gender]['perc']))
        .attr('width', svgW).attr('height', y(testfile["Female"]['perc']) - margin_y)
        .style('opacity', 0.5).style('fill','orange');
    }

    function firstTests(){
        // var circ1 = circ(g, 40, 30, 15, 'blue', 'green');
        // var rect1 = rect(g, 50, 100, 10, 100);

        // rect1.attr('transform', 'translate(100, 60),scale(2, 1),rotate(30, 150, 100)');
        // rect1.attr('transform', 'scale(2, 1)');
        // rect1.attr('transform', 'rotate(30, 150, 100)');

        //expanding circle
        // circ1.transition().delay(100).duration(4000).attr('r',50).attr('cx', 90).style('fill','red');

        //make shape functions
        function circ(obj, cx, cy, r, fill, outline){
            return obj.append('circle').attr('r',r).attr('cx', cx).attr('cy', cy).style('fill', fill).style('stroke',outline);
        }

        function rect(obj, x, y, w, h){
            return obj.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h);
        }


        //bullet list
        d3.select('body').append('ul');
        d3.select('ul').selectAll('li').data(data).enter().append('li').text(function(d){
            return(d[0] + ": " + d[1]);
        });

        // var selection = d3.selectAll("div");
        // selection.text("hey");

        // d3.selectAll("div")
        // .text("yoyo")
        // .style('text-align','left')
        // .append("p")
        // .text("hi");

        // d3.select("div").append('p').text("yes");

        // d3.select('body').insert('div', 'div:nth-child(3)').text("yee");

        // console.log(d3.selectAll("div").text());
        // d3.select("h1").attr('align',"center").html('<h2>heyguys</h2>');

        // d3.select('body').html("<h1>fuck you</h1>");
    }

*/









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
            if(file.hasOwnProperty(key)){
                //make sure it has an entry for "Female" or whatever.
                //if it doesn't, that means it was 0
                if(file[key].hasOwnProperty(group)
                     && file[key][group]["total"] >= thresh)
                    sortable.push([key, file[key][group][stat]]);
            }

        sortable.sort(function(a, b){
            return b[1]-a[1];
        });
        return sortable;
    }






    
});