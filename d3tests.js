window.onload = function () {

    for(var i = 0; i < 10; i++){
        d3.select("svg")
        .append("circle")
        .attr("r", i * 10)
        .attr("cx", i * 40)
        .attr("cy", i * 40)
        .style("fill", "lightblue");
    }

    d3.select("svg")
        .append("text")
        .attr("id", "a")
        .attr("x", 20)
        .attr("y", 20)
        .style("opacity", 0)
        .text("fg fgddd");
    d3.select("svg")
        .append("circle")
        .attr("r", 100)
        .attr("cx", 400)
        .attr("cy", 400)
        .style("fill", "lightblue");
    d3.select("svg")
        .append("text")
        .attr("id", "b")
        .attr("x", 400)
        .attr("y", 400)
        .style("opacity", 0)
        .text("dfgdfg");

    d3.select("#a").transition().delay(500).style("opacity", 1);
    d3.select("#b").transition().delay(1000).style("opacity", .3);
    d3.selectAll("circle").transition().duration(1000).attr("cy", 200).attr("r", 10);



    d3.select("#he").on("click", function () {
        console.log("sdfsdf");
    });
}