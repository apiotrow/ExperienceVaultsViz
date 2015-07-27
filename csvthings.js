/*
This file holds a lot of CSV parsing stuff
*/
eevv.csvThings = function () {
    var complete = {}; //id: everything about the report with that id
    var profiles = {}; //drug: everything about that drug
    var drugList = []; //list of all drugs erowid has available
    var drugTotalsArray = []; //list of drugs and amounts in ascending order [[mushrooms, 1233],[cannabis,553]...]
    var drugTotalsHash = {}; //drug:total


    init();
    drugProfiles();


    function init() {
        //fill drugList
        eevv.readTextFile("txts/druglist.txt", function (result) {
            drugList = result.split(/\n/);

            //remove escape characters from each drug name
            for (var i = 0; i < drugList.length; i++) {
                drugList[i] = drugList[i].replace(/(\r\n|\n|\r)/gm, "");
            }
        });

        //fill drugTotalsArray and drugTotalsHash
        eevv.readTextFile("txts/drugtotals.txt", function (result) {
            drugTotalsArray = result.split(/\n/);

            //remove escape characters from each drug name
            for (var i = 0; i < drugTotalsArray.length; i++) {
                drugTotalsArray[i] = drugTotalsArray[i].replace(/(\r\n|\n|\r)/gm, "");
                drugTotalsArray[i] = drugTotalsArray[i].split(/\t/);
                drugTotalsHash[drugTotalsArray[i][0]] = drugTotalsArray[i][1];
            }
        });

        eevv.readTextFile("csvs/data-3-brackets.csv", function (result) {
            fillInDataStructure(result);
        });

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
        }
    }


    //fills in profiles variable, which has key: drug, and value: all the stats about the drug
    function drugProfiles() {
        for (var id in complete) {

            function addGroupToProfiles(group) {
                //get category totals
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

            //get grand totals
            for (var key in complete[id].drugs) {
                if (key in profiles) {
                    if (profiles[key].hasOwnProperty("total"))
                        profiles[key].total++;
                    else
                        profiles[key].total = 1;
                }
            }
        }

        console.log(profiles);

        //        oneGroup(eevv.context.largeGroup);

        
        eevv.vizzer(profiles, drugTotalsArray, 100);


    }

    function groupProportions(group) {
        //store what we want to output in 2D array
        var bt = [[]];
        var iter = 0;
        for (var drug in profiles) {
            var percent = Math.round((profiles[drug][group] / drugTotalsHash[drug]) * 1000) / 10;
            if (drugTotalsHash[drug] > 100 && percent > 0) {
                var arr = [[drug], percent];
                bt.push(arr);
            }
        }
        bt.sort(function (a, b) {
            return b[1] - a[1];
        });
        bt = bt.slice(1, bt.length); //first array entry is empty. don't know why. slice it off here
        console.log(bt);

        for (var i = 0; i < bt.length; i++) {
            $(document).ready(function () {
                var categAmount = profiles[bt[i][0]][group];
                var drugTotal = drugTotalsHash[bt[i][0]];
                var drugName = bt[i][0];
                var percent = bt[i][1];
                var outputString = drugName + ": (" + categAmount + " of " + drugTotal + ") " + percent + "% under " + group;
                $("#out").append("<br>" + outputString);
            });
        }
    }


    function oneGroup(group) {
        //store what we want to output in 2D array
        var bt = [[]];
        var iter = 0;
        for (var drug in profiles) {
            var percent = Math.round((profiles[drug][group] / drugTotalsHash[drug]) * 1000) / 10;
            if (drugTotalsHash[drug] > 100 && percent > 0) {
                var arr = [[drug], percent];
                bt.push(arr);
            }
        }
        bt.sort(function (a, b) {
            return b[1] - a[1];
        });
        bt = bt.slice(1, bt.length); //first array entry is empty. don't know why. slice it off here
        console.log(bt);

        for (var i = 0; i < bt.length; i++) {
            $(document).ready(function () {
                var categAmount = profiles[bt[i][0]][group];
                var drugTotal = drugTotalsHash[bt[i][0]];
                var drugName = bt[i][0];
                var percent = bt[i][1];
                var outputString = drugName + ": (" + categAmount + " of " + drugTotal + ") " + percent + "% under " + group;
                $("#out").append("<br>" + outputString);
            });
        }
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
                return key;

            }
        }
    }
}