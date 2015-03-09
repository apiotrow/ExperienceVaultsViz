
/*
This file holds some global variables for
storing the data we scrape
*/

//for storing and grabbing source code that the ajax
//request gets in sourceCodeGetter.js
var sourceCode = "";

//for holding option values so we can perform
//search
var OptionValues_Drugs = [];

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