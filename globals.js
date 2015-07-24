/*
This file holds some global variables for
storing the data we scrape
*/

var scraperglobals = {
    //for storing and grabbing source code that the ajax
    //request gets in sourceGetter.js
    URLSource: "",

    //holds all arrays that hold option values, as well
    //as their starting and ending points in the source code
    optionValueArrays: [],

    //final scraped data
    reportArrays: {},

    OptionValues_PopularDrugs: [],

    //for holding total amount of reports for each
    //drug
    AmtOfReports_Drugs: [],


    //Holds the total amount of reports for each drug.
    //Used so we can locate the top 10-15 most used drugs.
    drugTotalsList: [],

    amountList: [],

    pr: function (text) {
        console.log(text);
    }
}