
/*
Main viz file
*/
define(['ErowidCategories','jquery', 'd3.min', 'lodash'], function(ErowidCategories, $, d3, _) {
	

	var eevv = new ErowidCategories(); //some utilities and globals
	var complete = {}; //id: everything about the report with that id. for nitty gritty
    var counter = 0;

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

                            

                            //if complete has group
                            if(complete[id].hasOwnProperty(group[i])){
                                //if group is cat/nonsub/gender/intensity/context
                                if(_.isNumber(complete[id][group[i]])){

                                    //set name for object
                                    var path = group[i];
                                    
                                    //make object
                                    if(!_.has(digResults, path)){
                                        _.set(digResults, path, {});
                                    }
                                //if group is a drug
                                }else if(_.isObject(complete[id][group[i]]) && !$.isEmptyObject(complete[id][group[i]])){
                                    //TODO: should be asking if group is empty above^?
                                    for(key in complete[id][group[i]]){

                                        if(!_.has(digResults, key)){
                                            _.set(digResults, key, {});
                                        }
                                    }
                                }else if(_.isString(complete[id][group[i]])){
                                    //TODO: this
                                }
                            }
                        }
                        //if not, dig only had length 1, so increment
                        else{

                            
                            for(var b in group[i]){
                                if(counter < 50){
                                counter++;
                                console.log(b);
                            }
                                //if complete has group
                                if(complete[id].hasOwnProperty(b)){

                                    //if group is cat/nonsub/gender/intensity/context
                                    if(_.isNumber(complete[id][b])){

                                        //set name for object
                                        var path = b;
                                        
                                        //make object
                                        if(!_.has(digResults, path)){
                                            _.set(digResults, path, 1);
                                        }
                                    //if group is a drug
                                    }else if(_.isObject(complete[id][b]) && !$.isEmptyObject(complete[id][b])){
                                        //TODO: should be asking if group is empty above^?
                                        for(key in complete[id][b]){

                                            if(!_.has(digResults, key)){
                                                _.set(digResults, key, {});
                                            }
                                        }
                                    }else if(_.isString(complete[id][b])){
                                        //TODO: this
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

                                    for(var k = 0; k < iter; k++){
                                        path.push(complete[id][group[k]]);
                                    }

                                    path.push(key);
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

                                if(_.isObject(_.get(digResults, path))){
                                    for(var key in _.get(complete[id], path)){
                                        path.push(key);
                                        console.log(path);
                                        if(!_.has(digResults, path)){
                                            _.set(digResults, path, 1);
                                        }else{
                                            var val = _.get(digResults, path);
                                            val++;
                                            _.set(digResults, path, val);
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

                                    for(var k = 0; k < group.length - 1; k++){
                                        path.push(complete[id][group[k]]);
                                    }

                                    path.push(key);
                                    if(!_.has(digResults, path)){
                                        _.set(digResults, path, 0);
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



        // // var dig = [eevv.groups.context, eevv.groups.intensity, eevv.groups.gender, eevv.groups.author];
        // // var dig = [eevv.groups.context, eevv.groups.intensity, eevv.groups.gender];
        // var dig = [eevv.groups.context];
        
        // // var dig = [eevv.groups.intensity];
        // // var dig = [eevv.groups.context, eevv.groups.intensity];
        // var digResults = {};

        // for(id in complete){
        //     grabData(dig, 0);
        // }
        // console.log(digResults);


        // var dig = [eevv.groups.context, eevv.groups.categories, eevv.groups.intensity];
        // digResults = {};
        // for(id in complete){
        //     grabData(dig, 0);
        // }
        // console.log(digResults);



        
        // var dig = [eevv.groups.context];
        // var dig = [eevv.groups.context, eevv.groups.intensity];
        // var dig = [eevv.groups.context, eevv.groups.intensity, eevv.groups.gender];
        var dig = [eevv.groups.context, eevv.groups.intensity, eevv.groups.gender, eevv.groups.categories];

        //creates 2d array of this format:
        // var digPathItems = [
        //     ["First Times", "Mystical Experience",...],
        //     ["Male","Female","Not-Specified"],
        //     ["Alone", "Club / Bar", "Large Party", "Military"]
        // ]
        var digPathItems = [];
        for(var i = 0; i < dig.length; i++){
            var arr = [];
            for(groupItem in eevv[dig[i]]){
                arr.push(eevv[dig[i]][groupItem]);
            }
            digPathItems.push(arr);
        }
        console.log(digPathItems);

        var diggyResults = {};
        digGroups(digPathItems, diggyResults)

        console.log(diggyResults);





        // var digPath = [];
        // for(id in complete){
        //     digGroups(dig, 0);
        // }

    });

    //set up JSON for holding statistic for a particular search
    function digGroups(digPathItems, diggyResults){
        if(digPathItems.length == 4){
            for(var i = 0; i < digPathItems[0].length; i++){
                for(var j = 0; j < digPathItems[1].length; j++){
                    for(var k = 0; k < digPathItems[2].length; k++){
                        for(var h = 0; h < digPathItems[3].length; h++){
                            var path = [];
                            path.push(digPathItems[0][i], digPathItems[1][j], digPathItems[2][k], digPathItems[3][h])
                            _.set(diggyResults, path, 0);
                        }
                    }
                }
            }
        }else if(digPathItems.length == 3){
            for(var i = 0; i < digPathItems[0].length; i++){
                for(var j = 0; j < digPathItems[1].length; j++){
                    for(var k = 0; k < digPathItems[2].length; k++){
                        var path = [];
                        path.push(digPathItems[0][i], digPathItems[1][j], digPathItems[2][k])
                        _.set(diggyResults, path, 0);
                    }
                }
            }
        }else if(digPathItems.length == 2){
            for(var i = 0; i < digPathItems[0].length; i++){
                for(var j = 0; j < digPathItems[1].length; j++){
                    var path = [];
                    path.push(digPathItems[0][i], digPathItems[1][j])
                    _.set(diggyResults, path, 0);
                }
            }
        }else if(digPathItems.length == 1){
            for(var i = 0; i < digPathItems[0].length; i++){
                var path = [];
                path.push(digPathItems[0][i])
                _.set(diggyResults, path, 0);
            }
        }
    }



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
            idEntry["drugDetails"] = {};
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


                idEntry["drugDetails"][drugName] = drugEntry;
                idEntry[drugName] = 0;
            }

            //insert every other column for this report

            //categories
            var arr = reportArray[i][2].split(";");
            for (var f = 0; f < arr.length; f++) {
                if(arr[f] != "")
                	idEntry[arr[f]] = 0;
            }

            //nonsubstances
            arr = reportArray[i][3].split(";");
            for (var f = 0; f < arr.length; f++) {
                if(arr[f] != "")
                	idEntry[arr[f]] = 0;
            }

            //note: checking for empty strings because these will be empty strings if no entry
            // idEntry.context = reportArray[i][4];
            if(reportArray[i][4] != "")
                idEntry[reportArray[i][4]] = 0;

            // idEntry.intensity = reportArray[i][6];
            if(reportArray[i][6] != "")
                idEntry[reportArray[i][6]] = 0;

            // idEntry.gender = reportArray[i][7];
            if(reportArray[i][7] != "")
                idEntry[reportArray[i][7]] = 0;

            idEntry.title = reportArray[i][8];
            // idEntry.author = reportArray[i][9];
            idEntry.date = reportArray[i][10];
            idEntry.views = reportArray[i][11];

            //insert identry into complete data structure
            complete[id] = idEntry;
        }
        console.log(complete[48983]);
        console.log(complete[80334]);
        console.log(complete[86136]);
    }




});
