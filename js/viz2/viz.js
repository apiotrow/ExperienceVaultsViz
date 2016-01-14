define(['Cats','d3.min'], function(Cats, d3) {

	console.log("viz.js");

	var categories = new Cats();


    var currentCategory = categories.categoriesTrimmed.badTrip;
	d3.csv("csvs/categprofilestrimmed.csv", function (error, data) {
		var cat = categories.categoriesTrimmed.badTrip;
        data = data.sort(function (a, b) {
            return b[cat] - a[cat];
        });
        console.log(data);
        selectorSetup(data, cat);
        // eevv.dataViz(data, cat);

    });


    function selectorSetup (incomingData, cat) {
        var selSetupW = 200;
        var selSetupH = 600;
        var topPadding = 0;
        var spacing = 1.4;

        //create color ramp
        var numCatIter = 0;
        var catRange = [];
        for (var i in categories.categoriesTrimmed) {
            catRange.push(numCatIter++);
        }

        var buttonOpacity = .6;


        //another another way
        var col = d3.scale.category20();
        col.domain(catRange);
        var colorRamp = d3.scale.linear().domain(col.domain()).range(col.range());

        //set up div and svg for selectors
        d3.select("#vizDiv").attr("style", "height: " + selSetupH + "px; width:" + selSetupW + "px;");
        d3.select("#vizDiv").append("svg").attr("id", "selectors").attr("style", "height: " + selSetupH + "px; width:" + selSetupW + "px;");

        //create g's for buttons
        d3.select("#selectors").selectAll("g").data(incomingData).enter().append("g").attr("id", "button");

        var cats = [];
        for (var i in categories.categoriesTrimmed) {
            cats.push(categories.categoriesTrimmed[i]);
        }
        var btnW = 200,
            btnH = 35;

        //create category text for button
        d3.selectAll("#button").data(cats).append("text").text(function (d) {
            return d;
        })
            .attr("transform", function (d, i) {
                return ("translate(0," + (i * btnH * spacing + topPadding + (btnH / 2)) + ")");
            }).attr("font-size", "20px");

        //create rectangle for button
        d3.selectAll("#button").data(cats).append("rect").attr("width", btnW).attr("height", btnH)
            .attr("transform", function (d, i) {
                return ("translate(0," + (i * btnH * spacing + topPadding) + ")");
            }).style("fill", function (d, i) {
                return colorRamp(i)
            })
            .attr("opacity", buttonOpacity)
            .on("click", categories.reloadData).html(function (d) {
                return d;
            });


    }
});