window.onload = function () {


    d3.csv("csvs/categprofilestrimmed.csv", function (error, data) {
        console.log(data);
        data = data.sort(function (a, b) {
            return b["Mystical Experiences"] - a["Mystical Experiences"];
        });
        dataViz(data);
    });

    function dataViz(incomingData) {
        var maxPopulation = d3.max(incomingData, function (el) {
            return parseInt(el["Mystical Experiences"]);
        });

        
        var wid = 20;
        var yScale = d3.scale.linear().domain([0, maxPopulation]).range([0, 460]);
        d3.select("svg").attr("style", "height: 480px; width: 900px;");
        d3.select("svg")
            .selectAll("rect")
            .data(incomingData)
            .enter()
            .append("rect")
            .attr("id", "re")
            .attr("width", wid)
            .attr("height", function (d) {
                return 0;
            })
            .attr("x", function (d, i) {
                return i * wid;
            })
            .attr("y", function (d) {
                return 480;
            })
            .style("fill", "black")
            .style("stroke", "red")
            .style("stroke-width", "1px")
            .style("opacity", 1);

        
        d3.selectAll("rect")
            .transition().duration(function (d) {
                return yScale(parseInt(d["Mystical Experiences"])) * 5;
            })
            .attr("height", function (d) {
                return yScale(parseInt(d["Mystical Experiences"]));
            }).attr("y", function (d) {
                return 480 - yScale(parseInt(d["Mystical Experiences"]));
            });
    }






    
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