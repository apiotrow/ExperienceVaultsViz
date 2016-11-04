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

    // var d3 = require('d3');
	var globs = require('./js/phaservis/eevvStuff.js');
    var eevv = new globs.eevvStuff();

    //width and height of svg. but not actually. because 
    //i'm using some css i don't understand. but the ratio is
    //definitely ends up being w:h.
    var w = 200;
    var h = 100;

    var group2ItemListXPosition = 0;
    var group2ItemListYPosition = 10;

    //min sample size for any stats we calculate
    var sampleSizeRequirement = 135;

    //width of the left side of the vis with all the buttons
    var buttonAreaMaxWidth = 65;

    //master svg
    var svg = 
    d3.select("div#container")
	.append("svg")
	.attr("preserveAspectRatio", "xMinYMin meet")
  	.attr("viewBox", "0 0 " + w + " " + h)
  	.classed("svg-content", true);

  	//black bg
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
		group2ItemChoiceButtonValue: ""
	};
	var groupChoiceData = ["context", "drug", "gender", "intensity", "category"];

	var colors = {
		hotPink: "#ff0066",
		green: "#00ff00",
		blue: "#3399ff"
	}
	var group1ButtonBorderFill = colors.hotPink;
	var group1ButtonBGFill = "black";
	var group1TextFill = "white";
	
	var group2ButtonBorderFill = colors.green;
	var group2ButtonBGFill = "black";
	var group2TextFill = "white";

	var group2ItemButtonBorderFill = "#3399ff";
	var group2ItemButtonBGFill = "black";
	var group2ItemTextFill = "white";
	
	var graphTitleFill = "white";
	var barFill = colors.blue;
	var barTextFill = "white";
	


	//render intial graph
	setRandomGroupInfo();
	setupGroupChoiceButtons();
	selectInitiallySelectedButtons();
	
	generateData(
		currentlySelectedGroupInfo.group1ChoiceButtonValue, 
		currentlySelectedGroupInfo.group2ChoiceButtonValue, 
		currentlySelectedGroupInfo.group2ItemChoiceButtonValue
	);
	renderBarGraph(barFill, barTextFill);







    function renderSingleGroupChoiceButtons(buttonClass, x, y, dataToUse, btnHeight, 
    	buttonBorderFillColor, buttonBGFillColor, textFillColor){
		
		var groupChoiceG = svg.append('svg:g').attr('transform','translate(2,2)scale(1,1)')
		.attr('id', buttonClass);


		var groupChoiceButtonsText = groupChoiceG
	    .selectAll('text')
	    .data(dataToUse)
	    .enter()
	    .append('text')
	    .attr('id', function(d,i){return d + "-text-" + buttonClass})
	    .style("font-size", "2px")
	    .attr('y', function(d,i){
	    	return  y + 2.1;
	    })
	    .text(function(d){

	    	//if this is a group1 or group2 button, just return name of it.
	    	//but if this is a group2Item button, give it the name it's supposed to have
	    	//which is in the eevv data structure
	    	//
	    	//we determine if it's a group1/group2 or a group2Item by checking
	    	//if the eevv data structure contains an entry for it
			var inEEVVtest = eevv[currentlySelectedGroupInfo.group2ChoiceButtonValue][d];
	    	if(inEEVVtest !== undefined){

	    		//we a group2Item button
		    	return eevv[currentlySelectedGroupInfo.group2ChoiceButtonValue][d];

		    }else{

		    	//we a group1 or group2 button.
		    	//capitalize it because we're too lazy to make all the names
		    	//of properties of objects all over this project capital
		    	var capitalized = d.charAt(0).toUpperCase() + d.slice(1);
		    	return capitalized;

		    }
	    })
	    .attr('x', function(d,i){
	    	//d3.select(this.previousSibling).node().getComputedTextLength() + 2

	    	//not setting rect width here using getComputedTextLength() because
	    	//it's always off by some pixels and fucks everything up. doing it at end
	    	//of function instead.
	    	return x;
	    })
	    .attr("font-family", "sans-serif")
	    // .attr("dominant-baseline", "mathematical")
	    .style('fill', textFillColor)
	    .style("text-anchor", "start")
	    .attr('pointer-events', 'none')
	    .attr('class','textForButton');



	    var prevButtonSiblingWidthITER = 0;

		//setup a list of buttons with all group options.
		//also make them selectable.
		var groupChoiceButtons = groupChoiceG
		.selectAll('rect')
	    .data(dataToUse)
	    .enter()
		.append('rect')
	    .attr('id', function(d,i){return d})
		.attr('stroke',buttonBorderFillColor)
	    .attr('stroke-width', 0.2)
	    .style('fill', buttonBGFillColor)
	    .attr('width', function(d,i){

	    	//set this button's width based off the length of the text for this button
	    	var thisID = d3.select(this).attr('id');
			var textForThisButton = d3.select("#" + thisID + "-text-" + buttonClass);
	    	return textForThisButton.node().getComputedTextLength() + 2;

	    })
	    .attr('x', function(d,i){

			var prevSiblingWidth;
	    	if(i != 0){
	    		prevButtonSiblingWidthITER += 1 * d3.select(this.previousSibling).attr('width');
	    		prevSiblingWidth = prevButtonSiblingWidthITER;
	    	}else{
	    		prevSiblingWidth = 0;
	    	}

	    	return prevSiblingWidth;

	    })
	    .attr('y', function(d,i){
	    	return y;
	    })
	    .attr('height', btnHeight)
	    .on('mouseover', function(){

	    	//select this button
	    	d3.select(this).attr('stroke','yellow');
	    	//don't thin out border if its the currently selected one
	    	if(d3.select(this).attr('currentlySelected') == 'no')
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
	    	// console.log(textElementForThisButton);
	    	this.parentNode.appendChild(textElementForThisButton.node()); 

	    })
	    .on('mouseout', function(){

	    	//only remove highlights if this button
	    	//isn't the currently selected one
	    	if(d3.select(this).attr('currentlySelected') == 'no'){
		    	d3.select(this).attr('stroke',buttonBorderFillColor);
		    	d3.select(this).attr('stroke-width', 0.2);
		    }

	    })
	    .on('click', function(){
	    
	    	//unselect all other buttons of this class (group1, group2, group2Item)
	    	d3.selectAll('.' + buttonClass)
	    	.attr('currentlySelected', 'no')
	    	.attr('stroke',buttonBorderFillColor)
	    	.attr('stroke-width', 0.2);

	    	//select this button
	    	d3.select(this).attr('currentlySelected', 'yes');
	    	d3.select(this).attr('stroke','yellow');
	    	d3.select(this).attr('stroke-width', 0.7);

	    	//put button on top so border color shows
	    	this.parentNode.appendChild(this); 

	    	//put text for this button on top
	    	var thisID = d3.select(this).attr('id');
	    	var textForThisButton = d3.select("#" + thisID + "-text-" + buttonClass);
	    	this.parentNode.appendChild(textForThisButton.node()); 

	    	//set the corresponding value in currentlySelectedGroupInfo to the selected
	    	//button's value
	    	d3.selectAll("." + buttonClass).each(function() {
				if(d3.select(this).attr('currentlySelected') == 'yes'){

					//if it's a group1 or group2 button, do regular.
					//but if it's a group2Item button, gotta go into the eevvStuff
					//data structure and get the actual name of the item, because we're
					//using the key names as button IDs for group2Items
					if(d3.select(this).attr('class') == 'group2ItemChoiceButton'){
						currentlySelectedGroupInfo[buttonClass + "Value"] = 
						eevv[currentlySelectedGroupInfo.group2ChoiceButtonValue][d3.select(this).attr('id')];
					}else{
						currentlySelectedGroupInfo[buttonClass + "Value"] = d3.select(this).attr('id');
					}
				}
			});

	    	//if we select a group1 or group2 choice button, do these as needed:
	    	//-setup a new list of group2Items
	    	//-remove the current list
			if(d3.select(this).attr('class') == 'group2ChoiceButton'
				|| d3.select(this).attr('class') == 'group1ChoiceButton'){

				var currGroup1 = currentlySelectedGroupInfo.group1ChoiceButtonValue;
				var currGroup2 = currentlySelectedGroupInfo.group2ChoiceButtonValue;

				//if a new group2 button was picked or we select the same group1 as group 2,
				//remove current list of group 2 item choices
				if(d3.select(this).attr('class') == 'group2ChoiceButton'
					|| currGroup1 == currGroup2){
					d3.selectAll('#group2ItemChoiceButton').remove();
				}

				//render the new ones, but only if the groups are different,
				//and if no list already exists.
				//if we selected context and context, for instance, don't render 
				//a new list, because that wouldn't make sense
				if(currGroup1 != currGroup2 && d3.selectAll('#group2ItemChoiceButton').empty()){
					var eevvObject = eevv[currentlySelectedGroupInfo.group2ChoiceButtonValue];
					var group2ItemList = Object.keys(eevvObject);
					renderSingleGroupChoiceButtons(
						'group2ItemChoiceButton', 
						group2ItemListXPosition, 
						group2ItemListYPosition, 
						group2ItemList,
						3,
						group2ItemButtonBorderFill,
						group2ItemButtonBGFill,
						group2ItemTextFill);

					var buttonReselectID;
					for(var key in eevv[currGroup2]){
						if(eevv[currGroup2][key] == currentlySelectedGroupInfo.group2ItemChoiceButtonValue){
							buttonReselectID = key;
							break;
						}
					}

					//get id of group2Item button that was selected before we deleted the list
					var buttonReselect = d3.select("#" + buttonReselectID);

					//if the group2 we just selected is different than the last, then the
					//previously selected group2Item won't exist in the DOM. so don't attempt
					//to select it.
					if(buttonReselect.node() !== null){
						//select the button
				    	buttonReselect.attr('currentlySelected', 'yes');
				    	buttonReselect.attr('stroke','yellow');
				    	buttonReselect.attr('stroke-width', 0.7);
				    	//put button on top so border color shows
				    	buttonReselect.node().parentNode.appendChild(buttonReselect.node()); 
				    	//put text for this button on top
				    	var textForThisButton = d3.select("#" + buttonReselectID + "-text-group2ItemChoiceButton");
				    	textForThisButton.node().parentNode.appendChild(textForThisButton.node());
			    	}
				}
			}

			//if check here to keep us from trying to graph context_context or whatever.
			//need to replace with some other behavior
			if(currentlySelectedGroupInfo.group1ChoiceButtonValue != currentlySelectedGroupInfo.group2ChoiceButtonValue){
				generateData(
					currentlySelectedGroupInfo.group1ChoiceButtonValue, 
					currentlySelectedGroupInfo.group2ChoiceButtonValue, 
					currentlySelectedGroupInfo.group2ItemChoiceButtonValue
				);
			}else{
				// console.log("selected " + currentlySelectedGroupInfo.group1ChoiceButtonValue + " and " + 
				// currentlySelectedGroupInfo.group2ChoiceButtonValue + " so we can't graph it")
			}

			//render graph for newly selected values
			renderBarGraph(barFill, barTextFill);

	    })
	    .attr('currentlySelected', 'no')
	    .attr('class', buttonClass);

	    

	    //bring all the texts forward
	    d3.selectAll(".textForButton").each(function() {
	    	this.parentNode.appendChild(this);
	    	// d3.select(this).attr('x', d3.select(this).attr('x') / 2);
	    });

	    //change x value of all texts, so they match up with their buttons.
	    //for some reason can't do this properly in the text instantiation.
	    var Xiter = 0;
	    var Yiter = 0;
	    d3.selectAll("." + buttonClass).each(function() {
	    	var thisID = d3.select(this).attr('id');
			var textForThisButton = d3.select("#" + thisID + "-text-" + buttonClass);

			//if this row is going to go past our specified width,
			//start a new row
	    	if(Xiter + textForThisButton.node().getComputedTextLength() + 2 > buttonAreaMaxWidth){
	    		Yiter += btnHeight;
	    		Xiter = 0;
	    	}

	    	textForThisButton.attr('x', textForThisButton.attr('x') * 1 + Xiter + 1);
	    	d3.select(this).attr('x', Xiter);

	    	textForThisButton.attr('y', textForThisButton.attr('y') * 1 + Yiter);
	    	d3.select(this).attr('y', d3.select(this).attr('y') * 1 + Yiter);

	    	Xiter += textForThisButton.node().getComputedTextLength() + 2;
	    });
    }

	function renderBarGraph(barFillColor, barTextFillColor){
		d3.selectAll("#barGraph").remove();

		//container for graph
	    var barGraphG = svg
	    .append('svg:g')
	    .attr('transform','translate(127,5)scale(1,0.945)')
	    .attr('id','barGraph');

	    var barScale = d3.scaleLinear().domain([0, dataMax]).range([0.5, 45]);

	    var bars = barGraphG
	    .selectAll('rect')
	    .data(data)
	    .enter()
	    .append('rect')
	    .attr('stroke','black')
	    .attr('stroke-width', 0.2)
	    .style('fill', barFillColor)
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
	    	d3.select(this).attr('stroke','black');
	    	d3.select(this).attr('stroke-width', 0.2);
	    });

	    var barText = 
	    barGraphG.selectAll('text').data(data).enter().append('text')
	    .text(function(d,i){return d[0]})
	    .attr('x', function(d,i) {
			var barLength = d[1];

			if(d[1] < 0){
	    		d3.select(this).attr('transform', 'translate(-1.5,0)');
	    		d3.select(this).attr('text-anchor','end');
	    	}else{
	    		d3.select(this).attr('transform', 'translate(0.5,0)');
				d3.select(this).attr('text-anchor','start');
	    	}

	    	return barScale(barLength);
	    })
		.attr('y',  function(d,i) {return i * (h / data.length) + h / data.length / 2.1})
	    .style("font-size", "2px")
	    .attr("font-family", "sans-serif")
	    .attr("dominant-baseline", "central")
	    .style('fill', barTextFillColor);

	    renderGraphTitle();
	}

	function generateData(group1, group2, group2item){
		var file = statfiles[group1 + "_" + group2];

		//if we chose a new group2, the old group2item will still be in place,
		//so group2item won't be in statfiles[group2]. in that case we just
		//return, which will leave the old graph up.
		if(statfiles[group2].hasOwnProperty(group2item)){
	    	expected = statfiles[group2][group2item]['perc'];
		}else{
			return;
		}

	    data = [];

	    for(i in statfiles[group1]){

	    	var sampleSize = statfiles[group1][i]['raw'];

	    	if(sampleSize > sampleSizeRequirement){

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

		//if item doesn't meet threshold requirement, keep setting a new
		//one until we find one that does
		while(statfiles[randomGroup2][randomGroup2Item]['raw'] < sampleSizeRequirement){
			randomGroup2Item = group2ItemNames[Math.floor(Math.random() * group2ItemNames.length)];
		}

		currentlySelectedGroupInfo.group2ItemChoiceButtonValue = randomGroup2Item;
	}

	function selectInitiallySelectedButtons(){

		var buttonToSelectID;
		var currGroup2 = currentlySelectedGroupInfo.group2ChoiceButtonValue;

		//select a given button
		function selectButton(btn, btnType){
			if(btn.node() !== null){
				//select the button
		    	btn.attr('currentlySelected', 'yes');
		    	btn.attr('stroke','yellow');
		    	btn.attr('stroke-width', 0.7);
		    	//put button on top so border color shows
		    	btn.node().parentNode.appendChild(btn.node()); 
		    	//put text for this button on top
		    	var textForThisButton = d3.select("#" + buttonToSelectID + "-text-" + btnType);
		    	textForThisButton.node().parentNode.appendChild(textForThisButton.node());
			}
		}

		//select group2Item
		for(var key in eevv[currGroup2]){
			if(eevv[currGroup2][key] == currentlySelectedGroupInfo.group2ItemChoiceButtonValue){
				buttonToSelectID = key;
				break;
			}
		}
		var buttonToSelect = d3.select("#" + buttonToSelectID);
		selectButton(buttonToSelect, "group2ItemChoiceButton");

		//select group1 button
		d3.selectAll(".group1ChoiceButton").each(function() {
			if(d3.select(this).attr('id') == currentlySelectedGroupInfo.group1ChoiceButtonValue){
				buttonToSelectID = d3.select(this).attr('id');
	    		buttonToSelect = d3.select(this);
	    		selectButton(buttonToSelect, "group1ChoiceButton");
			}
	    });

	    //select group1 button
		d3.selectAll(".group2ChoiceButton").each(function() {
			if(d3.select(this).attr('id') == currentlySelectedGroupInfo.group2ChoiceButtonValue){
				buttonToSelectID = d3.select(this).attr('id');
	    		buttonToSelect = d3.select(this);
	    		selectButton(buttonToSelect, "group2ChoiceButton");
			}
	    });
	}

	function setupGroupChoiceButtons(){
		var eevvObject = eevv[currentlySelectedGroupInfo.group2ChoiceButtonValue];
		var group2ItemList = Object.keys(eevvObject);

		renderSingleGroupChoiceButtons('group1ChoiceButton', 0, 0, groupChoiceData, 3, 
			group1ButtonBorderFill,
			group1ButtonBGFill,
			group1TextFill);
		renderSingleGroupChoiceButtons('group2ChoiceButton', 0, 5, groupChoiceData, 3, 
			group2ButtonBorderFill,
			group2ButtonBGFill, 
			group2TextFill);
		renderSingleGroupChoiceButtons(
			'group2ItemChoiceButton', 
			group2ItemListXPosition, 
			group2ItemListYPosition, 
			group2ItemList,
			3,
			group2ItemButtonBorderFill,
			group2ItemButtonBGFill,
			group2ItemTextFill);
	}

	function renderGraphTitle(){

		var group1selected = currentlySelectedGroupInfo.group1ChoiceButtonValue;
		var group2selected = currentlySelectedGroupInfo.group2ChoiceButtonValue;
		var group2selectedItem = currentlySelectedGroupInfo.group2ItemChoiceButtonValue;

		var group1Text = group1selected.charAt(0).toUpperCase() + group1selected.slice(1);
		var group2Text = group2selected.charAt(0).toUpperCase() + group2selected.slice(1);
		var group2ItemText = group2selectedItem.charAt(0).toUpperCase() + group2selectedItem.slice(1);

		//if we select group2 and the item we have selected isn't in that group
		//don't change title. or we end up with weird titles like
		//Gender - Drug: Extreme that don't make sense
		var goThrough = false;
		for(var item in eevv[group2selected]){
			if(eevv[group2selected][item] == group2selectedItem)
				goThrough = true;
		}

		if(group1Text != group2Text && goThrough){
			d3.selectAll("#graphTitleG").remove();

			var graphTitleG = svg.append('svg:g')
			.attr('transform','translate(130,2)scale(1,1)')
			.attr('id', 'graphTitleG')
			.append('text')
			.text(group1Text + " - [ " + group2Text + ": " + group2ItemText + " ]")
			.style("font-size", "3px")
			.attr("font-family", "sans-serif")
		    .attr("dominant-baseline", "mathematical")
		    .style('fill', graphTitleFill)
		    .style("text-anchor", "middle");
		}
	}
});