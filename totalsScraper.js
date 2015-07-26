eevv.scrapeTotals = function () {

    var urlFields = [], //for constructing the URL
        reportAmt = 0, //storing so we can track progress of scraping
        testMode = false,
        allURLS = [], //holds all the URLs we construct using the option values
        urlIter = 0,

        //url components
        drugOne = 0,
        drugTwo = -1,
        drugThree = -1,
        category = -1,
        nonSubstance = -1,
        gender = -1,
        context = -1,
        doseMethod = -1,
        title = "",
        authorSearch = "",
        erowidAuthor = -1,
        language = 1,
        group = -1,
        strength = "",
        intensityMin = "",
        intensityMax = "";

    //create top row of chart
    $(document).ready(function () {
        $("#totalsTable").html("<tr><td>Drugs</td><td>Totals</td></tr>");
    });
    
    resetURL();
    fillURLArray();

    //iterate through each URL, parse it, and store the data from it
    getURL(urlIter);


    //iterate through option values, generating URLS which will later
    //be iterated through to get their source code
    function fillURLArray() {
        for (var i = 0; i < eevv.optionValueArrays.length; i++) {
            for (var j = 0; j < eevv.optionValueArrays[i].theArray.length; j++) {

                var url_Entry = {
                    urlType: eevv.optionValueArrays[i].type,
                    url: "",
                    itemName: "",
                };
                url_Entry.url = ""; //holds URL
                url_Entry.itemName = eevv.optionValueArrays[i].theArray[j].item; //holds item name

                resetURL();

                if (eevv.optionValueArrays[i].type == "drug") {
                    drugOne = eevv.optionValueArrays[i].theArray[j].optionValue;
                }

                setupURL(drugOne,
                    drugTwo,
                    drugThree,
                    category,
                    nonSubstance,
                    gender,
                    context,
                    doseMethod,
                    title,
                    authorSearch,
                    erowidAuthor,
                    language,
                    group,
                    strength,
                    intensityMin,
                    intensityMax);

                var url = "";

                //test mode reduces the amount of iteration before scraping is completed,
                //so we can achieve an end-state quicker
                if (testMode == true) {
                    if ( /*optionValueArrays[i].type != "category" &&*/
                        eevv.optionValueArrays[i].type != "nonsubstance" &&
                        eevv.optionValueArrays[i].type != "context" &&
                        eevv.optionValueArrays[i].type != "dosemethod" &&
                        eevv.optionValueArrays[i].type != "genderselect") {
                        for (var urlFields_index in urlFields) {
                            if (urlFields.hasOwnProperty(urlFields_index)) {
                                url += urlFields[urlFields_index];
                            }
                        }

                        url += "&ShowViews=0&Start=0&Max=";
                    }
                } else {
                    for (var urlFields_index in urlFields) {
                        if (urlFields.hasOwnProperty(urlFields_index)) {
                            url += urlFields[urlFields_index];
                        }
                    }

                    url += "&ShowViews=0&Start=0&Max=";
                }

                url_Entry.url = url;
                allURLS.push(url_Entry);
            }
        }
    }

    //set the url fields back to their default values
    function resetURL() {
        urlFields = [];

        drugOne = 0;
        drugTwo = -1;
        drugThree = -1;
        category = -1;
        nonSubstance = -1;
        gender = -1;
        context = -1;
        doseMethod = -1;
        title = "";
        authorSearch = "";
        erowidAuthor = -1;
        language = 1;
        group = -1;
        strength = "";
        intensityMin = "";
        intensityMax = "";
    }

    function setupURL(f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16) {
        urlFields = {
            init: "https://www.erowid.org/experiences/exp.cgi?A=Search",
            drugOne: "&S1=" + f1,
            drugTwo: "&S2=" + f2,
            drugThree: "&S3=" + f3,
            category: "&C1=" + f4,
            nonSubstance: "&S4=" + f5,
            gender: "&GenderSelect=" + f6,
            context: "&Context=" + f7,
            doseMethod: "&DoseMethodID=" + f8,
            title: "&Title=" + f9,
            authorSearch: "&AuthorSearch=" + f10,
            erowidAuthor: "&A1=" + f11,
            language: "&Lang=" + f12,
            group: "&Group=" + f13,
            strength: "&Str=" + f14,
            intensityMin: "&Intensity=" + f15,
            intensityMax: "&I2=" + f16
        }
    }

    //go through the HTML source and extrapolate the various values we want, for each report in the source
    function parseSource(itemName, type) {
        var text = eevv.URLSource;
        var pos = text.indexOf('<font size="2"><b>');
        var str = text.substring(pos + 19, text.indexOf(' Total)</b></font><br/><br/>'));

        $(document).ready(function () {
            $("#totalsTable").append("<tr><td>" + itemName + "</td><td>" + str + "</td></tr>");
        });

    }

    //page through the search results by retrieving the source code and progressively
    //modifying the URL in order to move from one page to the next.
    function getURL(iter) {
        //if we've iterated over all of them
        if (iter >= allURLS.length) {
            console.log("totals are scraped");
            return;
        }

        //get the source for the search
        eevv.getSourceCode(allURLS[iter].url, function () {
            parseSource(allURLS[iter].itemName, allURLS[iter].urlType); //send in item name, and type
            urlIter++;
            getURL(urlIter);
        });
    }
}