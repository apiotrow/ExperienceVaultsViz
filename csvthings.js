/*
This file holds a lot of CSV parsing stuff
*/

complete = {};

//outputs the list of how frequent a drug shows up in the vault
function csvToDatastructure(file) {
    var csvText = "";
    readTextFile(file, function (result) {
        fillInDataStructure(result);
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
    var drugList = []; //list of drug names

    //    getSourceCode("https://www.erowid.org/experiences/exp_search.cgi", function () {
    //        scrapeAllOptionValues();
    //        for (var i = 0; i < optionValueArrays[0].theArray.length; i++) {
    //            druglist.push(optionValueArrays[0].theArray[i].item);
    //        }
    //    });

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
            drugs: [],
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

        //insert drugs for this report
        var drugs = reportArray[i][1].split(";");
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
                drugEntry.drug = drugs[j].substring(0, drugs[j].indexOf("["));
            } else {
                drugEntry.drug = drugs[j].substring(0);
            }

            //get method of administration
            if (drugs[j].indexOf("[method]") != -1) {
                var text = drugs[j].substring(drugs[j].indexOf("[method]") + 8);
                if (text.indexOf("[") != -1) {
                    drugEntry.method = text.substring(0, text.indexOf("["));
                } else {
                    drugEntry.method = text.substring(0);
                }
            }

            //get amount of drug
            if (drugs[j].indexOf("[amount]") != -1) {
                var text = drugs[j].substring(drugs[j].indexOf("[amount]") + 8);
                if (text.indexOf("[") != -1) {
                    drugEntry.amount = text.substring(0, text.indexOf("["));
                } else {
                    drugEntry.amount = text.substring(0);
                }
            }

            //get form of drug
            if (drugs[j].indexOf("[form]") != -1) {
                var text = drugs[j].substring(drugs[j].indexOf("[form]") + 6);
                if (text.indexOf("[") != -1) {
                    drugEntry.form = text.substring(0, text.indexOf("["));
                } else {
                    drugEntry.form = text.substring(0);
                }
            }
            //            console.log(drugEntry.drug + " " + drugEntry.method + " " + drugEntry.amount + " " + drugEntry.form);
            complete[reportArray[i][0]].drugs.push(drugEntry);
        }

        //insert every other column for this report
        complete[reportArray[i][0]].categ.push(reportArray[i][2].split(";"));
        complete[reportArray[i][0]].nonsub.push(reportArray[i][3].split(";"));
        complete[reportArray[i][0]].context.push(reportArray[i][4].split(";"));
        complete[reportArray[i][0]].intensity = reportArray[i][6];
        complete[reportArray[i][0]].gender = reportArray[i][7];
        complete[reportArray[i][0]].title = reportArray[i][8];
        complete[reportArray[i][0]].author = reportArray[i][9];
        complete[reportArray[i][0]].date = reportArray[i][10];
        complete[reportArray[i][0]].views = reportArray[i][11];
    }

    var keyCount = 0;
    for (var key in complete) {
        if (complete.hasOwnProperty(key)) {
            keyCount++;
        }
    }

    $(document).ready(function () {
        $("#cds").append("<br>Data structure filled. " + keyCount + " entries.");
    });

}