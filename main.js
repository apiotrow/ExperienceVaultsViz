document.addEventListener('DOMContentLoaded', function () {
	var globs = require('./js/phaservis/eevvStuff.js');
    var eevv = new globs.eevvStuff();
    var d3 = require('d3');
    var $ = require('./js/phaservis/jquery.js')

    // var completeCompiler = require('./js/phaservis/completeCompiler.js');
    // var compiler = new completeCompiler.compilerStuff();

	var _ = require('./js/phaservis/lodash.js');

    //stat files
    var statfiles = {
         context: require('./JSONS/output/context.json'),
         context_drug: require('./JSONS/output/context_drug.json'),
         context_category :require('./JSONS/output/context_category.json'),
         context_gender :require('./JSONS/output/context_gender.json'),
         context_intensity: require('./JSONS/output/context_intensity.json'),

         intensity: require('./JSONS/output/intensity.json'),
         intensity_context :require('./JSONS/output/intensity_context.json'),
         intensity_drug: require('./JSONS/output/intensity_drug.json'),
         intensity_category :require('./JSONS/output/intensity_category.json'),
         intensity_gender: require('./JSONS/output/intensity_gender.json'),

         gender: require('./JSONS/output/gender.json'),
         gender_context :require('./JSONS/output/gender_context.json'),
         gender_intensity: require('./JSONS/output/gender_intensity.json'),
         gender_drug: require('./JSONS/output/gender_drug.json'),
         gender_category: require('./JSONS/output/gender_category.json'),

         drug: require('./JSONS/output/drug.json'),
         drug_context: require('./JSONS/output/drug_context.json'),
         drug_intensity: require('./JSONS/output/drug_intensity.json'),
         drug_gender: require('./JSONS/output/drug_gender.json'),
         drug_category: require('./JSONS/output/drug_category.json'),

         category: require('./JSONS/output/category.json'),
         category_context: require('./JSONS/output/category_context.json'),
         category_intensity: require('./JSONS/output/category_intensity.json'),
         category_gender: require('./JSONS/output/category_gender.json'),
         category_drug: require('./JSONS/output/category_drug.json'),
    };



    //setup drawing area
    var svgW = 600;
    var svgH = 500;
    var margin_x = 32;
    var margin_y = 20;
    var svg = d3.select('#vis').append('svg').attr('width',svgW).attr('height',svgH);

    var g = svg.append("svg:g");


    // var circ1 = circ(g, 40, 30, 15, 'blue', 'green');
    // var rect1 = rect(g, 50, 100, 10, 100);

    // rect1.attr('transform', 'translate(100, 60),scale(2, 1),rotate(30, 150, 100)');
    // rect1.attr('transform', 'scale(2, 1)');
    // rect1.attr('transform', 'rotate(30, 150, 100)');

    //expanding circle
    // circ1.transition().delay(100).duration(4000).attr('r',50).attr('cx', 90).style('fill','red');



    //BAR GRAPH
    //---
    var testfile = statfiles.context_gender;
    var gender = "Female";
    var data = getStats2(testfile, gender, "perc", 1);
    console.log(data);

    var y = d3.scaleLinear().domain([0, data[0][1]]).range([0 + margin_y, svgH - margin_y]);
    var x = d3.scaleLinear().domain([0, data.length]).range([0 + margin_x, svgW - margin_x]);

    //numbers on scale
    g.selectAll('.yLabel').data(y.ticks(5)).enter().append('svg:text').attr('class','yLabel')
    .text(String).attr('x',25).attr('y', function(d,i){return svgH - y(d)}).attr('text-anchor','end');

    //%s on scale
    g.selectAll('.yPercents').data(y.ticks(5)).enter().append('svg:text').attr('class','yPercents').text("%")
    .attr('x',25).attr('y', function(d,i){return svgH - y(d)});

    //horizonal grid lines
    var yGrid = g.selectAll('.yGrid').data(y.ticks(5)).enter().append('svg:line').attr('class','yGrid')
    .attr('x1', 0).attr('y1', function(d,i){return svgH - y(d)})
    .attr('x2', svgW).attr('y2', function(d,i){return svgH - y(d)}).attr('stroke','gray');

    //bars
    var bar = g.selectAll('rect')
    .data(data).enter().append('rect')
    .attr('x',function(d,i){return x(i);})
    .attr('y', function(d,i){return svgH - y(d[1]);}) //top of bars
    .attr('height',function(d,i){return y(d[1]) - margin_y;}) //don't go past bottom margin
    .attr('width', 20)
    .style('fill','blue')
    .style('opacity', 1)
    .attr('class','bar');

    //bar labels
    g.selectAll(".bar").enter().data(data).enter().append('text')
    .text(function(d,i){return d[0];})
    .attr('x',function(d,i){return x(i);})
    .attr('y', function(d,i){return svgH - y(d[1]);})
    .attr('class','barlabel');

    // g.selectAll('.barlabel').attr('transform', 'rotate(30, 0, 0)');



    // g.selectAll('.bar').data(data).enter().append('svg:text')
    // .text(function(d,i){return d[0];})
    // .attr('x',function(d,i){return x(i);})
    // .attr('y', function(d,i){return svgH - y(d[1]);}) //top of bars
    // .style('fill','blue')
    // .style('opacity', 1);

    bar.attr('transform','translate(20,0)'); //push them right so scale numbers aren't on top
    yGrid.attr('transform','translate(50,0)');
    // g..attr('transform', 'rotate(30, 150, 100)');

    //load gender alone data
    testfile = statfiles.gender;
    data = getStats1(testfile, "perc", 1);

    //make translucent block showing the average
    var avgBlock = g.append('rect').attr('x', 50).attr('y', y(testfile[gender]['perc']))
    .attr('width', svgW).attr('height', y(testfile["Female"]['perc']) - margin_y)
    .style('opacity', 0.5).style('fill','orange');









    //make shape functions
    function circ(obj, cx, cy, r, fill, outline){
        return obj.append('circle').attr('r',r).attr('cx', cx).attr('cy', cy).style('fill', fill).style('stroke',outline);
    }

    function rect(obj, x, y, w, h){
        return obj.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h);
    }


    //bullet list
    d3.select('body').append('ul');
    d3.select('ul').selectAll('li').data(data).enter().append('li').text(function(d){
        return(d[0] + ": " + d[1]);
    });




    // var selection = d3.selectAll("div");
    // selection.text("hey");

    // d3.selectAll("div")
    // .text("yoyo")
    // .style('text-align','left')
    // .append("p")
    // .text("hi");

    // d3.select("div").append('p').text("yes");

    // d3.select('body').insert('div', 'div:nth-child(3)').text("yee");

    // console.log(d3.selectAll("div").text());
    // d3.select("h1").attr('align',"center").html('<h2>heyguys</h2>');

    // d3.select('body').html("<h1>fuck you</h1>");






    //for statfiles with only 1 group
    //outputs sorted array for chosen stat (raw, perc, whatever)
    function getStats1(file, stat, thresh)
    {
        var sortable=[];
        for(var key in file)
            if(file.hasOwnProperty(key))
                sortable.push([key, file[key][stat]]);

        sortable.sort(function(a, b){
            return b[1]-a[1];
        });
        return sortable;
    }

    //for statfiles where two groups are compared.
    //outputs a sorted array with the chosen group and stat.
    //---
    //file is context_gender or whatever
    //group is the value for gender we want, e.g. "Female", "Not-Specified"
    //stat is raw, perc, total, whatever
    //thresh is minimum total (to avoid the top being 100% for something with 1 entry)
    function getStats2(file, group, stat, thresh)
    {
        var sortable=[];
        for(var key in file)
            if(file.hasOwnProperty(key)){
                //make sure it has an entry for "Female" or whatever.
                //if it doesn't, that means it was 0
                if(file[key].hasOwnProperty(group) && file[key][group]["total"] >= thresh)
                    sortable.push([key, file[key][group][stat]]);
            }

        sortable.sort(function(a, b){
            return b[1]-a[1];
        });
        return sortable;
    }


    
});