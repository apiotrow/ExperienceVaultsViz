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
    var druglist = []; //array of drug names
    var freq = {}; //final drug frequency count
    var drugsInEachEntry = [];

    //    getSourceCode("https://www.erowid.org/experiences/exp_search.cgi", function () {
    //        scrapeAllOptionValues();
    //        for (var i = 0; i < optionValueArrays[0].theArray.length; i++) {
    //            druglist.push(optionValueArrays[0].theArray[i].item);
    //        }
    //    });


    var ttt = [];
    //replace commas in nested entries
    for (var i = 1; i < /*reports.length*/ 50; i++) {

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
        ttt.push(reports[i].split(","));
        
    }
    console.log(ttt);

    //insert entries into complete structure
    complete[reports[i][0]] = idEntry;
    //complete[reports[i][1]].drugs = drugEntry;

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

    //entry for the drug array in the completeEntry object ^
    var drugEntry = {
        drug: "",
        method: "",
        amount: "",
        form: ""
    }






    //    //iterate through every entry in
    //    for (var i = 0; i < drugsInEachEntry.length; i++) {
    //        var drugs = drugsInEachEntry[i].split(",");
    //        var drugName = "";
    //
    //        //iterate through every drug in the entry, including ones with only one drug
    //        for (var j = 0; j < drugs.length; j++) {
    //            if (drugs[j].indexOf("[") != -1) {
    //                drugName = drugs[j].substring(0, drugs[j].indexOf("["));
    //            } else {
    //                drugName = drugs[j];
    //            }
    //            freq[drugName] = 1;
    //        }
    //    }
    //
    //    var keys = [];
    //    var stop = 0
    //    for (var key in freq) {
    //        if (freq.hasOwnProperty(key)) {
    //            console.log(key + ": " + freq[key]);
    //        }
    //        stop++;
    //        if (stop == 100) break;
    //    }

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