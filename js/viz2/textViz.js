
/*
Main viz file
*/
define(['ErowidCategories','jquery', 'd3.min'], function(ErowidCategories, $, d3) {
	

	var eevv = new ErowidCategories(); //some utilities and globals
	var complete = {}; //id: everything about the report with that id. for nitty gritty
	var profiles = {}; //drug: everything about that drug. for top-level info
	var totalReports = 0;
    var underscoreWhitespace = {};
    var whitespaceUnderscore = {};
    var go = {};


	eevv.readTextFile("csvs/data-3-brackets.csv", function (result) {
		
        //fill in complete from a json file
        // $.getJSON("csvs/complete.json", function(json) {
        //         complete = json; // this will show the info it in firebug console
        //         fillInProfiles();
        //         renderTotalsList();
        // });

        fillInComplete(result);
		fillInProfiles();
        renderTotalsList();
        // console.log(JSON.stringify(complete));


        //store profile for use in other pages
		localStorage.setItem('profiles', JSON.stringify(profiles));

        //store complete for use in other pages
        // localStorage.setItem('complete', JSON.stringify(complete));
   	});

    //render totals descending
	function renderTotalsList(){
		var drugBadTrips = {};
		var drugContext = {};

		
		/*
		//cat -> drug amounts
		for(var id in complete){
			if(complete[id]['categories'].hasOwnProperty('Bad Trips')){

				//filter by only having 1 drug (no combinations of drugs)
				if(Object.keys(complete[id]['drugs']).length >= 1){

					//get the drug in the report
					for(var drug in complete[id]['drugs']){

						//add it
						if(drug in drugBadTrips){
							drugBadTrips[drug]++;
						}else{
							drugBadTrips[drug] = 1;
						}
					}

					//get the contexts
					//check if any contexts exist
					if(complete[id]['context'].length > 0){

						//add drug in drugContext if not in
						if(!(drug in drugContext)){
							drugContext[drug] = {};
						}

						//put context in
						if(complete[id]['context'] in drugContext[drug]){
							drugContext[drug][complete[id]['context']]++;
						}else{
							drugContext[drug][complete[id]['context']] = 1;
						}
					}
				}
			}
		}
		*/

        //drugs sorted by amount
		var sortedProfiles = eevv.sortObjByProperty(profiles, 'total');

        //"# total reports" title
		$("#textViz").append(
			"<center><tr><td>" + 
			totalReports + 
			" total reports" + 
			"</td></tr></center>");

        $("#textViz").append("<tbody>");

        //period bar for amounts of drugs
		for(var i = 0; i < sortedProfiles.length; i++){
			var percent = (Math.round((sortedProfiles[i][1] / totalReports) * 1000) / 10);
			var periodBar = "";

			for(var j = 0; j < percent * 10; j++){
				periodBar += ".";
			}

            var underscored = sortedProfiles[i][0].replace(/ /g,'_');
            whitespaceUnderscore[sortedProfiles[i][0]] = underscored;
            underscoreWhitespace[underscored] = sortedProfiles[i][0];

            var row = $("<tr></tr>");
            var buttonTd = $("<td></td>");
            var button = $("<button>", {"data-drug": sortedProfiles[i][0]}).text(sortedProfiles[i][0]).click(
                function(){
                    catsForThisDrug($(this).attr('data-drug')); 
                    return false; 
            });
            var numberTd = $("<td></td>").text(sortedProfiles[i][1] + ", " + percent + "%" + ", " + periodBar);

            $("#textViz").append(row);
            row.append(buttonTd);
            buttonTd.append(button);
            row.append(numberTd);
		}
	}

    function catsForThisDrug(s){
        $("#textViz").empty();

        var drugSel = s;
        var catNums = {};

        //loop over categories
        for(var cat in eevv.categoriesTrimmed){
            var catName = eevv.categoriesTrimmed[cat]; //e.g. "First Times"

            //if category is in profiles
            if(profiles[drugSel].hasOwnProperty(catName)){

                //add the number to caNums
                catNums[catName] = profiles[drugSel][catName];
            }
        }

        var sorted = eevv.sortObj(catNums, 'total');

        //title
        $("#textViz").append(
            "<center><tr><td>" + 
            drugSel + 
            "</td></tr></center>");

        for(var i = 0; i < sorted.length; i++){
            var row = $("<tr></tr>");
            var buttonTd = $("<td></td>");
            var button = $("<button>", {
                "data-drug": s, 
                "data-cat": sorted[i][0]})
            .text(sorted[i][0])
            .click(
                function(){
                    contexts($(this).attr('data-drug'), $(this).attr('data-cat')); 
                    return false; 
            });
            var numberTd = $("<td></td>").text(sorted[i][1]);

            $("#textViz").append(row);
            row.append(buttonTd);
            buttonTd.append(button);
            row.append(numberTd);
        }
    }

    function contexts(drug, cat){
        $("#textViz").empty();

        contextAmts = {};
        // contextAmts["contet1"] = 43;

        for (var id in complete) {
            if(drug in complete[id]["drugs"] && cat in complete[id]["categories"]){
                if(complete[id]["context"] in contextAmts){
                    contextAmts[complete[id]["context"]]++;
                    // console.log("ssdf");
                }
                else{
                    contextAmts[complete[id]["context"]] = 0;
                    // console.log("ss");
                }
            }
        }

        var sorted = Object.keys(contextAmts).sort(function(a,b){return contextAmts[b]-contextAmts[a]});

        console.log(contextAmts);

        //title
        $("#textViz").append(
            "<center><tr><td>" + 
            drug + " - " + cat +
            "</td></tr></center>");

        for(var i = 0; i < sorted.length; i++){
            var row = $("<tr></tr>");
            var buttonTd = $("<td></td>");
            var button = $("<button>", {
                "data-drug": drug, 
                "data-cat": cat,
                "data-context": sorted[i]})
            .text(sorted[i])
            .click(
                function(){
                    contexts($(this).attr('data-drug'), $(this).attr('data-cat')); 
                    return false; 
            });
            var numberTd = $("<td></td>").text(contextAmts[sorted[i]]);

            $("#textViz").append(row);
            row.append(buttonTd);
            buttonTd.append(button);
            row.append(numberTd);
        }
    }



    //
    //
    //filler inners
    //
    //


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
                idEntry.stuff[drugName] = 0;
            }

            //insert every other column for this report
            var arr = reportArray[i][2].split(";");
            for (var f = 0; f < arr.length; f++) {
            	idEntry.categories[arr[f]] = 0;
            	idEntry.stuff[arr[f]] = 0;
            }
            arr = reportArray[i][3].split(";");
            for (var f = 0; f < arr.length; f++) {
            	idEntry.nonsubstances[arr[f]] = 0;
            	idEntry.stuff[arr[f]] = 0;
            }
            idEntry.context = reportArray[i][4];
            idEntry.stuff[reportArray[i][4]] = 0;

            idEntry.intensity = reportArray[i][6];
            idEntry.stuff[reportArray[i][6]] = 0;

            idEntry.gender = reportArray[i][7];
            idEntry.stuff[reportArray[i][7]] = 0;

            idEntry.title = reportArray[i][8];
            idEntry.author = reportArray[i][9];
            idEntry.date = reportArray[i][10];
            idEntry.views = reportArray[i][11];

            //insert identry into complete data structure
            complete[id] = idEntry;
        }
        console.log(complete[id]);
    }




    //fills in profiles from complete, which has key: [drug] and value: [all stats about the drug]
    function fillInProfiles() {
        for (var id in complete) {
            totalReports++;

            function addGroupToProfiles(group) {
                //get category totals
                //e.g. eevv[group] is like eevv['categories'] or eevv['nonsubstances']
                for (var s in eevv[group]) {
                    var groupItem = eevv[group][s];
                    if (groupItem in complete[id].stuff) {
                        for (var key in complete[id].drugs) {
                            //this check shouldn't be necessary, as all drugs
                            //should be in profiles, but at least 1 key is not in profiles
                            if (key in profiles) {
                                if (groupItem in profiles[key]) {
                                    profiles[key][groupItem]++;
                                } else {
                                    profiles[key][groupItem] = 1;
                                    //                                    profiles[key] = {};
                                    //                                    profiles[key].
                                }
                            } else {
                                profiles[key] = {};
                                profiles[key][groupItem] = 1;
                            }
                        }
                    }
                }
            }
            addGroupToProfiles(eevv.groups.categories);
            addGroupToProfiles(eevv.groups.context);
            addGroupToProfiles(eevv.groups.gender);
            addGroupToProfiles(eevv.groups.intensity);
            addGroupToProfiles(eevv.groups.nonsubstances);

            //get grand totals and dosage info
            //
            //for this report...
            for (var drug in complete[id].drugs) {

                //there's a drug that's a blank string
                //don't know what it is
                //breaking for now
                if(drug == "") break;

                //if profiles has an entry for it (which it should)
                if (drug in profiles) {

                    //increment total
                    if (profiles[drug].hasOwnProperty("total")){
                        profiles[drug].total++;
                    }
                    else{
                        profiles[drug].total = 1;
                    }


                    //add admin property if it doesn't already have it
                    if(!profiles[drug].hasOwnProperty("dose")){
                        profiles[drug]['dose'] = {};
                    }


                    var doseItems = ['amount', 'form', 'method'];

                    //add the three admin properties to admin if it doesn't have them
                    for(var i = 0; i < doseItems.length; i++){
                        if(!profiles[drug]['dose'].hasOwnProperty(doseItems[i])){
                            profiles[drug]['dose'][doseItems[i]] = {};
                        }
                    }

                    //add the dose item to profiles
                    for(var i = 0; i < doseItems.length; i++){
                        var doseItem = complete[id].drugs[drug][doseItems[i]];

                        //make sure a drug amount is even specified
                        if(doseItem != ""){
                            if(profiles[drug]['dose'][doseItems[i]].hasOwnProperty(doseItem)){
                                profiles[drug]['dose'][doseItems[i]][doseItem]++;
                            }else{
                                profiles[drug]['dose'][doseItems[i]][doseItem] = 1;
                            }
                        }
                    }
                }
            }
        }
        console.log(profiles);
    }
});
