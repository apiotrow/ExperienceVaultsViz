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
	// var eevv = new eevvStuffFile.eevvStuff();
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
    .attr('stroke','#00ff00')
    .attr('stroke-width', 0.2)
    .attr('width', w)
    .attr('height', h);


    var group1 = "drug";
    var group2 = "category";
    var group2item = "Mystical Experiences";
    // var group1ItemList = eevv[group1];
   
    var file = statfiles[group1 + "_" + group2];
    var expected = statfiles[group2][group2item]['perc'];
    var data = [];


    for(i in statfiles[group1]){


    	var sampleSize = statfiles[group1][i]['raw'];

    	if(sampleSize > 100){

	    	//particular drug
	    	var item = i;

			//if drug_category has this drug, and if drug_category[drug] has any bad trips
			//put amount of bad trips for this drug in data
	    	if(file.hasOwnProperty(item) && file[item].hasOwnProperty(group2item)){
	    		var drugName = item;
	    		var perc = file[item][group2item]['perc'] - expected;
	    		var dataEntry = [drugName, perc];
	    		data.push (dataEntry);
	    	}else{
		    	// console.log(item + " not in " + group1 + "_" + group2);
		    }
		}
    }



    //ex: doing drug_category, with bad trips as chosen option
    //
    //for every drug in eevv.drugs
  //   for(i in group1ItemList){

  //   	//particular drug
  //   	var item = group1ItemList[i];

		// //if drug_category has this drug, and if drug_category[drug] has any bad trips
		// //put amount of bad trips for this drug in data
  //   	if(file.hasOwnProperty(item) && file[item].hasOwnProperty(group2item)){
  //   		var drugName = item;
  //   		var perc = file[item][group2item]['perc'] - expected;
  //   		var dataEntry = [drugName, perc];
  //   		data.push (dataEntry);
  //   	}else{
	 //    	console.log(item + " not in " + group1 + "_" + group2);
	 //    }
  //   }
        

    var dataMin = 9999999;
    var dataMax = -9999999;

    for(key in data){
    	if(data[key][1] < dataMin){
    		dataMin = data[key][1];
    	}
    }

   	for(key in data){
    	if(data[key][1] > dataMax){
    		dataMax = data[key][1];
    	}
   	}





    // for(var key in file){
    // 	if(file[key] in file){
	   //  	var drugName = group[key];
	   //  	var perc = file[group[key]]['perc'];

	   //  	var dataEntry = [drugName, perc];
	   //  	data.push (dataEntry);
	   //  }else{
	   //  	console.log(group[key] + " not in files");
	   //  }
    // }
    // data.sort(function(a, b){
    //     return b[1]-a[1];
    // });
	data.sort(function(a, b){
        return b[1]-a[1];
    });


    var hh = svg.append('svg:g').append('svg:g').append('svg:g');

    var barGraphG = svg.append('svg:g').attr('transform','translate(100,5)scale(1,0.9)');

    var barScale = d3.scale.linear().domain([0, dataMax]).range([0, 70]);

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
    .attr('width', function(d,i) {

    	var barLength = Math.abs(d[1]);
    	if(d[1] < 0){
    		d3.select(this).attr('transform', 'scale(-1,1)');
    	}

    	return barScale(barLength);
    })
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
    .attr('x', function(d,i) {
		var barLength = d[1];

		if(d[1] < 0){
    		d3.select(this).attr('transform', 'translate(0,0)');
    		d3.select(this).attr('text-anchor','end');
    	}else{
			d3.select(this).attr('text-anchor','start');
    	}

    	return barScale(barLength);
    })
	.attr('y',  function(d,i) {return i * (h / data.length) + h / data.length / 3})
    .style("font-size", 2)
    .attr("font-family", "sans-serif")
    .attr("dominant-baseline", "central")
    .style('fill', "#00ff00");

});