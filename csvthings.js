/*
This file holds a lot of CSV parsing stuff
*/

//outputs the list of how frequent a drug shows up in the vault
function getDrugFrequency(file) {
    var csvText = "";
    readTextFile(file, function (result) {
        printDrugFrequency(result);
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
function printDrugFrequency(result) {
    var csvText = result;
    var reports = csvText.split(/\r/); //array where each entry is a single report
    var druglist = []; //array of drug names
    var freq = {}; //final drug frequency count
    var drugsInEachEntry = [];

    getSourceCode("https://www.erowid.org/experiences/exp_search.cgi", function () {
        scrapeAllOptionValues();
        for (var i = 0; i < optionValueArrays[0].theArray.length; i++) {
            druglist.push(optionValueArrays[0].theArray[i].item);
        }
    });


    //start at 1 to skip the entry with column headings
    for (var i = 1; i < reports.length; i++) {
        //find where drug list begins
        var drugsBegin = reports[i].indexOf(",");

        //create an array where every entry is the drug(s) a report has,
        //accounting for entries with multiple drugs, which have lists
        //that are wrapped in quotes
        if (reports[i].charAt(drugsBegin + 1) == '"') {
            var drugsInThis = reports[i].substring(drugsBegin + 2);
            drugsInThis = drugsInThis.substring(0, drugsInThis.indexOf('"'));
            drugsInEachEntry.push(drugsInThis);
        } else {
            var reportArray = reports[i].split(',');
            drugsInEachEntry.push(reportArray[1]);
        }
    }
    //console.log(drugsInEachEntry);

    for (var i = 0; i < drugsInEachEntry.length; i++) {
        var drugs = drugsInEachEntry[i].split(",");
        var drugName = "";

        for (var j = 0; j < drugs.length; j++) {
            if (drugs[j].indexOf("[") != -1) {
                drugName = drugs[j].substring(0, drugs[j].indexOf("["));
            } else {
                drugName = drugs[j];
            }
            freq[drugName] = 1;
        }
    }

    var keys = [];
    var stop = 0
    for (var key in freq) {
        if (freq.hasOwnProperty(key)) {
            console.log(key + ": " + freq[key]);
        }
        stop++;
        if (stop == 100) break;
    }

    //    var array2 = 

    //    $(document).ready(function () {
    //        for(var i = 0; i < array.length; i++){
    //            array[i]
    //            $("#popularTable").append('dfgdfgdfg');
    //        }
    //        
    //    });

    //    console.log(array);
}