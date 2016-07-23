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
    console.log(testfile);

    var t = getStats2(testfile, "Female", "perc", 10);
    console.log(t);
    
    t = getStats2(testfile, "Male", "perc", 10);
    console.log(t);

    //for statfiles with only 1 group
    //outputs sorted array for chosen stat (raw, perc, whatever)
    function getStats1(file, stat)
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