eevv.changeText = function () {
    d3.selectAll("g").select("text").text(function (d) {
        return "sdf"
    });
}

window.onload = function () {

    //initial graph
    var cat = eevv.categoriesTrimmed.badTrip;
    d3.csv("csvs/categprofilestrimmed.csv", function (error, data) {
        data = data.sort(function (a, b) {
            return b[cat] - a[cat];
        });
        eevv.selectorSetup(data, cat);
        eevv.dataViz(data, cat);

    });

    //reloading the graph with new data
    eevv.reloadData = function (dat) {
        d3.selectAll("#infoVizSVG").remove(); //get rid of old bar graph
        var cat = dat;
        d3.csv("csvs/categprofilestrimmed.csv", function (error, data) {
            //            console.log(data[0]);
            data = data.sort(function (a, b) {
                return b[cat] - a[cat];
            });
            eevv.dataViz(data, cat);

        });
    }


    eevv.selectorSetup = function (incomingData, cat) {
        var selSetupW = 200;
        var selSetupH = 600;
        var topPadding = 0;
        var spacing = 1.4;

        //create color ramp
        var numCatIter = 0;
        var catRange = [];
        for (var i in eevv.categoriesTrimmed) {
            catRange.push(numCatIter++);
        }
        //        var colorDivider = Math.round(360 / catRange.length);
        //
        //        var colorRange = [];
        //        for (var i = 0; i < 360; i += colorDivider) {
        //            colorRange.push(d3.hcl("hsl(" + i + ", 100%, 50%)"));
        //        }
        //        var colorRamp = d3.scale.linear().domain(catRange).range(colorRange);
        var buttonOpacity = .6;

        //another way to color ramp
        //        var colorRamp = d3.scale.linear()
        //            .interpolate(d3.interpolateHcl)
        //            .domain([0, numCatIter]).range(["yellow", "blue"]);

        //and another way
        //        var colorRamp = d3.scale.linear()
        //            .interpolate(d3.interpolateLab)
        //            .domain([0, numCatIter]).range(["yellow", "blue"]);

        //another another way
        var col = d3.scale.category20();
        col.domain(catRange);
        var colorRamp = d3.scale.linear().domain(col.domain()).range(col.range());

        //set up div and svg for selectors
        d3.select("#selectorDiv").attr("style", "height: " + selSetupH + "px; width:" + selSetupW + "px;");
        d3.select("#selectorDiv").append("svg").attr("id", "selectors").attr("style", "height: " + selSetupH + "px; width:" + selSetupW + "px;");

        //create g's for buttons
        d3.select("#selectors").selectAll("g").data(incomingData).enter().append("g").attr("id", "button");

        var cats = [];
        for (var i in eevv.categoriesTrimmed) {
            cats.push(eevv.categoriesTrimmed[i]);
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
            .on("click", eevv.reloadData).html(function (d) {
                return d;
            });
        //        .attr("onclick", "eevv.reloadData(eevv.categoriesTrimmed.addiction)");


    }




    //bar graphs
    eevv.dataViz = function (incomingData, cat) {
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
            .enter()
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

        //make bar mouse is hovering over be brighter
        d3.selectAll(".bar").on("mouseover", function change(d) {
            rec.style("fill", function (p) {
                if (p["Drug"] == d["Drug"]) {
                    this.parentElement.appendChild(this); //moves the element (to top i think)
                    //                    console.log(this);
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
        eevv.readTextFile("txts/drugtotals.txt", function (result) {
            drugTotalsArray = result.split(/\n/);

            //remove escape characters from each drug name
            for (var i = 0; i < drugTotalsArray.length; i++) {
                drugTotalsArray[i] = drugTotalsArray[i].replace(/(\r\n|\n|\r)/gm, "");
                drugTotalsArray[i] = drugTotalsArray[i].split(/\t/);
                drugTotalsHash[drugTotalsArray[i][0]] = drugTotalsArray[i][1];
            }
        });

        //        console.log(incomingData);

        //on-click behavior for bars
        //makes a floating html table from modal.html and populated it with data
        d3.text("modal.html", function (d) {
            d3.select("body").append("div").attr("id", "modal").html(d)
        });

        d3.selectAll(".bar").on("click", clickBar);

        function clickBar(d) {

            d3.selectAll("td.data")
                .data(d3.values(d)) //get the values for item d (which is the data bound to the rect we're clicking)
            .html(function (p) {
                return drugTotalsHash[p];
            });
        }




        ///adding an SVG
        d3.html("stimul.svg", function (data) {
            while (!d3.select(data).selectAll("path").empty()) {
                d3.select("svg")
                    .node()
                    .appendChild(d3.select(data)
                        .select("path")
                        .node());
            }
            d3.selectAll("path").attr("transform", "translate(50, 50)");
        });





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



    //    //bar graphs
    //    function dataViz(incomingData) {
    //        var maxPopulation = d3.max(incomingData, function (el) {
    //            return parseFloat(el[cat]);
    //        });
    //
    //        var wid = 20;
    //        var hei = 600;
    //        var yScale = d3.scale.linear().domain([0, maxPopulation]).range([0, 460]);
    //        d3.select("svg").attr("style", "height: " + hei + "px; width: 1000px;");
    //        d3.select("svg")
    //            .selectAll("rect")
    //            .data(incomingData)
    //            .enter()
    //            .append("rect")
    //            .attr("id", "re")
    //            .attr("width", wid)
    //            .attr("height", function (d) {
    //                return 0;
    //            })
    //            .attr("x", function (d, i) {
    //                return i * wid;
    //            })
    //            .attr("y", function (d) {
    //                return hei;
    //            })
    //            .style("fill", "black")
    //            .style("stroke", "red")
    //            .style("stroke-width", "1px")
    //            .style("opacity", 1)
    //            .transition()
    //            .duration(function (d) {
    //                return yScale(parseFloat(d[cat])) * 2;
    //            })
    //            .attr("height", function (d) {
    //                return yScale(parseFloat(d[cat]));
    //            }).attr("y", function (d) {
    //                return hei - yScale(parseFloat(d[cat]));
    //            });
    //
    //
    //
    //        var barG = d3.selectAll("svg").selectAll("g").data(incomingData).enter().append("g").attr("transform", function (d, i) {
    //            return "translate(" +
    //                i * wid + "," + (hei - yScale(d[cat])) + ")rotate(-45)";
    //        });
    //
    //        barG.append("text").text(function (d) {
    //            return d["Drug"];
    //        }).attr("transform", "translate(10, 0)");
    //
    //        //        d3.selectAll("svg").attr("transform", "rotate(2)");
    //    }









    //         //simple bar chart thing
    //        var yScale = d3.scale.linear()
    //            .domain([0, 100, 6000])
    //            .range([0, 100, 200])
    //            .clamp(true);
    //
    //        d3.select("svg")
    //            .selectAll("rect")
    //            .data([14, 68, 24500, 430, 19, 1000, 5555])
    //            .enter()
    //            .append("rect")
    //            .attr("width", 40)
    //            .attr("height", function (d) {
    //                return yScale(d);
    //            })
    //            .style("fill", "blue")
    //            .style("stroke", "red")
    //            .style("stroke-width", "1px")
    //            .style("opacity", .25)
    //            .attr("x", function (d, i) {
    //                return i * 40;
    //            })
    //            .attr("y", function (d) {
    //                return 500 - yScale(d);
    //            });


    //    console.log(document.getElementsByClassName("drug")[0].__data__);







    //circle moving to center thing

    //        d3.csv("csvs/categprofilestrimmed.csv", function (d) {
    //            console.log(d)
    //        });
    //        console.log(Date.parse("Aug 22 1985"));
    //        console.log(Date.parse("Aug 23 1985"));
    //
    //
    //        for (var i = 0; i < 10; i++) {
    //            d3.select("svg")
    //                .append("circle")
    //                .attr("r", i * 10)
    //                .attr("cx", i * 40)
    //                .attr("cy", i * 40)
    //                .style("fill", "lightblue");
    //        }
    //
    //        d3.select("svg")
    //            .append("text")
    //            .attr("id", "a")
    //            .attr("x", 20)
    //            .attr("y", 20)
    //            .style("opacity", 0)
    //            .text("fg fgddd");
    //        d3.select("svg")
    //            .append("circle")
    //            .attr("r", 100)
    //            .attr("cx", 400)
    //            .attr("cy", 400)
    //            .style("fill", "lightblue");
    //        d3.select("svg")
    //            .append("text")
    //            .attr("id", "b")
    //            .attr("x", 400)
    //            .attr("y", 400)
    //            .style("opacity", 0)
    //            .text("dfgdfg");
    //
    //        d3.select("#a").transition().delay(500).style("opacity", 1);
    //        d3.select("#b").transition().delay(1000).style("opacity", .3);
    //        d3.selectAll("circle").transition().duration(1000).attr("cy", 200).attr("r", 10);
    //
    //
    //
    //        d3.select("#he").on("click", function () {
    //            console.log("sdfsdf");
    //        });
}