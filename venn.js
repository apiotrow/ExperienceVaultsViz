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
        width = 1100 - margin.left -margin.right,
        height = 800 - margin.top - margin.bottom;

 //Define Scales   
    var xScale = d3.scale.linear()
        //.domain([0,16]) //Need to redefine this after loading the data
        .range([0, width]);

    var yScale = d3.scale.linear()
        //.base(0.5)
        //.domain([-10,400]) //Need to redfine this after loading the data
        .range([height, 0]);

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(-height);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(-width);
    
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
                .attr("cx", function(d) {return xScale(d.mystical - d.badtrip);})
                .attr("cy", function(d) {return yScale(100- d.addiction);})
            svg.select(".x.axis").call(xAxis);
            svg.select(".y.axis").call(yAxis);
    }


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
        .attr("cx", function(d) {return xScale(d.mystical - d.badtrip); })
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
                .attr("r", function(d) { return Math.sqrt(d.amount)/.4; })
                .style("opacity", .6);
        
        
        
                
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
            .attr("x", width/2)
            .attr("y", 15)
            .style("text-anchor", "middle")
            .style("fill", "Green")
            .attr("font-size", "20px")
            .text("Less Addictive");    
        
        //BOTTOM: "more addictive"
        svg.append("text")
            .attr("x", width/2)
            .attr("y", height-15)
            .style("text-anchor", "middle")
            .style("fill", "Red")
            .attr("font-size", "20px")
            .text("More Addictive");   
        
        //LEFT: "more bad trips" 
        svg.append("text")
            .attr("x", 60)
            .attr("y", height/2)
            .style("text-anchor", "middle")
            .style("fill", "Red")
            .attr("font-size", "1em")
            .text("More Bad Experiences");  
        
        //RIGHT: "more good trips"
        svg.append("text")
            .attr("x", width-60)
            .attr("y", height/2)
            .style("text-anchor", "middle")
            .style("fill", "Green")
            .attr("font-size", "1em")
            .text("More Good Experiences");  
        
    //});
    
});
