/*
  _____ _       _           _     __      __            
 / ____| |     | |         | |    \ \    / /            
| |  __| | ___ | |__   __ _| |     \ \  / /_ _ _ __ ___ 
| | |_ | |/ _ \| '_ \ / _` | |      \ \/ / _` | '__/ __|
| |__| | | (_) | |_) | (_| | |       \  / (_| | |  \__ \
 \_____|_|\___/|_.__/ \__,_|_|        \/ \__,_|_|  |___/
 */

//Define Margin
    var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
        width = 1200 - margin.left -margin.right,
        height = 850 - margin.top - margin.bottom;

 //Define Scales   
    var xScale = d3.scale.linear()
        //.domain([0,16]) //Need to redefine this after loading the data
        .range([0, width]);

    var yScale = d3.scale.linear()
        //.base(0.5)
        //.domain([-10,400]) //Need to redfine this after loading the data
        .range([height, 0]);

    var yScale100Minus = d3.scale.linear()
        //.base(0.5)
        //.domain([-10,400]) //Need to redfine this after loading the data
        .range([height, 0]);

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(3);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(3);
    
    //Define Tooltip here
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

   
    var classes = ["Hallucinogen",
                   "Cannabinoid",
                   "Stimulant",
                   "Opioid",
                   "Depressant",
                   "Deliriant",
                   "Other",
                   "Dissociative"];

    var classcolors = ["Aquamarine",
                       "ForestGreen",
                       "Gold",
                       "Purple",
                       "Violet",
                       "Red",
                       "DarkGray",
                       "DarkOrange"];

    var amountThreshold = 0;

//I don't know how to select specific checkbox
d3.select("input").on('change', function() {
    console.log("checkbox");
    if (amountThreshold == 0) amountThreshold = 300;//turn threshold on or off
    else amountThreshold = 0;
});

 


//d3.select('button').on('click', function() {

/*
  _____  _______      __     ______                _   _             
 / ____|/ ____\ \    / /    |  ____|              | | (_)            
| |    | (___  \ \  / /     | |__ _   _ _ __   ___| |_ _  ___  _ __  
| |     \___ \  \ \/ /      |  __| | | | '_ \ / __| __| |/ _ \| '_ \ 
| |____ ____) |  \  /       | |  | |_| | | | | (__| |_| | (_) | | | |
 \_____|_____/    \/        |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|
 */
       //Get Data
      d3.csv("topdrugdatapercentages.csv", function(error,data) {
         //Define Color
        var colors = d3.scale.category20();
        colors.domain(d3.keys(data[0]).filter(function(key) { return key !== "drug"; }));
        data.forEach(function(d) {
            d.drug = d.drug;
            if (d.amount > amountThreshold)  {d.amount = +d.amount;}//filter out less popular drugs if checkbox is selected
            else {d.amount = +0;}
            d.badtrip = +d.badtrip;
            d.mystical = +d.mystical;
            d.addiction = +d.addiction;
            d.alone = +d.alone;
            d.smallgroup = +d.smallgroup;
            d.largegroup = +d.largegroup;
            d.class = d.class;
        });
        
/*
 _____                        _           
|  __ \                      (_)          
| |  | | ___  _ __ ___   __ _ _ _ __  ___ 
| |  | |/ _ \| '_ ` _ \ / _` | | '_ \/ __|
| |__| | (_) | | | | | | (_| | | | | \__ \
|_____/ \___/|_| |_| |_|\__,_|_|_| |_|___/
*/
    
        xScale.domain([d3.min(data, function(d) { return d.mystical - d.badtrip; }), d3.max(data, function(d) { return d.mystical - d.badtrip; })]);
        yScale.domain([d3.min(data, function(d) { return 100 - d.addiction; }), 10 + d3.max(data, function(d) { return 100 -d.addiction; })]);
        
/*
__      __          ______                     
\ \    / /         |___  /                     
 \ \  / /_ _ _ __     / / ___   ___  _ __ ___  
  \ \/ / _` | '__|   / / / _ \ / _ \| '_ ` _ \ 
   \  / (_| | |     / /_| (_) | (_) | | | | | |
    \/ \__,_|_|    /_____\___/ \___/|_| |_| |_|
*/
       
      var zoom = d3.behavior.zoom()
        .x(xScale)
        .y(yScale)
        .scaleExtent([0.1, 32])
        .on("zoom", zoomed);  
        
        
/*
 _____        __ _                   _______      _______ 
|  __ \      / _(_)                 / ____\ \    / / ____|
| |  | | ___| |_ _ _ __   ___      | (___  \ \  / / |  __ 
| |  | |/ _ \  _| | '_ \ / _ \      \___ \  \ \/ /| | |_ |
| |__| |  __/ | | | | | |  __/      ____) |  \  / | |__| |
|_____/ \___|_| |_|_| |_|\___|     |_____/    \/   \_____|
*/
        
    var svg = d3.select("body2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
        

        
        //lets your mouse be anywhere in order to zoom
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "lightgrey")
            .attr("opacity", 0)
            //.style("stroke-size", "1px");

        
/*
 ______                              _ 
|___  /                             | |
   / / ___   ___  _ __ ___   ___  __| |
  / / / _ \ / _ \| '_ ` _ \ / _ \/ _` |
 / /_| (_) | (_) | | | | | |  __/ (_| |
/_____\___/ \___/|_| |_| |_|\___|\__,_|
                                       
                                       */
     function zoomed() {
            svg.selectAll(".dot")
                .attr("cx", function(d) {return xScale(d.mystical -  d.badtrip); })
                .attr("cy", function(d) {return yScale(100- d.addiction);})
            svg.select(".x.axis").call(xAxis);
            svg.select(".y.axis").call(yAxis);
         
            svg.selectAll(".labelTop")
                .attr("x", function(d) {return xScale(0);})
                .attr("y", function(d) {return yScale(103);})
                .attr("font-size", d3.event.scale*20 + 5 + "px");
            
            svg.selectAll(".labelBottom")
                .attr("x", function(d) {return xScale(0);})
                .attr("y", function(d) {return yScale(56);})
                .attr("font-size", d3.event.scale*20 + 5 + "px");
                
            svg.selectAll(".labelLeft")
                .attr("x", function(d) {return xScale(-13);})
                .attr("y", function(d) {return yScale(81);})
                .attr("font-size", d3.event.scale*20  + "px");
            
            svg.selectAll(".labelRight")
                .attr("x", function(d) {return xScale(20);})
                .attr("y", function(d) {return yScale(81);})
                .attr("font-size", d3.event.scale*20  + "px");
            
            
            /*svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");*/
    }
          
/*
 _____                                                 
|  __ \                           /\                   
| |  | |_ __ __ ___      __      /  \   __  _____  ___ 
| |  | | '__/ _` \ \ /\ / /     / /\ \  \ \/ / _ \/ __|
| |__| | | | (_| |\ V  V /     / ____ \  >  <  __/\__ \
|_____/|_|  \__,_| \_/\_/     /_/    \_\/_/\_\___||___/
*/
       /* //x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("y", 50)
            .attr("x", 5)
            .style("text-anchor", "end")
            .attr("font-size", "16px")
            .text("Percentage of Good Experiences Minus Bad Experiences");


        //Y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -50)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("font-size", "16px")
            .text("Percentage of Reports Describing Addiction");     */     


/*
 _____                        _____           _   _                  _       _   
|  __ \                      / ____|         | | | |                | |     | |  
| |  | |_ __ __ ___      __ | (___   ___ __ _| |_| |_ ___ _ __ _ __ | | ___ | |_ 
| |  | | '__/ _` \ \ /\ / /  \___ \ / __/ _` | __| __/ _ \ '__| '_ \| |/ _ \| __|
| |__| | | | (_| |\ V  V /   ____) | (_| (_| | |_| ||  __/ |  | |_) | | (_) | |_ 
|_____/|_|  \__,_| \_/\_/   |_____/ \___\__,_|\__|\__\___|_|  | .__/|_|\___/ \__|
                                                              | |                
                                                              |_|                
*/
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 0)
        .attr("cx", function(d) {return xScale(d.mystical -  d.badtrip); })
        .attr("cy", function(d) {return yScale(100- d.addiction); })
        .style("fill", function (d) { return classcolors[d.class]; })
        .on("click", function(d) {

        }) 
            //Add .on("mouseover", .....
    
/*
 _______          _ _   _             _____       _                      _   _             
|__   __|        | | | (_)           |_   _|     | |                    | | (_)            
   | | ___   ___ | | |_ _ _ __         | |  _ __ | |_ ___ _ __ __ _  ___| |_ _  ___  _ __  
   | |/ _ \ / _ \| | __| | '_ \        | | | '_ \| __/ _ \ '__/ _` |/ __| __| |/ _ \| '_ \ 
   | | (_) | (_) | | |_| | |_) |      _| |_| | | | ||  __/ | | (_| | (__| |_| | (_) | | | |
   |_|\___/ \___/|_|\__|_| .__/      |_____|_| |_|\__\___|_|  \__,_|\___|\__|_|\___/|_| |_|
                         | |                                                           
                         |_|              
*/
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d["drug"] + "<br/>"
                        + "Number of Reports: " + d["amount"] + "<br/>"
                        + "Type: " + classes[d.class] + "<br/>"
                        + "Exceptional Experience Rate: " + d["mystical"] + "%<br/>"
                        + "Negative Experience Rate: " + d["badtrip"] + "%<br/>"
                        + "Reported Addiction Rate: " + d["addiction"] + "%<br/>")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
        })
    
        .on("mousemove", function(d){
            tooltip.style("left", d3.event.pageX + 15 +"px")
            tooltip.style("top", d3.event.pageY+"px")
            
        })
    
    
        //Then Add .on("mouseout", ....
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
    
        .transition()
                .duration(1000)
                .attr("r", function(d) { return Math.sqrt(d.amount); })
                .style("opacity", .5);

    svg.selectAll("notdot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 0)
        .attr("cx", function(d) {return xScale(d.mystical -  d.badtrip); })
        .attr("cy", function(d) {return yScale(100- d.addiction); })

        .style("fill", "none")
	.style("stroke", "black")
	.style("stroke-width", .5)
 	.transition()
                .duration(1000)
                .attr("r", function(d) { return Math.sqrt(d.amount); })
                .style("opacity", .5);
        
        
        
                
/*
 _____                          _           _          _     
|  __ \                        | |         | |        | |    
| |  | |_ __ __ ___      __    | |     __ _| |__   ___| |___ 
| |  | | '__/ _` \ \ /\ / /    | |    / _` | '_ \ / _ \ / __|
| |__| | | | (_| |\ V  V /     | |___| (_| | |_) |  __/ \__ \
|_____/|_|  \__,_| \_/\_/      |______\__,_|_.__/ \___|_|___/
*/
        
        //TOP: "less addictive"
         svg.append("text")
            .attr("class", "labelTop")
            .attr("x", function(d) {return xScale(0);})
            .attr("y", function(d) {return yScale(103);})
            .style("text-anchor", "middle")
            .style("fill", "LimeGreen")
            .attr("font-size", "25px")
            .text("Less Addictive");    
        
        //BOTTOM: "more addictive"
        svg.append("text")
            .attr("class", "labelBottom")
            .attr("x", function(d) {return xScale(0);})
            .attr("y", function(d) {return yScale(54);})
            .style("text-anchor", "middle")
            .style("fill", "Red")
            .attr("font-size", "25px")
            .text("More Addictive");
        
        //LEFT: "more bad trips" 
        svg.append("text")
            .attr("class", "labelLeft")
            .attr("x", function(d) {return xScale(-13);})
            .attr("y", function(d) {return yScale(81);})
            .style("text-anchor", "middle")
            .style("fill", "Red")
            .attr("font-size", "20px")
            .text("More Bad Experiences");  
        
        //RIGHT: "more good trips"
        svg.append("text")
            .attr("class", "labelRight")
            .attr("x", function(d) {return xScale(20);})
            .attr("y", function(d) {return yScale(81);})
            .style("text-anchor", "middle")
            .style("fill", "LimeGreen")
            .attr("font-size", "20px")
            .text("More Good Experiences");  
              

          
/*

   _____  _____       __          __  _      ______ _____ ______ _   _ _____  
  |  __ \|  __ \     /\ \        / / | |    |  ____/ ____|  ____| \ | |  __ \ 
  | |  | | |__) |   /  \ \  /\  / /  | |    | |__ | |  __| |__  |  \| | |  | |
  | |  | |  _  /   / /\ \ \/  \/ /   | |    |  __|| | |_ |  __| | . ` | |  | |
  | |__| | | \ \  / ____ \  /\  /    | |____| |___| |__| | |____| |\  | |__| |
  |_____/|_|  \_\/_/    \_\/  \/     |______|______\_____|______|_| \_|_____/ 
*/
	var LegendXPos = width-200
	var LegendYPos = height-325 
	var LegendWidth = 150
	var LegendHeight = 200     

	svg.append("rect")
            .attr("x", LegendXPos)
            .attr("y", LegendYPos)
            .attr("width", LegendWidth)
            .attr("height", LegendHeight)
            .attr("fill", "lightgrey")
            .style("opacity", .6)
            .style("stroke-size", "1px");

        svg.append("circle")
            .attr("r", Math.sqrt(100))
            .attr("cx", LegendXPos + LegendWidth/2)
            .attr("cy", LegendYPos + 33.5)
            .style("fill", "white");

        svg.append("circle")
            .attr("r", Math.sqrt(500))
            .attr("cx", LegendXPos + LegendWidth/2)
            .attr("cy", LegendYPos + 70)
            .style("fill", "white");

        svg.append("circle")
            .attr("r", Math.sqrt(1000))
            .attr("cx", LegendXPos + LegendWidth/2)
            .attr("cy", LegendYPos + 128)
            .style("fill", "white");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", LegendXPos + LegendWidth/2)
            .attr("y", LegendYPos + 20)
            .style("text-anchor", "middle")
            .attr("font-size", "14px")
            .text("100");

        svg.append("text")
            .attr("class", "label")
            .attr("x", LegendXPos + LegendWidth/2)
            .attr("y", LegendYPos + 75)
            .style("text-anchor", "middle")
            .attr("font-size", "14px")
            .text("500");

        svg.append("text")
            .attr("class", "label")
            .attr("x", LegendXPos + LegendWidth/2)
            .attr("y", LegendYPos + 135)
            .style("text-anchor", "middle")
            .attr("font-size", "14px")
            .text("1000");

         svg.append("text")
            .attr("class", "label")
            .attr("x", LegendXPos + LegendWidth/2)
            .attr("y", LegendYPos + LegendHeight - 20)
            .style("text-anchor", "middle")
            .style("fill", "Blue") 
            .attr("font-size", "16px")
            .text("Submitted Reports"); 
/*
 _____  _____       __          __  _  __________     __
|  __ \|  __ \     /\ \        / / | |/ /  ____\ \   / /
| |  | | |__) |   /  \ \  /\  / /  | ' /| |__   \ \_/ / 
| |  | |  _  /   / /\ \ \/  \/ /   |  < |  __|   \   /  
| |__| | | \ \  / ____ \  /\  /    | . \| |____   | |   
|_____/|_|  \_\/_/    \_\/  \/     |_|\_\______|  |_|   
*/
	
	var KeyYBase = 325
	var KeyYInterval = 35
	var KeyYTextBase = 308
	var KeyTextXPos = 37      

	svg.append("rect")
            .attr("x", 0)
            .attr("y", height-330)
            .attr("width", 120)
            .attr("height", 310)
            .attr("fill", "lightgrey")
            .style("opacity", .6)
            .style("stroke-size", "1px");

        svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(0*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "Aquamarine");
          
        svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(1*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "ForestGreen");
          
         svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(2*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "Gold");
          
        svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(3*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "Purple");
          
        svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(4*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "Violet");
          
        svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(5*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "Red");
          
         svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(6*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "DarkOrange");
          
        svg.append("rect")
            .attr("x", 5)
            .attr("y", height-KeyYBase+(7*KeyYInterval))
            .attr("width", 28)
            .attr("height", 28)
            .style("opacity", .8)
            .style("fill", "DarkGray");

	       

	svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(0*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Hallucinogens");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(1*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Cannabinoids");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(2*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Stimulants");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(3*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Opioids");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(4*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Depressants");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(5*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Deliriants");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(6*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Dissociatives");
          
        svg.append("text")
            .attr("class", "label")
            .attr("x", KeyTextXPos)
            .attr("y", height-KeyYTextBase+(7*KeyYInterval))
            .style("text-anchor", "begin")
            .attr("font-size", "12px")
            .text("Other");

         svg.append("text")
            .attr("class", "label")
            .attr("x", 55)
            .attr("y", height-30)
            .style("text-anchor", "middle")
            .style("fill", "Blue") 
            .attr("font-size", "16px")
            .text("Color Key");
});
