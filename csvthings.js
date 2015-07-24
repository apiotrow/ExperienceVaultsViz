/*
This file holds a lot of CSV parsing stuff
*/

complete = {};
ids = [];
drugList = [];
dataxy = {};
iditer = 0;

//outputs the list of how frequent a drug shows up in the vault
function csvToDatastructure(file) {
    readTextFile(file, function (result) {
        fillInDataStructure(result);
    });
}

//outputs the list of how frequent a drug shows up in the vault
function optionValueToDataStructure(file) {
    readTextFile(file, function (result) {
        fillInDrugList(result);
    });
}

function fillInDrugList(result) {
    drugList = result.split(/\s+/);
    $(document).ready(function () {
        $("#cdl").append("<br>Drug list created");
    });
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
        //entry for one report
        var idEntry = {
            drugArray: [], //these 4 arrays line up by their indexes
            methodArray: [], //e.g. drugArray[1] used methodArray[1] method
            amountArray: [],
            formArray: [],
            drugs: [], //holds all the above info, but in an object
            categ: [],
            nonsub: [],
            context: [],
            intensity: "",
            gender: "",
            title: "",
            author: "",
            date: "",
            views: ""
        }


        //insert identry into complete data structure
        complete[reportArray[i][0]] = idEntry;

        //fix drug names that have commas in them, and so
        //had them replaced with semicolons
        reportArray[i][1] = reportArray[i][1].replace("1;4-Butanediol", "1,4-Butanediol");
        reportArray[i][1] = reportArray[i][1].replace("Products - Bath Salts; Plant Food; etc", "Products - Bath Salts, Plant Food, etc");
        reportArray[i][1] = reportArray[i][1].replace("3;4-Dichloromethylphenidate", "3,4-Dichloromethylphenidate");
        reportArray[i][1] = reportArray[i][1].replace("CP 47;497", "CP 47,497");
        reportArray[i][1] = reportArray[i][1].replace("CP 55;940", "CP 55,940");

        //insert drugs for this report
        var drugs = reportArray[i][1].split(";");
//        if(reportArray[i][1].indexOf("Pharms") != -1)
//        if($.inArray("Pharms", drugs) != -1)
            console.log(drugs);
        for (var j = 0; j < drugs.length; j++) {

            //entry for the drug array in the completeEntry object ^
            var drugEntry = {
                drug: "",
                method: "",
                amount: "",
                form: ""
            }

            //get drug name
            if (drugs[j].indexOf("[") != -1) {
                var drugName = drugs[j].substring(0, drugs[j].indexOf("["));
                drugEntry.drug = drugName;
            } else {
                var drugName = drugs[j].substring(0);
                drugEntry.drug = drugName;
            }
            complete[reportArray[i][0]].drugArray.push(drugName);

            //get method of administration
            if (drugs[j].indexOf("[method]") != -1) {
                var name = "";
                var text = drugs[j].substring(drugs[j].indexOf("[method]") + 8);
                if (text.indexOf("[") != -1) {
                    name = text.substring(0, text.indexOf("["));
                    drugEntry.method = name;
                } else {
                    name = text.substring(0);
                    drugEntry.method = name;
                }
                complete[reportArray[i][0]].methodArray.push(name);
            } else {
                //push a blank if no method exists
                complete[reportArray[i][0]].methodArray.push("");
            }

            //get amount of drug
            if (drugs[j].indexOf("[amount]") != -1) {
                var name = "";
                var text = drugs[j].substring(drugs[j].indexOf("[amount]") + 8);
                if (text.indexOf("[") != -1) {
                    name = text.substring(0, text.indexOf("["));
                    drugEntry.amount = name;
                } else {
                    name = text.substring(0);
                    drugEntry.amount = name;
                }
                complete[reportArray[i][0]].amountArray.push(name);
            } else {
                //push a blank if no method exists
                complete[reportArray[i][0]].amountArray.push("");
            }

            //get form of drug
            if (drugs[j].indexOf("[form]") != -1) {
                var name = "";
                var text = drugs[j].substring(drugs[j].indexOf("[form]") + 6);
                if (text.indexOf("[") != -1) {
                    name = text.substring(0, text.indexOf("["));
                    drugEntry.form = name;
                } else {
                    name = text.substring(0);
                    drugEntry.form = name;
                }
                complete[reportArray[i][0]].formArray.push(name);
            } else {
                //push a blank if no method exists
                complete[reportArray[i][0]].formArray.push("");
            }

            //push the drug entry object
            complete[reportArray[i][0]].drugs.push(drugEntry);
        }

        //insert every other column for this report
        complete[reportArray[i][0]].categ = reportArray[i][2].split(";");
        complete[reportArray[i][0]].nonsub.push = reportArray[i][3].split(";");
        complete[reportArray[i][0]].context.push = reportArray[i][4].split(";");
        complete[reportArray[i][0]].intensity = reportArray[i][6];
        complete[reportArray[i][0]].gender = reportArray[i][7];
        complete[reportArray[i][0]].title = reportArray[i][8];
        complete[reportArray[i][0]].author = reportArray[i][9];
        complete[reportArray[i][0]].date = reportArray[i][10];
        complete[reportArray[i][0]].views = reportArray[i][11];
    }

    ids = [];
    var keyCount = 0;
    for (var key in complete) {
        if (complete.hasOwnProperty(key)) {
            keyCount++;
            ids.push(key);
        }
    }

    $(document).ready(function () {
        $("#cds").append("<br>Data structure filled. " + keyCount + " entries.");
    });
}

function findBadTrips() {
    for (var i = 0; i < drugList.length; i++) {
        drugCategPercent(drugList[i], "Bad Trips");
    }

    var tuples = [];
    for (var key in dataxy) tuples.push([key, dataxy[key]]);

    tuples.sort(function (a, b) {
        a = a[1];
        b = b[1];

        return a > b ? -1 : (a < b ? 1 : 0);
    });

    for (var i = 0; i < tuples.length; i++) {
        var key = tuples[i][0];
        var value = tuples[i][1];

//        console.log(key + ": " + value);
//        $(document).ready(function () {
//            $("#output").append("<br>" + key + " has a " + value + "% chance of bad trip");
//        });

    }
}

function drugCategPercent(drug, categ) {
    var drugCount = 0;
    var bothCount = 0;

    for (var i = 0; i < ids.length / 4; i++) {
        if ($.inArray(drug, complete[ids[i]].drugArray) != -1) {
            drugCount++;

            if ($.inArray(categ, complete[ids[i]].categ) != -1) {
                bothCount++;
            }
        }
    }
    if (drugCount > 50)
        dataxy[drug] = (Math.round((bothCount / drugCount) * 1000) / 10);

}