
/*
Main viz file
*/
define(['ErowidCategories','jquery', 'd3.min', 'lodash'], function(ErowidCategories, $, d3, _) {
	

	var eevv = new ErowidCategories(); //some utilities and globals
	var complete = {}; //id: everything about the report with that id. for nitty gritty

    eevv.readTextFile("csvs/data-3-brackets.csv", function (result) {

        fillInComplete(result);


        function grabData(group, iter){

            if(iter < group.length - 1){
                grabData(group, ++iter);
            }else{
                for(var i = 0; i < group.length; i++){
                    //if on first group item
                    if(i == 0){
                        //if depth is greater than 1, make obj
                        if(i != group.length - 1){
                            if(_.isString(complete[id][group[i]]) && complete[id][group[i]] != ""){
                                var path = [complete[id][group[i]]];
                                
                                if(!_.has(digResults, path)){
                                    _.set(digResults, path, {});
                                }
                            }else if(_.isObject(complete[id][group[i]]) && !$.isEmptyObject(complete[id][group[i]])){
                                for(key in complete[id][group[i]]){

                                    if(!_.has(digResults, key)){
                                        _.set(digResults, key, {});
                                    }
                                }
                            }
                        }
                        //if not, dig only had length 1, so increment
                        else{
                            if(_.isString(complete[id][group[i]]) && complete[id][group[i]] != ""){
                                var path = [complete[id][group[i]]];

                                if(!_.has(digResults, path)){
                                    _.set(digResults, path, 1);
                                }else{
                                    var val = _.get(digResults, path);
                                    val++;
                                    _.set(digResults, path, val);
                                }
                            }else if(_.isObject(complete[id][group[i]]) && !$.isEmptyObject(complete[id][group[i]])){
                                for(key in complete[id][group[i]]){
                                    // var path = [complete[id][group[i]]];
                                    var path = key;

                                    if(!_.has(digResults, path)){
                                        _.set(digResults, path, 1);
                                    }else{
                                        var val = _.get(digResults, path);
                                        val++;
                                        _.set(digResults, path, val);
                                    }
                                }
                            }
                        }
                    //if not on first
                    }else{
                        //if not on last, add obj to previous iter's entry
                        if(i != group.length - 1){
                            //if haven't made object it yet, add
                            if(_.isString(complete[id][group[i]]) && complete[id][group[i]] != ""){
                                var path = [];

                                for(var k = 0; k <= iter; k++){
                                    path.push(complete[id][group[k]]);
                                }

                                if(!_.has(digResults, path)){
                                    _.set(digResults, path, {});
                                }
                            }else if(_.isObject(complete[id][group[i]]) && !$.isEmptyObject(complete[id][group[i]])){
                                for(key in complete[id][group[i]]){
                                    var path = [];

                                    for(var k = 0; k <= iter; k++){
                                        path.push(complete[id][group[k]]);
                                    }

                                    if(!_.has(digResults, path)){
                                        _.set(digResults, path, {});
                                    }
                                }
                            }
                        //if on last, increment
                        }else{
                            if(_.isString(complete[id][group[i]]) && complete[id][group[i]] != ""){
                                var path = [];

                                for(var k = 0; k <= group.length; k++){
                                    path.push(complete[id][group[k]]);
                                }

                                var poppedPath = path.pop();
                                if(_.isObject(_.get(digResults, poppedPath))){
                                    // console.log("sdf");
                                    // console.log(digResults[poppedPath]);
                                    for(var key in _.get(complete[id], path)){
                                        poppedPath.push(key);
                                        console.log(poppedPath);
                                        if(!_.has(digResults, poppedPath)){
                                            _.set(digResults, poppedPath, 1);
                                        }else{
                                            var val = _.get(digResults, poppedPath);
                                            val++;
                                            _.set(digResults, poppedPath, val);
                                        }
                                    }
                                }else{
                                    if(!_.has(digResults, path)){
                                        _.set(digResults, path, 1);
                                    }else{
                                        var val = _.get(digResults, path);
                                        val++;
                                        _.set(digResults, path, val);
                                    }
                                }
                            }else if(_.isObject(complete[id][group[i]]) && !$.isEmptyObject(complete[id][group[i]])){
                                for(key in complete[id][group[i]]){
                                    var path = [];

                                    for(var k = 0; k <= group.length; k++){
                                        path.push(complete[id][group[k]]);
                                    }

                                    if(!_.has(digResults, path)){
                                        _.set(digResults, path, 1);
                                    }else{
                                        var val = _.get(digResults, path);
                                        val++;
                                        _.set(digResults, path, val);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }



        // function grabData(group, iter){


        //     if(_.isString(complete[id][group]) && complete[id][group] != ""){
        //         var path = [complete[id][group]];

        //         if(!_.has(digResults, path)){
        //             _.set(digResults, path, {});
        //         }
        //     }else if(_.isObject(complete[id][group]) && !$.isEmptyObject(complete[id][group])){
        //         for(key in complete[id][group]){

        //             if(!_.has(digResults, key)){
        //                 _.set(digResults, key, {});
        //             }
        //         }
        //     }
        // }


        // var dig = [eevv.groups.context, eevv.groups.intensity, eevv.groups.gender, eevv.groups.author];
        // var dig = [eevv.groups.context, eevv.groups.intensity, eevv.groups.gender];
        var dig = [eevv.groups.context, eevv.groups.intensity];
        // var dig = [eevv.groups.intensity];
        // var dig = [eevv.groups.context, eevv.groups.intensity];
        var digResults = {};

        for(id in complete){
            grabData(dig, 0);
        }
        console.log(digResults);


        // dig = [eevv.groups.drugsAlone, eevv.groups.context];
        // digResults = {};
        // for(id in complete){
        //     grabData(dig, 0);
        // }
        // console.log(digResults);

    });



	//complete is key: [report id], value: [all things about that report]
	function fillInComplete(result) {
		var csvText = result;
        var reports = csvText.split(/\r/); //array where each entry is a single report
        var reportArray = [];

        //replace commas in nested entries
        for (var i = 1; i < reports.length; i++) {

            //check if entry has quotes in it. if so,
            //loop through all entries that are surrounded by quotes, and remove
            //the quotes around them, and replace the commas with another character
            var firstQuote = reports[i].indexOf('"');
            while (firstQuote != -1) {

                //new report entry with first quote removed
                var temp = reports[i].substring(0, firstQuote) + reports[i].substring(firstQuote + 1);

                //get location of second quote
                var secondQuote = temp.indexOf('"');

                //remove second quote from new entry
                temp = temp.substring(0, secondQuote) + temp.substring(secondQuote + 1);

                //get the formerly quoted entry and replace the commas with something else
                var tempsQuotedEntry = temp.substring(firstQuote + 1, secondQuote);
                var newtempsQuotedEntry = tempsQuotedEntry.replace(/,/g, ';'); //replace commas with another character

                //replace the old report entry with the new one
                reports[i] = temp.replace(tempsQuotedEntry, newtempsQuotedEntry);

                //check for another set of quotes in the entry
                firstQuote = reports[i].indexOf('"');
            }
            reportArray.push(reports[i].split(","));
            //        console.log(reports[i].split(","));
        }

        for (var i = 0; i < reportArray.length; i++) {
        	var id = reportArray[i][0];

            //entry for one report
            var idEntry = {
            	drugs: {},
                drugsAlone: {},
                categories: {},
                nonsubstances: {},
                context: "",
                intensity: "",
                gender: "",
                title: "",
                author: "",
                date: "",
                views: "",
                stuff: {}, //holds drugs, cats, nonsubs, contexts, intensities, and gender
            }

            //fix drug names that have commas in them, which had commas
            //replaced with semicolons
            reportArray[i][1] = reportArray[i][1].replace("1;4-Butanediol", "1,4-Butanediol");
            reportArray[i][1] = reportArray[i][1].replace("Products - Bath Salts; Plant Food; etc", "Products - Bath Salts, Plant Food, etc");
            reportArray[i][1] = reportArray[i][1].replace("3;4-Dichloromethylphenidate", "3,4-Dichloromethylphenidate");
            reportArray[i][1] = reportArray[i][1].replace("CP 47;497", "CP 47,497");
            reportArray[i][1] = reportArray[i][1].replace("CP 55;940", "CP 55,940");

            //insert drugs for this report
            var drugs = reportArray[i][1].split(";");
            for (var j = 0; j < drugs.length; j++) {
            	var drugName = "";

            	var drugEntry = {
            		method: "",
            		amount: "",
            		form: ""
            	}

                //get drug name
                if (drugs[j].indexOf("[") != -1) {
                	drugName = drugs[j].substring(0, drugs[j].indexOf("["));
                } else {
                	drugName = drugs[j].substring(0);
                }

                //get method of administration
                if (drugs[j].indexOf("[method]") != -1) {
                	var name = "";
                	var text = drugs[j].substring(drugs[j].indexOf("[method]") + 8);
                	if (text.indexOf("[") != -1) {
                		name = text.substring(0, text.indexOf("["));
                	} else {
                		name = text.substring(0);
                	}
                	drugEntry.method = name;
                }

                //get amount of drug
                if (drugs[j].indexOf("[amount]") != -1) {
                	var name = "";
                	var text = drugs[j].substring(drugs[j].indexOf("[amount]") + 8);
                	if (text.indexOf("[") != -1) {
                		name = text.substring(0, text.indexOf("["));
                	} else {
                		name = text.substring(0);
                	}
                	drugEntry.amount = name;
                }

                //get form of drug
                if (drugs[j].indexOf("[form]") != -1) {
                	var name = "";
                	var text = drugs[j].substring(drugs[j].indexOf("[form]") + 6);
                	if (text.indexOf("[") != -1) {
                		name = text.substring(0, text.indexOf("["));
                	} else {
                		name = text.substring(0);
                	}
                	drugEntry.form = name;
                }

                idEntry.drugs[drugName] = drugEntry;
                idEntry.drugsAlone[drugName] = true;
                idEntry.stuff[drugName] = 0;
            }

            //insert every other column for this report
            var arr = reportArray[i][2].split(";");
            for (var f = 0; f < arr.length; f++) {
                if(arr[f] != ""){
                	idEntry.categories[arr[f]] = 0;
                	idEntry.stuff[arr[f]] = 0;
                }
            }
            arr = reportArray[i][3].split(";");
            for (var f = 0; f < arr.length; f++) {
                //if there are none, don't enter anything
                if(arr[f] != ""){
                	idEntry.nonsubstances[arr[f]] = 0;
                	idEntry.stuff[arr[f]] = 0;
                }
            }

            //note: these will be empty strings if no entry
            idEntry.context = reportArray[i][4];
            if(reportArray[i][4] != "")
                idEntry.stuff[reportArray[i][4]] = 0;

            idEntry.intensity = reportArray[i][6];
            if(reportArray[i][6] != "")
                idEntry.stuff[reportArray[i][6]] = 0;

            idEntry.gender = reportArray[i][7];
            if(reportArray[i][7] != "")
                idEntry.stuff[reportArray[i][7]] = 0;

            idEntry.title = reportArray[i][8];
            idEntry.author = reportArray[i][9];
            idEntry.date = reportArray[i][10];
            idEntry.views = reportArray[i][11];

            //insert identry into complete data structure
            complete[id] = idEntry;
        }
        console.log(complete[48983]);
        console.log(complete[80334]);
    }




});
