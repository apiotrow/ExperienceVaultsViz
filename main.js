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

    var testfile = statfiles.context_gender;
    // console.log(testfile);

    var t = getStats2(testfile, "Female", "perc", 1);
    // console.log(t);

    // t = getStats2(testfile, "Male", "perc", 10);
    // console.log(t);

    // testfile = statfiles.gender;
    // t = getStats1(testfile, "perc", 10);
    console.log(t);


    var svgW = 600;
    var svgH = 300;
    var svg = d3.select('#vis').append('svg').attr('width',svgW).attr('height',svgH);
    // svg.append('circle').style('stroke', 'red').style('fill', 'yellow').attr('r',50).attr('cx', svgW/2)
    // .attr('cy', svgH/2);

    var g = svg.append("svg:g");

    var circ1 = circ(g, 40, 30, 15, 'blue', 'green');
    var rect1 = rect(g, 50, 100, 10, 100);

    rect1.attr('transform', 'translate(100, 60),scale(2, 1),rotate(30, 150, 100)');
    // rect1.attr('transform', 'scale(2, 1)');
    // rect1.attr('transform', 'rotate(30, 150, 100)');

    circ1.transition().delay(100).duration(4000).attr('r',50).attr('cx', 90);

    d3.select('svg').select('g').selectAll('rect').data(t).enter().append('rect')
    .attr('width', 10).attr('x', function(d, i){return i * 10}).attr('h', function(d, i){return d[1] * 3})
    .attr('y', 100);

    function circ(obj, cx, cy, r, fill, outline){
        return obj.append('circle').attr('r',r).attr('cx', cx).attr('cy', cy).style('fill', fill).style('stroke',outline);
    }

    function rect(obj, x, y, w, h){
        return obj.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h);
    }



    d3.select('body').append('ul');
    d3.select('ul').selectAll('li').data(t).enter().append('li').text(function(d){
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