    //Define Margin
    var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
        width = 1100 - margin.left -margin.right,
        height = 800 - margin.top - margin.bottom;

 //Define Scales   
    var xScale = d3.scale.linear()
        .domain([0,16]) //Need to redefine this after loading the data
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([-10,400]) //Need to redfine this after loading the data
        .range([height, 0]);
    
    //Define Tooltip here
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var amountThreshold = 0;

//I don't know how to select specific checkbox
d3.select("input").on('change', function() {
    console.log("checkbox");
    if (amountThreshold == 0) amountThreshold = 300;//turn threshold on or off
    else amountThreshold = 0;
});

d3.select('button').on('click', function() {
     //Define SVG
      d3.select("svg").remove();
      var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       //Get Data
    d3.csv("drugamounts.csv", function(error,data) {
         //Define Color
        var colors = d3.scale.category20();
        colors.domain(d3.keys(data[0]).filter(function(key) { return key !== "drug"; }));
        data.forEach(function(d) {
            d.drug = d.drug;
            if (d.amount > amountThreshold)  {d.amount = +d.amount;}//filter out less popular drugs if checkbox is selected
            else {d.amount = +0;}
                
        });
        
    //Draw Scatterplot
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return Math.sqrt(d.amount)/.4; })
        .attr("cx", function(d) {return Math.random() * 950;})
        .attr("cy", function(d) {return Math.random() * 650;})
        .style("fill", function (d) { return colors(d.drug); })
        .on("click", function(d) {
           d3.select("svg").remove();
            var svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            svg.append("circle")
                .attr("r", Math.sqrt(1556)/.2)
                .attr("cx", width/2)
                .attr("cy", height/2)
                .style("fill", "green")
                .style("opacity", .6)
                .on("mouseover", function(d) {
                    tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                    tooltip.html("Salvia Divinorum:" + "<br/>"
                        + "Number of Reports: " + "1556" + "<br/>")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                }); 
            svg.append("circle")
                .attr("r", Math.sqrt(700)/.2)
                .attr("cx", width/2 - 210)
                .attr("cy", height/2 + 115)
                .style("fill", "red")
                .style("opacity", .6)
                .on("mouseover", function(d) {
                    tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                    tooltip.html("Salvia Divinorum:" + "<br/>"
                        + "Bad Trips: " + "713" + "<br/>")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                }); 
            svg.append("circle")
                .attr("r", Math.sqrt(119)/.2)
                .attr("cx", width/2 + 210)
                .attr("cy", height/2 - 115)
                .style("fill", "blue")
                .style("opacity", .6)
                .on("mouseover", function(d) {
                    tooltip.transition()
                    .duration(200)
                    .style("opacity", .9)
                    tooltip.html("Salvia Divinorum:" + "<br/>"
                        + "Mystical Experiences: " + "809" + "<br/>")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                }); 
        })
            //Add .on("mouseover", .....
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d["drug"] + "<br/>"
                        + "Number of Reports: " + d["amount"] + "<br/>")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
        })
        //Then Add .on("mouseout", ....
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });   
    });
});
