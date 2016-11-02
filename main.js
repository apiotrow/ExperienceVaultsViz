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

    var d3 = require('d3');


    //initial setup
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



    //globals
    var dataMin;
	var dataMax;
	var data;
	var expected;
	var currentlySelectedGroupInfo = {
		group1ChoiceButtonValue: "",
		group2ChoiceButtonValue: "",
		group2SelectedItem: ""
	};
	var groupChoiceData = ["context","drug", "gender", "intensity","category"];
	


	//render intial graph
	setupGroupChoiceButtons();
	setRandomGroupInfo();
	generateData(
		currentlySelectedGroupInfo.group1ChoiceButtonValue, 
		currentlySelectedGroupInfo.group2ChoiceButtonValue, 
		currentlySelectedGroupInfo.group2SelectedItem
	);
	renderBarGraph();
	//NEED TO MAKE BUTTONS FOR INITIALLY SELECTED GROUPS HIGHLIGHT, HERE




	function setupGroupChoiceButtons(){
		renderSingleGroupChoiceButtons('group1ChoiceButton', 0);
		renderSingleGroupChoiceButtons('group2ChoiceButton', 11);
	}

    function renderSingleGroupChoiceButtons(buttonClass, x){
		
		var groupChoiceG = svg.append('svg:g').attr('transform','translate(2,2)scale(1,1)');

		//setup a list of buttons with all group options.
		//also make them selectable.
		var groupChoiceButtons = groupChoiceG
		.selectAll('rect')
	    .data(groupChoiceData)
	    .enter()
		.append('rect')
		.attr('stroke','#00ff00')
	    .attr('stroke-width', 0.2)
	    .style('fill', "black")
	    .attr('x', x)
	    .attr('y', function(d,i){
	    	return i * 3;
	    })
	    .attr('height', 3)
	    .attr('width', 10)
	    .on('mouseover', function(){

	    	//select this button
	    	d3.select(this).attr('stroke','yellow');
	    	d3.select(this).attr('stroke-width', 0.3);
	    	this.parentNode.appendChild(this);

	    	//make sure if there's a button already selected
	    	//that that button is on top
	    	d3.selectAll("." + buttonClass).each(function() {
				if(d3.select(this).attr('currentlySelected') == 'yes'){
					this.parentNode.appendChild(this);

					//set it's text to be on top too
					var thisID = d3.select(this).attr('id');
			    	var textForThisButton = d3.select("#" + thisID + "-text-" + buttonClass);
			    	this.parentNode.appendChild(textForThisButton.node()); 
				}
			});

	    	//put text for this button on top
	    	var thisID = d3.select(this).attr('id');
	    	var textElementForThisButton = d3.select("#" + thisID + "-text-" + buttonClass);
	    	this.parentNode.appendChild(textElementForThisButton.node()); 
	    })
	    .on('mouseout', function(){

	    	//only remove highlights if this button
	    	//isn't the currently selected one
	    	if(d3.select(this).attr('currentlySelected') == 'no'){
		    	d3.select(this).attr('stroke','#00ff00');
		    	d3.select(this).attr('stroke-width', 0.2);
		    }
	    })
	    .on('click', function(){
	    
	    	//unselect all other group1 buttons
	    	d3.selectAll('.' + buttonClass)
	    	.attr('currentlySelected', 'no')
	    	.attr('stroke','#00ff00')
	    	.attr('stroke-width', 0.2);

	    	//select this button
	    	d3.select(this).attr('currentlySelected', 'yes');
	    	d3.select(this).attr('stroke','yellow');
	    	d3.select(this).attr('stroke-width', 0.5);

	    	this.parentNode.appendChild(this); 

	    	//put text for this button on top
	    	var thisID = d3.select(this).attr('id');
	    	var textForThisButton = d3.select("#" + thisID + "-text-" + buttonClass);
	    	this.parentNode.appendChild(textForThisButton.node()); 

	    	//set a variable to the currently selected button
	    	//so we can mess with it in other functions
	    	d3.selectAll("." + buttonClass).each(function() {
				if(d3.select(this).attr('currentlySelected') == 'yes'){
					currentlySelectedGroupInfo[buttonClass + "Value"] = d3.select(this).attr('id')
				}
			});

	    	//choose a random value from group 2 to graph
	    	var group2ItemNames = Object.keys(statfiles[currentlySelectedGroupInfo.group2ChoiceButtonValue]);
			var randomGroup2Item = group2ItemNames[Math.floor(Math.random() * group2ItemNames.length)];
			currentlySelectedGroupInfo.group2SelectedItem = randomGroup2Item;

			//if check here to keep us from trying to graph context_context or whatever.
			//need to replace with some other behavior
			if(currentlySelectedGroupInfo.group1ChoiceButtonValue != currentlySelectedGroupInfo.group2ChoiceButtonValue){
				generateData(
					currentlySelectedGroupInfo.group1ChoiceButtonValue, 
					currentlySelectedGroupInfo.group2ChoiceButtonValue, 
					currentlySelectedGroupInfo.group2SelectedItem
				);
				console.log("rendering for item: " + currentlySelectedGroupInfo.group2SelectedItem);
			}else{
				console.log("selected " + currentlySelectedGroupInfo.group1ChoiceButtonValue + " and " + 
				currentlySelectedGroupInfo.group2ChoiceButtonValue + " so we can't graph it")
			}

			renderBarGraph();
	    })
	    .attr('id', function(d,i){return d})
	    .attr('currentlySelected', 'no')
	    .attr('class', buttonClass);

	    var groupChoiceButtonsText = groupChoiceG
	    .selectAll('text')
	    .data(groupChoiceData)
	    .enter()
	    .append('text')
	    .attr('x', x + 5)
	    .attr('y', function(d,i){
	    	return i * 3 + 1;
	    })
	    .text(function(d){return d})
	    .style("font-size", 2)
	    .attr("font-family", "sans-serif")
	    .attr("dominant-baseline", "central")
	    .style('fill', "#00ff00")
	    .style("text-anchor", "middle")
	    .attr('pointer-events', 'none')
	    .attr('id', function(d,i){return d + "-text-" + buttonClass});


    }

	function renderBarGraph(){
		d3.selectAll("#barGraph").remove();

		//container for graph
	    var barGraphG = svg
	    .append('svg:g')
	    .attr('transform','translate(130,5)scale(1,0.9)')
	    .attr('id','barGraph');

	    var barScale = d3.scaleLinear().domain([0, dataMax]).range([0, 50]);

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
	    	d3.select(this).attr('stroke-width', 0.3);
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
		.attr('y',  function(d,i) {return i * (h / data.length) + h / data.length / 2.1})
	    .style("font-size", 2)
	    .attr("font-family", "sans-serif")
	    .attr("dominant-baseline", "central")
	    .style('fill', "#00ff00");
	}

	function generateData(group1, group2, group2item){
		var file = statfiles[group1 + "_" + group2];
	    expected = statfiles[group2][group2item]['perc'];
	    data = [];

	    for(i in statfiles[group1]){

	    	var sampleSize = statfiles[group1][i]['raw'];

	    	if(sampleSize > 200){

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


	    //get maxes and mins
	    dataMin = 9999999;
	    dataMax = -9999999;

	    for(key in data){
	    	if(data[key][1] < dataMin){
	    		dataMin = data[key][1];
	    	}
	    }

	   	for(key in data){
	    	if(Math.abs(data[key][1]) > dataMax){
	    		dataMax = Math.abs(data[key][1]);
	    	}
	   	}

	   	//sort data
		data.sort(function(a, b){
	        return b[1]-a[1];
	    });
	}


	function setRandomGroupInfo(){
		var randomGroup1 = groupChoiceData[Math.floor(Math.random() * groupChoiceData.length)];
		var randomGroup2 = randomGroup1;

		while(randomGroup1 == randomGroup2){
			randomGroup2 = groupChoiceData[Math.floor(Math.random() * groupChoiceData.length)];
		}
		currentlySelectedGroupInfo.group1ChoiceButtonValue = randomGroup1;
		currentlySelectedGroupInfo.group2ChoiceButtonValue = randomGroup2;

		var group2ItemNames = Object.keys(statfiles[currentlySelectedGroupInfo.group2ChoiceButtonValue]);
		var randomGroup2Item = group2ItemNames[Math.floor(Math.random() * group2ItemNames.length)];
		currentlySelectedGroupInfo.group2SelectedItem = randomGroup2Item;
	}

});