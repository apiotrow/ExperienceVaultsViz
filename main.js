document.addEventListener('DOMContentLoaded', function () {

	//to render old visualizations
	
	// var vizzes = {
	// 	bargraphs1: require('./eevv-bargraphs1.js'),
	// 	circleexperiment: require('./eevv-circleexperiment.js')
	// }
	// var bargraphs = vizzes.bargraphs1;
	// bargraphs.doit();

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

    var d3 = require('./js/phaservis/d3.min.js');
	var eevvStuffFile = require('./js/phaservis/eevvStuff.js');
	var eevv = new eevvStuffFile.eevvStuff();
	// var W = require('pyrsmk-w');

	// var newW = W.getViewportWidth() - 100;
	// var newH = W.getViewportHeight() - 100;

	// function resize() {
	//   /* Update graph using new width and height (code below) */
	//   console.log(W.getViewportHeight());

	//   // console.log( document.getElementById('container').offsetWidth);
	//   newW = W.getViewportWidth() - 100;
	//   newH = W.getViewportHeight() - 100;
	//   // d3.select("div#container").attr('width',"100%");
	//   svg.attr('width',newW);
	//   svgBG.attr('width',newW);

	//   svg.attr('height',newH);
	//   svgBG.attr('height',newH);
	// }

	// d3.select(window).on('resize', resize); 


    

    var w = 200;
    var h = 100;

    var svg = 
    d3.select("div#container")
	.append("svg")
	.attr("preserveAspectRatio", "xMinYMin meet")
  	.attr("viewBox", "0 0 " + w + " " + h)
  	.classed("svg-content", true);


    var svgBG = svg
    .append('rect')
    .style('fill', 'black')
    .attr('width', w)
    .attr('height', h);


    var drugs = eevv.drugsto100;
    var categories = eevv.categories;
    var data = [];
    file = statfiles.drug;
    for(var key in drugs){
    	if(drugs[key] in file){
	    	var drugName = drugs[key];
	    	var perc = file[drugs[key]]['perc'];

	    	var dataEntry = [drugName, perc];
	    	data.push (dataEntry);
	    }else{
	    	console.log(drugs[key] + " not in files");
	    }
    }

    
    console.log(data[6][1]);

    var barGraphG = svg.append('svg:g').attr('transform','translate(100,0)scale(1,1)');

    var barScale = d3.scale.linear().domain([data[data.length - 1][1], data[0][1]]).range([1, 85]);

    var bars = barGraphG
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('stroke','#00ff00')
    .attr('stroke-width', 0.2)
    .style('fill', "black")
    .attr('x', 0)
    .attr('y', function(d,i) {return i * (h / data.length)})
    .attr('height', h / data.length)
    .attr('width', function(d,i) {return barScale(d[1])})
    .on('mouseover', function(){
    	d3.select(this).attr('stroke','yellow');
    	d3.select(this).attr('stroke-width', 0.5);
    	this.parentNode.appendChild(this); 
    })
    .on('mouseout', function(){
    	d3.select(this).attr('stroke','#00ff00');
    	d3.select(this).attr('stroke-width', 0.2);
    });

    var barText = 
    barGraphG.selectAll('text').data(data).enter().append('text')
    .text(function(d,i){return d[0]})
    .attr('x', function(d,i) {return barScale(d[1])})
	.attr('y',  function(d,i) {return i * (h / data.length) + h / data.length})
    .attr('text-anchor','start')
    .style("font-size", 2)
    .attr("font-family", "sans-serif")
    .attr("dominant-baseline", "text-after-edge")
    .style('fill', "#00ff00");

});