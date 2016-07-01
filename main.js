document.addEventListener('DOMContentLoaded', function () {
	var globs = require('./js/phaservis/eevvStuff.js');
	var _ = require('./js/phaservis/lodash.js');
    var webglvis = require('./js/phaservis/webglvis.js');

    var eevv = new globs.eevvStuff();

	var complete = {}; //id: everything about the report with that id. for nitty gritty.

    

    // var pixivis = new webglvis.pixivis();
    // var phaservis = new webglvis.phaservis();


    //initial function
    eevv.readTextFile("csvs/data-3-brackets.csv", 
    function (result) {
        fillInComplete(result); //turn CSV of report data into a JSON

        // var dig = [eevv.groups.intensity, eevv.groups.gender];
        // var dig = [eevv.groups.gender];
        var dig = [eevv.groups.context, eevv.groups.gender, eevv.groups.intensity];

        var digResults = performDig(dig);
        
        console.log("digResults:");
        console.log(digResults);
    });


    function performDig(dig){
        var digPathItems = [];
        for(var i = 0; i < dig.length; i++){
            var arr = [];
            for(groupItem in eevv[dig[i]]){
                arr.push(eevv[dig[i]][groupItem]);
            }
            digPathItems.push(arr);
        }

        //get base number for compare specific search to, for deviation
        var baseResults = {};
        var devDig = [];
        if(digPathItems.length > 1){
            devDig = digPathItems.slice(); //clone the array
            devDig.splice(0, 1);
            baseResults = fillInBase(devDig);
        }

        //get specific search
        var digResults = {};
        setupResultsJSON(digPathItems, digResults);
        fillInNumbers(digPathItems, digResults, baseResults);

        return digResults;
    }

    function fillInBase(group){
        var baseResults = {};

        setupResultsJSON(group, baseResults);
        fillInNumbers(group, baseResults);

        console.log("baseResults:");
        console.log(baseResults);

        return baseResults;
    }

    //search all reports in complete, and fill in JSON that was setup by setupDigResultsJSON
    function fillInNumbers(digPathItems, digResults, baseResults){
        if(digPathItems.length == 4){
            console.log("too big, fuck you");
            // for(id in complete){
            //     for(var one in digResults){
            //         for(var two in digResults[one]){
            //             for(var three in digResults[one][two]){
            //                 for(var four in digResults[one][two][three]){
            //                     if(complete[id].hasOwnProperty(one) && complete[id].hasOwnProperty(two) && complete[id].hasOwnProperty(three)
            //                          && complete[id].hasOwnProperty(four))
            //                         digResults[one][two][three][four]["raw"]++;
            //                 }
            //             }
            //         }
            //     }
            // }
            // //get total for this category and insert it in data structure
            // for(var one in digResults){
            //     for(var two in digResults[one]){
            //         for(var three in digResults[one][two]){
            //             var total = 0;
            //             for(var i = 0; i < digPathItems[digPathItems.length - 1].length; i++){
            //                 total += digResults[one][two][three][digPathItems[digPathItems.length - 1][i]]["raw"];
            //                 digResults[one][two][three]["total"] = total;
            //             }
            //         }
            //     }
            // }
        }else if(digPathItems.length == 3){
            for(id in complete){
                for(var one in digResults){
                    for(var two in digResults[one]){
                        for(var three in digResults[one][two]){
                            if(complete[id].hasOwnProperty(one) && complete[id].hasOwnProperty(two) && complete[id].hasOwnProperty(three)){
                                digResults[one][two][three]["raw"]++;

                                if(baseResults !== undefined){
                                    // we must be on digResults. calculate deviation too.
                                    // console.log("ssg");
                                    // var dev = digResults[one][two][three]["raw"] / baseResults[two][three]["raw"]; 
                                    // digResults[one][two][three]["dev"] = dev;
                                }
                            }
                        }
                    }
                }
            }
            //get total for this category and insert it in data structure
            for(var one in digResults){
                for(var two in digResults[one]){
                    var total = 0;
                    for(var i = 0; i < digPathItems[digPathItems.length - 1].length; i++){
                        total += digResults[one][two][digPathItems[digPathItems.length - 1][i]]["raw"];
                        digResults[one][two]["total"] = total;
                    }
                }
            }
        }else if(digPathItems.length == 2){
            for(id in complete){
                for(var one in digResults){
                    for(var two in digResults[one]){
                        if(complete[id].hasOwnProperty(one) && complete[id].hasOwnProperty(two))
                            digResults[one][two]["raw"]++;
                    }
                }
            }
            //get total for this category and insert it in data structure
            for(var one in digResults){
                var total = 0;
                for(var i = 0; i < digPathItems[digPathItems.length - 1].length; i++){
                    total += digResults[one][digPathItems[digPathItems.length - 1][i]]["raw"];
                    digResults[one]["total"] = total;
                }
            }
        }else if(digPathItems.length == 1){
            for(id in complete){
                for(var one in digResults){
                    if(complete[id].hasOwnProperty(one))
                        digResults[one]["raw"]++;
                }
            }
            //get total for this category and insert it in data structure
            for(var one in digResults){
                var total = 0;
                for(var i = 0; i < digPathItems[digPathItems.length - 1].length; i++){
                    total += digResults[digPathItems[digPathItems.length - 1][i]]["raw"];
                    digResults["total"] = total;
                }
            }
        }
    }

    //set up JSON for holding statistic for a particular search.
    //hard-coded because making a general function for this proved to be
    //too fucking complicated
    function setupResultsJSON(digPathItems, digResults){
        if(digPathItems.length == 4){
            console.log("too big, fuck you");
            // for(var i = 0; i < digPathItems[0].length; i++){
            //     for(var j = 0; j < digPathItems[1].length; j++){
            //         for(var k = 0; k < digPathItems[2].length; k++){
            //             for(var h = 0; h < digPathItems[3].length; h++){
            //                 var path = [];
            //                 path.push(digPathItems[0][i], digPathItems[1][j], digPathItems[2][k], digPathItems[3][h]);
            //                 path.push("raw");
            //                 _.set(digResults, path, 0);
            //             }
            //         }
            //     }
            // }
        }else if(digPathItems.length == 3){
            for(var i = 0; i < digPathItems[0].length; i++){
                for(var j = 0; j < digPathItems[1].length; j++){
                    for(var k = 0; k < digPathItems[2].length; k++){
                        var path = [];
                        path.push(digPathItems[0][i], digPathItems[1][j], digPathItems[2][k]);
                        path.push("raw");
                        _.set(digResults, path, 0);
                    }
                }
            }
        }else if(digPathItems.length == 2){
            for(var i = 0; i < digPathItems[0].length; i++){
                for(var j = 0; j < digPathItems[1].length; j++){
                    var path = [];
                    path.push(digPathItems[0][i], digPathItems[1][j]);
                    path.push("raw");
                    _.set(digResults, path, 0);
                }
            }
        }else if(digPathItems.length == 1){
            for(var i = 0; i < digPathItems[0].length; i++){
                var path = [];
                path.push(digPathItems[0][i]);
                path.push("raw");
                _.set(digResults, path, 0);
            }
        }
    }

    //fills in a JSON, from our CSV of report data
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

            //drugs
            //inserts the drug by itself, and also an entry in
            //"drugDetails", with dosage/method/form info
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

            //note: checking for empty strings because these will 
            //be empty strings if no entry for them

            //context
            if(reportArray[i][4] != "")
                idEntry[reportArray[i][4]] = 0;

            //intensity
            if(reportArray[i][6] != "")
                idEntry[reportArray[i][6]] = 0;

            //gender
            if(reportArray[i][7] != "")
                idEntry[reportArray[i][7]] = 0;

            //title
            idEntry.title = reportArray[i][8];

            //author
            // idEntry.author = reportArray[i][9];

            //date
            idEntry.date = reportArray[i][10];

            //views
            idEntry.views = reportArray[i][11];

            //insert identry into complete data structure
            complete[id] = idEntry;
        }
        console.log(complete[48983]);
        console.log(complete[80334]);
        console.log(complete[86136]);
    }
});