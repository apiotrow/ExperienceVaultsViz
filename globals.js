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

//final scraped data
var reportArrays = {};

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