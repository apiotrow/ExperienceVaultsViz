define(['ErowidCategories','d3.min'], function(ErowidCategories, d3) {




    







	console.log("viz.js");

	var erowidCats = new ErowidCategories();


    var currentCategory = erowidCats.categoriesTrimmed.badTrip;
	d3.csv("csvs/categprofilestrimmed.csv", function (error, data) {
		var cat = erowidCats.categoriesTrimmed.badTrip;
        data = data.sort(function (a, b) {
            return b[cat] - a[cat];
        });
        selectorSetup(data, cat);
        bars(data, cat);

    });


    function selectorSetup (incomingData, cat) {
        var selSetupW = 200;
        var selSetupH = 600;
        var topPadding = 0;
        var spacing = 1.1;

        //create color ramp
        var numCatIter = 0;
        var catRange = [];
        for (var i in erowidCats.categoriesTrimmed) {
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
        for (var i in erowidCats.categoriesTrimmed) {
            cats.push(erowidCats.categoriesTrimmed[i]);
        }
        var btnW = 200,
            btnH = 35;

        //create rectangle for button
        d3.selectAll("#button").data(cats).append("rect").attr("width", btnW).attr("height", btnH)
            .attr("transform", function (d, i) {
                return ("translate(0," + (i * btnH * spacing + topPadding) + ")");
            }).style("fill", function (d, i) {
                return colorRamp(i)
            })
            .attr("opacity", buttonOpacity)
            .on("click", erowidCats.reloadData).html(function (d) {
                return d;
            });

        //create category text for button
        d3.selectAll("#button").data(cats).append("text").text(function (d) {
            return d;
        })
            .attr("transform", function (d, i) {
                return ("translate(0," + (i * btnH * spacing + topPadding + (btnH / 2)) + ")");
            }).attr("font-size", "20px");
    }

    //bar graphs
    function bars (incomingData, cat) {
        var barW = 20;
        var divH = 600;
        var barColor = d3.rgb("orange");

        var maxPopulation = d3.max(incomingData, function (el) {
            return parseFloat(el[cat]);
        });

        var yScale = d3.scale.linear().domain([0, maxPopulation]).range([0, 460]);
        d3.select("#infovizDiv").attr("style", "height: " + divH + "px; width: 1000px;");
        d3.select("#infovizDiv").append("svg").attr("id", "infoVizSVG").attr("style", "height: " + divH + "px; width: 1000px;");

        //set up bars for bar graph
        var rec = d3.select("#infoVizSVG")
            .selectAll("rect")
            .data(incomingData)
            .enter() //return a selection whose array contains the data the rect elements will use
            .append("rect")
            .attr("class", "bar")
            .attr("width", barW)
            .attr("height", function (d) {
                return 0;
            })
            .attr("x", function (d, i) {
                return i * barW;
            })
            .attr("y", function (d) {
                return divH;
            })
            .style("fill", barColor)
            .style("stroke", "red")
            .style("stroke-width", "1px")
            .style("opacity", 1);

        //make bars shoot upward when graph loads
        rec.transition()
            .duration(function (d) {
                return yScale(parseFloat(d[cat])) * 2;
            })
            .attr("height", function (d) {
                return yScale(parseFloat(d[cat]));
            }).attr("y", function (d) {
                return divH - yScale(parseFloat(d[cat]));
            });

        //make bar mouse is hovering over be brighter, and move the bar to be on top of everything else
        //(re-appending it the parent element so it moves to bottom of list of DOM elements, so drawn on top)
        d3.selectAll(".bar").on("mouseover", function change(d) {
            rec.style("fill", function (p) {
                if (p["Drug"] == d["Drug"]) {
                    this.parentElement.appendChild(this); //moves the element (to top i think)
                }
                return p["Drug"] == d["Drug"] ? barColor.brighter(.75) : barColor;
            });
        });

        //set bars back to normal color when not hovering over
        d3.selectAll(".bar").on("mouseout", function change(d) {
            return rec.style("fill", barColor); //classed("highlighted", true);
        });


        /*
        on click functionality
        */
        //make a version of drugTotalsHash just for this d3 test file
        drugTotalsArray = [];
        drugTotalsHash = {};
        //fill drugTotalsArray and drugTotalsHash
        //fill drugTotalsArray and drugTotalsHash
        erowidCats.readTextFile("txts/drugtotals.txt", function (result) {
            drugTotalsArray = result.split(/\n/);


            //remove escape characters from each drug name
            for (var i = 0; i < drugTotalsArray.length; i++) {
                drugTotalsArray[i] = drugTotalsArray[i].replace(/(\r\n|\n|\r)/gm, "");
                drugTotalsArray[i] = drugTotalsArray[i].split(/\t/);
                drugTotalsHash[drugTotalsArray[i][0]] = drugTotalsArray[i][1];
            }
            console.log(drugTotalsArray);
        });

        //        console.log(incomingData);

        //on-click behavior for bars
        //makes a floating html table from modal.html and populated it with data
//        d3.text("modal.html", function (d) {
//            d3.select("body").append("div").attr("id", "modal").html(d)
//        });
//
//        d3.selectAll(".bar").on("click", clickBar);
//
//        function clickBar(d) {
//
//            d3.selectAll("td.data")
//                .data(d3.values(d)) //get the values for item d (which is the data bound to the rect we're clicking)
//            .html(function (p) {
//                return drugTotalsHash[p];
//            });
//        }




        ///adding an SVG
        d3.html("stimul.svg", function (data) { //data is the SVG data
            //loop goes into svg and removes all stuff that isn't path, because
            //svgs have extraneous data that we don't need
            //            while (!d3.select(data).selectAll("path").empty()) {
            //                d3.select("svg")
            //                    .node()
            //                    .appendChild(d3.select(data)
            //                        .select("path")
            //                        .node());
            //            }

            //append a g with id "stimulantIcon" to left hand selectors divs, then give it the path
            //from the coffee SVG
            d3.select("#selectors").append("g").attr("id", "stimulantIcon").each(function () {
                var divParent = this; //"this" is the <g id "stimulantIcon">
                //more efficient than the while loop above.
                d3.select(data).selectAll("path").each(function () {
                    divParent.appendChild(this.cloneNode(true)); //"this" is the path from the SVG
                });
            });

            d3.selectAll("path").attr("transform", "translate(0, 0)").style("fill", "darkred").style("stroke", "black").style("stroke-width", "1px");
        });
        
        //this will bind data to the paths, so we can make it so when you click any part of the SVG, it can
        //do something with data thats bound to it
//        d3.select("#stimulantIcon").each(function(d){
//            console.log(d3.select(this).selectAll("path"));
//            d3.select(this).selectAll("path").datum(d);
//        });
        
        //moves it, but then it moves back to 0,0. don't know why
//         d3.select("#stimulantIcon").selectAll("path").attr("transform", "translate(50, 50)");



        //set position for each text's <g>, rotate it 45, and assign it to barG
        var barG = d3.select("#infoVizSVG").selectAll("g").data(incomingData).enter()
            .append("g").attr("transform", function (d, i) {
                return "translate(" +
                    i * barW + "," + (divH - yScale(d[cat])) + ")rotate(-45)";
            });

        //create text and append them to each bar
        barG.append("text").text(function (d) {
            return d["Drug"];
        }).attr("transform", "translate(10, 0)");

        //        d3.select(".bar").each(function (d, i) {
        //            console.log(d);
        //            console.log(i);
        //            console.log(this);
        //        });

        //        d3.select(".bar").node();

        //inserting image. must set height and width or image won't render
        //        barG.insert("image", "text").attr("xlink:href", function (d) {
        //            return "neder.png";
        //        }).attr("width", "50px").attr("height", "50px").attr("x", "0")
        //            .attr("y", "0");

    }
});