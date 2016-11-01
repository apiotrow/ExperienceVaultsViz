module.exports = {
    doit: function(){
    	
	var d3 = require('./js/phaservis/d3.min.js');

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

    var masterSVGWidth = 1200; 
    var masterSVGHeight = 900;
    var masterSVG = d3
    .select('#vis')
    .append('svg')
    .attr('width',masterSVGWidth)
    .attr('height',masterSVGHeight)
    .attr('id','masterSVG');

    var masterSVGBG = masterSVG
    .append('rect')
    .style('fill', 'black')
    .attr('width',masterSVGWidth)
    .attr('height',masterSVGHeight);

    var data = getStats2(statfiles.drug_category, 'Bad Trips', 'perc', 50);
    var circCollection = {};
    circles(data);

    
    

    var checkIfDoneSeparating = setInterval(function() {
    	var areWeDone = true;
    	for(key1 in circCollection){
    		for(key2 in circCollection){
    			if(circCollection[key1][key2] == false){
    				areWeDone = false;
    				break;
    			}
    		}
    	}

    	if(areWeDone == true){
			clearInterval(computeCircleSeparation);
			d3.selectAll('.circles').each(function(d,i){
				d3.select(this)
				.transition()
				.duration(500)
				.attr('cy', circCollection[d3.select(this).attr('id')]['y'])
				.attr('cx', circCollection[d3.select(this).attr('id')]['x']);
			});

			clearInterval(checkIfDoneSeparating);
			// clearInterval(moveCirclesByD3);

			// data = getStats2(statfiles.drug_category, 'Mystical Experiences', 'perc', 50);

			// var perScale = d3.scale.linear().domain([data[data.length - 1][1], data[0][1]]).range([5,100]);
			// d3.selectAll('.circles')
			// .data(data)
			// .transition()
			// .attr('r', function(d,i){
		 //    	return perScale(d[1]);
		 //    });
			

			// for(key1 in circCollection){
	  //   		for(key2 in circCollection){
	  //   			circCollection[key1][key2] = false;
	  //   		}
	  //   	}

    	}
    }, 1);

	setInterval(function() {
		// var perScale = d3.scale.linear().domain([data[data.length - 1][1], data[0][1]]).range([5,200]);

    	d3.selectAll('.circles').each(function(d,i){
    		

			d3.select(this)
			.transition()
			.duration(1000)
			.attr('cy', circCollection[d3.select(this).attr('id')]['y'])
			.attr('cx', circCollection[d3.select(this).attr('id')]['x'])
			.each("end", function(){
				// d3.select(this)
				// .data(data)
				// .transition()
				// .duration(1000)
				// .attr('cx', function(d,i){
		  //   		var it = (Math.random() * 3) + (masterSVGWidth / 2);
		  //   		return it;
		  //   	})
		  //   	.attr('cy', function(d,i){
		  //   		var it = (Math.random() * 3) + (masterSVGHeight / 2);
		  //   		return it;
		  //   	})
		    	// .attr('r', function(d,i){
		    	// 	return Math.random() * 50;
		    	// });

			});


		});
	}, 1000);



    var computeCircleSeparation = setInterval(function() {
    	for(key1 in circCollection){

    		var circ1X = circCollection[key1]['x'];
	    	var circ1Y = circCollection[key1]['y'];
	    	var circ1R = circCollection[key1]['r'];

	    	for(key2 in circCollection){
	    		if(key2 != key1){
	    			var circ2X = circCollection[key2]['x'];
	    			var circ2Y = circCollection[key2]['y'];
	    			var circ2R = circCollection[key2]['r'];

	    			var dist = Math.sqrt(Math.pow(circ2Y - circ1Y, 2) + Math.pow(circ2X - circ1X, 2));
    				var targetDist = circ2R + circ1R;

    				if(targetDist - dist > 0){

    					var angleDeg = Math.atan2(circ2Y - circ1Y, circ2X - circ1X);
    					var xChange = Math.cos(angleDeg) * 5;
    					var yChange = Math.sin(angleDeg) * 5;

    					var Circ2newX = circ2X + xChange;
    					var Circ2newY = circ2Y + yChange;

    					var Circ1newX = circ1X - xChange;
    					var Circ1newY = circ1Y - yChange;

    					//move surrounding circles
    					circCollection[key2]['x'] = Circ2newX;
    					circCollection[key2]['y'] = Circ2newY;

    					//move us
    					circCollection[key1]['x'] = Circ1newX;
    					circCollection[key1]['y'] = Circ1newY;

    				}
    				// else if(targetDist - dist < 5){

    				// 	var angleDeg = Math.atan2(masterSVGHeight / 2 - circ1Y, masterSVGWidth / 2 - circ1X);
    				// 	var xChange = Math.cos(angleDeg);
    				// 	var yChange = Math.sin(angleDeg);

    				// 	var Circ1newX = circ1X + xChange;
    				// 	var Circ1newY = circ1Y + yChange;

    				// 	circCollection[key1]['x'] = Circ1newX;
    				// 	circCollection[key1]['y'] = Circ1newY;

    				// }
    				// else{
    				// 	circCollection[key1][key2] = true;
    				// 	circCollection[key2][key1] = true;
    				// }
	    		}
	    	}
    	}
	}, 1);


 //    var moveCirclesByD3 = setInterval(function() {
 //    	d3.selectAll('.circles').each(function(d,i){
 //    		var circ1 = d3.select(this);
 //    		var circ1CX = circ1.attr('cx') * 1;
 //    		var circ1CY = circ1.attr('cy') * 1;
 //    		var circ1R = circ1.attr('r') * 1;

 //    		d3.selectAll('.circles').each(function(dd,ii){

 //    			//if this isn't us
 //    			if(ii != i){
 //    				var circ2 = d3.select(this);
 //    				var circ2CX = circ2.attr('cx') * 1;
 //    				var circ2CY = circ2.attr('cy') * 1;
 //    				var circ2R = circ2.attr('r') * 1;

 //    				var dist = Math.sqrt(Math.pow(circ2CY - circ1CY, 2) + Math.pow(circ2CX - circ1CX, 2));
 //    				var targetDist = circ2R + circ1R;

 //    				if(targetDist - dist > -5){

 //    					var angleDeg = Math.atan2(circ2CY - circ1CY, circ2CX - circ1CX);
 //    					var xChange = Math.cos(angleDeg);
 //    					var yChange = Math.sin(angleDeg);

 //    					var Circ2newX = circ2CX + xChange;
 //    					var Circ2newY = circ2CY + yChange;

 //    					// var Circ1newX = circ1CX - xChange;
 //    					// var Circ1newY = circ1CY - yChange;

 //    					//move surrounding circles
 //    					circ2.attr('cx', Circ2newX);
 //    					circ2.attr('cy', Circ2newY);

 //    					//move us
 //    					// circ1.attr('cx', Circ1newX);
 //    					// circ1.attr('cy', Circ1newY);

 //    				}
 //    				if(targetDist - dist < 5){

 //    					var angleDeg = Math.atan2(masterSVGHeight / 2 - circ1CY, masterSVGWidth / 2 - circ1CX);
 //    					var xChange = Math.cos(angleDeg);
 //    					var yChange = Math.sin(angleDeg);

 //    					// var Circ2newX = circ2CX + xChange / 3;
 //    					// var Circ2newY = circ2CY + yChange / 3;

 //    					var Circ1newX = circ1CX + xChange / 2;
 //    					var Circ1newY = circ1CY + yChange / 2;

 //    					// //move surrounding circles
 //    					// circ2.attr('cx', Circ2newX);
 //    					// circ2.attr('cy', Circ2newY);

 //    					//move us
 //    					circ1.attr('cx', Circ1newX);
 //    					circ1.attr('cy', Circ1newY);

 //    				}
 //    			}
 //    		})
 //    	});
	// }, 1);

    function circles(data){
    	var circleG = masterSVG.append('svg:g').attr('id', 'circleG');
    	var color = d3.scale.category20();

    	var perScale = d3.scale.linear().domain([data[data.length - 1][1], data[0][1]]).range([5,100]);

    	circleG
    	.selectAll('circle')
    	.data(data)
    	.enter()
    	.append('circle')
    	.attr('cx', function(d,i){
    		var it = (Math.random() * 2) + (masterSVGWidth / 2);
    		return it;
    	})
    	.attr('cy', function(d,i){
    		var it = (Math.random() * 2) + (masterSVGHeight / 2);
    		return it;
    	})
    	.attr('r', function(d,i){
    		return perScale(d[1]);
    	})
    	.style('fill', function(d,i){return color(i)})
    	.style('opacity', 0.7)
    	.attr('class','circles')
    	.attr('id', function(d){
    		return d[0];
    	});

    	d3.selectAll('.circles').each(function(d,i){
    		var circ1 = d3.select(this);

    		circCollection[d3.select(this).attr('id')] = {
    			"x": d3.select(this).attr('cx') * 1,
    			"y": d3.select(this).attr('cy') * 1,
    			"r": d3.select(this).attr('r') * 1,
    		};

    		d3.selectAll('.circles').each(function(dd,ii){
    			if(ii != i){
    				circCollection[circ1.attr('id')][d3.select(this).attr('id')] = false;
    			}
    		});
    	});
    }

    function getStats2(file, group, stat, thresh){
        var sortable=[];
        for(var key in file)
            //if it doesn't have stat, that means stat was 0
            if(file[key].hasOwnProperty(group)
                 && file[key][group]["total"] >= thresh)
                sortable.push([key, file[key][group][stat]]);
       		sortable.sort(function(a, b){
            return b[1]-a[1];
        });
        return sortable;
    }
   	}
}