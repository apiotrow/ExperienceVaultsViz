
/*
This file holds some global variables for
storing the data we scrape
*/


var sourceCode = "";

var OptionValues_Drugs = [];



//Holds the total amount of reports for each drug.
//Used so we can locate the top 10-15 most used drugs.
var drugTotalsList = [];
var drugTotalsListEntry = {
    drug: "",
    amount: 0
};