/*
This file holds some global variables for
storing the data we scrape
*/

//for storing and grabbing source code that the ajax
//request gets in sourceGetter.js
var URLSource = "";

//holds all arrays that hold option values, as well
//as their starting and ending points in the source code
var optionValueArrays = [];

fillOptionValueArrays();

function fillOptionValueArrays() {
    var iter = -1;
    
    optionValueArrays[++iter] = {
        begin: "S1",
        end: "S2",
        theArray: OptionValues_Drugs = []
    };
    optionValueArrays[++iter] = {
        begin: "C1",
        end: "S4",
        theArray: OptionValues_Category = []
    };
    optionValueArrays[++iter] = {
        begin: "S4",
        end: "GenderSelect",
        theArray: OptionValues_NonSubstance = []
    };
    optionValueArrays[++iter] = {
        begin: "GenderSelect",
        end: "Context",
        theArray: OptionValues_Gender = []
    };
    optionValueArrays[++iter] = {
        begin: "Context",
        end: "DoseMethodID",
        theArray: OptionValues_Context = []
    };
    optionValueArrays[++iter] = {
        begin: "DoseMethodID",
        end: "A1",
        theArray: OptionValues_DoseMethod = []
    };
//    optionValueArrays[++iter] = {
//        begin: "A1",
//        end: "Lang",
//        theArray: OptionValues_Author = []
//    };
//    optionValueArrays[++iter] = {
//        begin: "Lang",
//        end: "Group",
//        theArray: OptionValues_Lang = []
//    };
    optionValueArrays[++iter] = {
        begin: "Intensity",
        end: "I2",
        theArray: OptionValues_Intensity = []
    };
}

var reportArrays = [];



var OptionValues_PopularDrugs = [];

//for holding total amount of reports for each
//drug
var AmtOfReports_Drugs = [];


//Holds the total amount of reports for each drug.
//Used so we can locate the top 10-15 most used drugs.
var drugTotalsList = [];
//var drugTotalsListEntry = {
//    drug: "",
//    amount: 0
//};

var amountList = [];

function pr(text) {
    console.log(text);
}