eevv.vizzer = function (eevvType, theDrug, profiles, drugTotalsArray, threshold) {


    var w = 500, //width
        h = 500, //height
        r = 250, //radius
        color = d3.scale.category20c(); //builtin range of colors

    var data = [];
    var iter = 0;
    for (var item in eevvType) {
        if (eevvType[item] in profiles[theDrug]) {
            data[iter] = {
                "label": eevvType[item],
                "value": profiles[theDrug][eevvType[item]]
            }
            iter++;
        }
    }


    d3.select("#cdl").style("border", "5px darkgray dashed");
    var vis = d3.select("body")
        .append("svg:svg") //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")") //move the center of the pie chart from 0, 0 to radius, radius
    var arc = d3.svg.arc() //this will create <path> elements for us using arc data
        .outerRadius(r);
    var pie = d3.layout.pie() //this will create arc data for us given a list of values
        .value(function (d) {
            return d.value;
        }); //we must tell it out to access the value of each element in our data array
    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice"); //allow us to style things in the slices (like text)
    arcs.append("svg:path")
        .attr("fill", function (d, i) {
            return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
    .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function
    arcs.append("svg:text") //add a label to each slice
    .attr("transform", function (d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.innerRadius = 0;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
    })
        .attr("text-anchor", "middle") //center the text on it's origin
    .text(function (d, i) {
        return data[i].label;
    }); //get the label from our original data array
    
//    vis.selectAll("g.slice").transition().duration(2000).attr("transform", function (d) { 
//        d.innerRadius = 0;
//        d.outerRadius = r;
//        return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
//    })

    /*
    //make chart
    $(document).ready(function () {
        var str = "";
        str += "<tr><td>Drug</td>"
        for (key in eevvType) {
            str += "<td>" + eevvType[key] + "</td>";
        }
        str += "</tr>";
        $("#outTable").append(str);
    });
    $(document).ready(function () {
        var str = "";

        //loop through drugTotalsArray so we can get most popular
        //drug at top and go in descending order
        for (var i = 0; i < drugTotalsArray.length; i++) {
            var drug = drugTotalsArray[i][0];

            //because drugs with counts of 0 will not be in profiles
            if (drug in profiles && profiles[drug]["total"] > threshold) {
                str += "<tr><td>" + drug + "</td>";
                for (key in eevvType) {

                    //0s are appended manually because categories with
                    //a count of 0 are just not in the profiles data structure
                    if (eevvType[key] in profiles[drug]) {
                        var percent = profiles[drug][eevvType[key]] / profiles[drug]["total"];
                        percent = (Math.round(percent * 1000)) / 10;
                        str += "<td>" + percent + "</td>";
                    } else {
                        str += "<td>" + "0" + "</td>";
                    }
                }
            }
        }
        str += "</tr>";
        $("#outTable").append(str);
    });
    */
}