/*
This file holds a lot of CSV parsing stuff
*/
eevv.csvThings = function () {
    var complete = {};
    var ids = [];
    var drugList = [];
    var drugTotalsArray = []; //list of drugs and amounts in ascending order
    var drugTotalsHash = {}; //drug:total
    var dataxy = {};
    var iditer = 0;

    optionValueToDataStructure("csvs/data-3-brackets.csv");
    csvToDatastructure("csvs/data-3-brackets.csv");
//    findBadTrips();
    drugProfiles();

    //outputs the list of how frequent a drug shows up in the vault
    function csvToDatastructure(file) {
        readTextFile(file, function (result) {
            fillInDataStructure(result);
        });
    }

    //outputs the list of how frequent a drug shows up in the vault
    function optionValueToDataStructure(file, callback) {
        readTextFile(file, function (result) {
            fillInDrugList(result);
        });

        file = "txts/drugtotals.txt"
        readTextFile(file, function (result) {
            fillInDrugTotals(result);
        });

    }

    function fillInDrugTotals(result) {
        drugTotalsArray = result.split(/\n/);
        //remove escape characters from each drug name
        for (var i = 0; i < drugTotalsArray.length; i++) {
            drugTotalsArray[i] = drugTotalsArray[i].replace(/(\r\n|\n|\r)/gm, "");
            drugTotalsArray[i] = drugTotalsArray[i].split(/\t/);
            drugTotalsHash[drugTotalsArray[i][0]] = drugTotalsArray[i][1];
        }
    }

    function fillInDrugList(result) {
        drugList = result.split(/\n/);
        //        $(document).ready(function () {
        //            $("#cdl").append("<br>Drug list created");
        //        });

        //remove escape characters from each drug name
        for (var i = 0; i < drugList.length; i++) {
            drugList[i] = drugList[i].replace(/(\r\n|\n|\r)/gm, "");
        }
    }

    //reads a file and returns the text inside
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    callback(rawFile.responseText);
                }
            }
        }
        rawFile.send(null);
    }

    //the printing portion of outputting drug frequency
    function fillInDataStructure(result) {
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
            }

            //insert identry into complete data structure
            complete[id] = idEntry;

            //fix drug names that have commas in them, and so
            //had them replaced with semicolons
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
                
                complete[id].drugs[drugName] = drugEntry;
            }

            //insert every other column for this report
            for(var p in reportArray[i][2].split(";")){
                complete[id].categories[p] = 0;
            }
            for(var p in reportArray[i][3].split(";")){
                complete[id].nonsubstances[p] = 0;
            }
            complete[id].context = reportArray[i][4];
            complete[id].intensity = reportArray[i][6];
            complete[id].gender = reportArray[i][7];
            complete[id].title = reportArray[i][8];
            complete[id].author = reportArray[i][9];
            complete[id].date = reportArray[i][10];
            complete[id].views = reportArray[i][11];
        }

//        ids = [];
//        var keyCount = 0;
//        for (var key in complete) {
//            if (complete.hasOwnProperty(key)) {
//                keyCount++;
//                ids.push(key);
//            }
//        }

//        $(document).ready(function () {
//            $("#cds").append("<br>Data structure filled. " + keyCount + " entries.");
//        });
    }

    function drugProfiles() {
        var profiles = {
            
        }
        
        var g = 0;
        for (var id in complete){
            console.log(complete[id].drugs);
            g++;
            if(g > 100) break;
        }
        
//        for (var i = 0; i < ids.length; i++) {
//            if ($.inArray(drug, complete[ids[i]].drugArray) != -1) {
//                
//            }
//        }
    }


    function findBadTrips() {
        var tuples = [];
        var categ = eevv.categories.addiction;
        var drugAndMethod = {};
        var drugAndContext = {};

        for (var i = 0; i < drugTotalsArray.length; i++) {
            var drugName = drugTotalsArray[i][0];
            var drugTotal = drugTotalsArray[i][1];
            if (drugTotal > 100) {
                dataxy[drugName]
                //                dataxy[drugName] = drugCategPercent(drugName, categ);
                var returnData = drugCategPercent(drugName, categ);
                dataxy[drugName] = returnData.percent;
                drugAndMethod[drugName] = returnData.method;
                drugAndContext[drugName] = returnData.context;
            }
        }

        for (var key in dataxy) tuples.push([key, dataxy[key]]);

        tuples.sort(function (a, b) {
            a = a[1];
            b = b[1];

            return a > b ? -1 : (a < b ? 1 : 0);
        });

        for (var i = 0; i < tuples.length; i++) {
            var key = tuples[i][0];
            var value = tuples[i][1];

            $(document).ready(function () {
                $("#cdl").append("<br>" + value + "% of the " + drugTotalsHash[key] + " " + key + " reports are categorized under " + categ + ". Most common method was: " + drugAndMethod[key] + ", common context was " + drugAndContext[key]);
            });
        }
    }

    function appendToHTML() {

    }

    function drugCategPercent(drug, categ) {
        var drugCount = 0;
        var bothCount = 0;
        var methodHash = {};
        var contextHash = {};
        var method = "";
        var context = "";
        var index = 0;

        for (var i = 0; i < ids.length; i++) {
            if ($.inArray(drug, complete[ids[i]].drugArray) != -1) {
                drugCount++;
                index = $.inArray(drug, complete[ids[i]].drugArray);

                if ($.inArray(categ, complete[ids[i]].categ) != -1) {
                    bothCount++;

                    //finding most common method
                    if (complete[ids[i]].methodArray[index] != "") {
                        if (complete[ids[i]].methodArray[index] in methodHash)
                            methodHash[complete[ids[i]].methodArray[index]]++;
                        else
                            methodHash[complete[ids[i]].methodArray[index]] = 1;
                    }

                    //finding most common context
                    if (complete[ids[i]].context != "" && complete[ids[i]].context != "Various" && complete[ids[i]].context != "Not Applicable") {
                        if (complete[ids[i]].context in contextHash)
                            contextHash[complete[ids[i]].context]++;
                        else
                            contextHash[complete[ids[i]].context] = 1;
                    }
                }
            }
        }

        method = maxKey(methodHash);
        context = maxKey(contextHash);


        returnData = {
            percent: (Math.round((bothCount / drugCount) * 1000) / 10),
            method: method,
            context: context,
        }
        return returnData;
    }

    //find key with max value in an associative array
    function maxKey(hashTable) {
        var max = 0;
        for (var key in hashTable) {
            if (hashTable[key] > max)
                max = hashTable[key];
        }
        for (var key in hashTable) {
            if (hashTable[key] == max) {
//                console.log(key + " had " + hashTable[key]);
                return key;

            }
        }
    }
}