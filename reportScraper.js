eevv.scrapeReports = function () {
    var urlFields = []; //for constructing the URL
    var reportAmt = 0; //storing so we can track progress of scraping
    var nextPage = "";
    var currStart = 0;
    var pageSize = 500; //how big the pages are that we flip though
    var onPageOne = true;

    var drugOne = 0;
    var drugTwo = -1;
    var drugThree = -1;
    var category = -1;
    var nonSubstance = -1;
    var gender = -1;
    var context = -1;
    var doseMethod = -1;
    var title = "";
    var authorSearch = "";
    var erowidAuthor = -1;
    var language = 1;
    var group = -1;
    var strength = "";
    var intensityMin = "";
    var intensityMax = "";

    var testMode = false;

    //create top row of chart in html
    $(document).ready(function () {
        $("#reportTable").html("<tr><td>Report ID</td><td>Drugs</td><td>Categories</td><td>Non-Substance</td><td>Context</td><td>Dose Method</td><td>Intensity</td><td>Gender</td><td>Title</td><td>Author</td><td>Date</td><td>Views</td></tr>");
    });

    resetURL();

    var allURLS = []; //holds all the URLs we construct using the option values
    fillURLArray();

    //iterate through each URL, parse it, and store the data from it
    var urlIter = 0;
    // getURL(urlIter);

    var moveToNextURL = true;

    setInterval(function() {
        if(moveToNextURL == true){
            moveToNextURL = false;
            getURL(urlIter);
            // console.log("moving to next");

        }
    } , 500);








    

    //iterate through option values, generating URLS which will later
    //be iterated through to get their source code
    function fillURLArray() {
        for (var i = 0; i < eevv.optionValueArrays.length; i++) {
            for (var j = 0; j < eevv.optionValueArrays[i].theArray.length; j++) {
                if (testMode == true) {
                    if (j > 1) break; //uncomment this if we want to a do a quicker test
                }

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
                } else if (eevv.optionValueArrays[i].type == "category") {
                    category = eevv.optionValueArrays[i].theArray[j].optionValue;
                } else if (eevv.optionValueArrays[i].type == "nonsubstance") {
                    nonSubstance = eevv.optionValueArrays[i].theArray[j].optionValue;
                } else if (eevv.optionValueArrays[i].type == "context") {
                    context = eevv.optionValueArrays[i].theArray[j].optionValue;
                } else if (eevv.optionValueArrays[i].type == "dosemethod") {
                    doseMethod = eevv.optionValueArrays[i].theArray[j].optionValue;
                } else if (eevv.optionValueArrays[i].type == "intensity") {
                    intensityMin = eevv.optionValueArrays[i].theArray[j].optionValue;
                    intensityMax = eevv.optionValueArrays[i].theArray[j].optionValue;
                } 
                else if (eevv.optionValueArrays[i].type == "genderselect") {
                    gender = eevv.optionValueArrays[i].theArray[j].optionValue;
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

                        url += "&ShowViews=0&Start=0&Max=" + pageSize;
                    }
                } else {
                    for (var urlFields_index in urlFields) {
                        if (urlFields.hasOwnProperty(urlFields_index)) {
                            url += urlFields[urlFields_index];
                        }
                    }

                    url += "&SP=1&ShowViews=1&Start=0&Max=" + pageSize;

                    //add in cellar reports, which adds like 1000 more.
                    //but they're apparently less reliable
                    url += "&Cellar=1";
                }

                
                url_Entry.url = url;
                allURLS.push(url_Entry);
//                console.log(url_Entry);
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
        // function setupURL(f1, f2, f3, f9, f10, f11, f12, f13, f14, f15, f16) {
        urlFields = {
            init: "https://www.erowid.org/experiences/exp.cgi?A=Search",
//            init: "file:///Volumes/erowid_may_1_201/e/http80/www.erowid.org/experiences/exp.cgi.html?A=Search",
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
        var pos = text.indexOf('exp.php?ID');

        //move through HTML source by jumping from one report ID to the next
        while (pos != -1) {
            var idArea = text.substring(pos, text.indexOf(">", pos));
            var idnum = idArea.substring(idArea.indexOf('=') + 1, idArea.indexOf('"'));



            if(!eevv.newComplete.hasOwnProperty(idnum)){
                eevv.newComplete[idnum] = {};
            }



            //hold these here so dataLoop can modify them by reference
            dataParams = {
                titleText: "",
                authorText: "",
                dateText: "",
                viewsText: ""
            }

            //if the report we're looking at is new to the report array, add it.
            //author, title, date, and views are added only in this initial insertion.
            if (!(idnum in eevv.reportArrays)) {
                //all the data for one report
                var reportArray_Entry = {
                    drugs: [],
                    category: [],
                    nonSubstance: [],
                    context: [],
                    doseMethod: [],
                    intensity: [],
                    gender: [],
                    title: [],
                    author: [],
                    date: [],
                    views: [],
                };

                //every report has a drug entry, so if we do the dose chart parsing here, we won't miss any.
                //we do it only in drug so that we only parse the dose chart once for each report.
                if (type == "drug") {
                    //pass reportArray_Entry, title, author, date, and views text in by reference
                    dataLoop(dataParams, reportArray_Entry);

                    //push new things
                    reportArray_Entry.title.push(dataParams.titleText);
                    reportArray_Entry.author.push(dataParams.authorText);
                    reportArray_Entry.date.push(dataParams.dateText);
                    reportArray_Entry.views.push(dataParams.viewsText);
                } else if (type == "category") {
                    reportArray_Entry.category.push(itemName);
                } else if (type == "nonsubstance") {
                    reportArray_Entry.nonSubstance.push(itemName);
                    eevv.newComplete[idnum][itemName] = 0;
                } else if (type == "context") {
                    reportArray_Entry.context.push(itemName);
                } else if (type == "dosemethod") {
                    reportArray_Entry.doseMethod.push(itemName);
                } else if (type == "intensity") {
                    reportArray_Entry.intensity.push(itemName);
                } 
                else if (type == "genderselect") {
                    reportArray_Entry.gender.push(itemName);
                }

                eevv.reportArrays[idnum] = reportArray_Entry;

                //the report is already in the array. add whatever new information needs to be added.
            } else {
                //the indexOf checks are required so we don't duplicate entries
                //as we iterate through multiple pages
                if (type == "drug") {
                    if (eevv.reportArrays[idnum].drugs.indexOf(itemName) == -1) {
                        dataLoop(dataParams, eevv.reportArrays[idnum]);
                    }
                } else if (type == "category") {
                    if (eevv.reportArrays[idnum].category.indexOf(itemName) == -1)
                        eevv.reportArrays[idnum].category.push(itemName);
                } else if (type == "nonsubstance") {
                    if (eevv.reportArrays[idnum].nonSubstance.indexOf(itemName) == -1)
                        eevv.reportArrays[idnum].nonSubstance.push(itemName);
                    eevv.newComplete[idnum][itemName] = 0;
                } else if (type == "context") {
                    if (eevv.reportArrays[idnum].context.indexOf(itemName) == -1)
                        eevv.reportArrays[idnum].context.push(itemName);
                } else if (type == "dosemethod") {
                    if (eevv.reportArrays[idnum].doseMethod.indexOf(itemName) == -1)
                        eevv.reportArrays[idnum].doseMethod.push(itemName);
                } else if (type == "intensity") {
                    if (eevv.reportArrays[idnum].intensity.indexOf(itemName) == -1)
                        eevv.reportArrays[idnum].intensity.push(itemName);
                } 
                else if (type == "genderselect") {
                    if (eevv.reportArrays[idnum].gender.indexOf(itemName) == -1)
                        eevv.reportArrays[idnum].gender.push(itemName);
                }
            }

            //fills in drug ID table
            // $(document).ready(function () {
            //     $("#" + idnum).remove(); //if entry in table exists, replace it with new one

            //     //put the ID in the table with all its info
            //     $("#reportTable").append('<tr id="' + idnum + '"><td>' + idnum + '</td><td>' + eevv.reportArrays[idnum].drugs + '</td><td>' + eevv.reportArrays[idnum].category + '</td><td>' + eevv.reportArrays[idnum].nonSubstance + '</td><td>' + eevv.reportArrays[idnum].context + '</td><td>' + eevv.reportArrays[idnum].doseMethod + '</td><td>' + eevv.reportArrays[idnum].intensity + '</td><td>' + eevv.reportArrays[idnum].gender + '</td><td>' + eevv.reportArrays[idnum].title + '</td><td>' + eevv.reportArrays[idnum].author + '</td><td>' + eevv.reportArrays[idnum].date + '</td><td>' + eevv.reportArrays[idnum].views + '</tr>');
            //     // $("#reportTable").append('<tr id="' + idnum + '"><td>' + idnum + '</td><td>' + eevv.reportArrays[idnum].drugs + '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + eevv.reportArrays[idnum].intensity + '</td><td>' + "" + '</td><td>' + eevv.reportArrays[idnum].title + '</td><td>' + eevv.reportArrays[idnum].author + '</td><td>' + eevv.reportArrays[idnum].date + '</td><td>' + eevv.reportArrays[idnum].views + '</tr>');

            // });



            pos = text.indexOf('exp.php?ID', pos + 1);
        }

        //loop through a single tr block, extrapolating the amount, method, and form.
        //called from dataLoop.
        function loopThroughTrs(params) {
            for (var k = 0; k < params.trCategs.length; k++) {
                //check if the dosechart-category exists, because some don't have dosechart-form, etc.
                if (params.trRegion.indexOf("dosechart-" + params.trCategs[k]) != -1) {
                    var categName = "dosechart-" + params.trCategs[k];
                    params.thisRegion = params.trRegion.substring(params.trRegion.indexOf(categName), params.trEnd);
                    params.thisRegion = params.thisRegion.substring(params.thisRegion.indexOf(">") + 1, params.trEnd);

                    //substance may have a link we need to skip over
                    var linkRegion = params.thisRegion.substring(0, params.thisRegion.indexOf(">") + 1);
                    if (params.trCategs[k] == "substance" && linkRegion.indexOf("href") != -1) {
                        params.thisRegion = params.thisRegion.substring(params.thisRegion.indexOf(">") + 1, params.trEnd);
                    }

                    //form has a <b> we have to skip over
                    if (params.trCategs[k] == "form") {
                        params.thisRegion = params.thisRegion.substring(params.thisRegion.indexOf(">") + 1, params.trEnd);
                    }

                    var resultText = params.thisRegion.substring(0, params.thisRegion.indexOf("<"));

                    //remove whitespace that exists due to the &nbsp;'s
                    resultText = resultText.trim();

                    if (params.trCategs[k] == "amount")
                        params.amountText = resultText;
                    else if (params.trCategs[k] == "method")
                        params.methodText = resultText;
                    else if (params.trCategs[k] == "substance")
                        params.substanceText = resultText;
                    else if (params.trCategs[k] == "form")
                        params.formText = resultText;
                }
            }
        } //end loopThroughTrs

        //retrieve report title, author, date, and view count, and then
        //update the entry for this drug
        function dataLoop(params, reportArrayEntry) {
            reportArrayEntry.drugs.push(itemName);

            //get position of next ID
            var nextIDPos = text.indexOf('exp.php?ID', pos + 1);

            //if we're on last ID, next position will be -1, so set next to be end of document
            if (nextIDPos == -1) {
                nextIDPos = text.length - 1;
            }

            //get the region the dose chart is in
            params.doseChartRegion = text.substring(pos, nextIDPos);

            //get things
            params.titleText = params.doseChartRegion.substring(params.doseChartRegion.indexOf(">") + 1, params.doseChartRegion.indexOf("<"));
            //shrink doseChartRegion to beginning of author
            params.doseChartRegion = params.doseChartRegion.substring(params.doseChartRegion.indexOf("<"), nextIDPos);
            params.doseChartRegion = params.doseChartRegion.substring(13, nextIDPos);
            params.authorText = params.doseChartRegion.substring(0, params.doseChartRegion.indexOf("<"));
            //shrink doseChartRegion to beginning of date
            params.doseChartRegion = params.doseChartRegion.substring(params.doseChartRegion.indexOf('="right"'), nextIDPos);
            params.doseChartRegion = params.doseChartRegion.substring(9, nextIDPos);
            params.dateText = params.doseChartRegion.substring(0, params.doseChartRegion.indexOf("<"));
            //shrink doseChartRegion to beginning of views
            params.doseChartRegion = params.doseChartRegion.substring(params.doseChartRegion.indexOf("right"), nextIDPos);
            params.doseChartRegion = params.doseChartRegion.substring(7, nextIDPos);
            params.viewsText = params.doseChartRegion.substring(0, params.doseChartRegion.indexOf("<"));

            var loopParams = {
                amountText: "",
                methodText: "",
                substanceText: "",
                formText: "",
                thisRegion: "",
                trCategs: ["amount", "method", "substance", "form"],
                trStart: params.doseChartRegion.indexOf("DOSE:"),
                trEnd: params.doseChartRegion.indexOf("</table>") + 9,
                trRegion: ""
            }
            loopParams.trRegion = params.doseChartRegion.substring(loopParams.trStart, loopParams.trEnd)

            while (loopParams.trStart != -1) {
                loopThroughTrs(loopParams);

                //check if the substance is a match. if it is, edit the drug entry to have amount,
                //method, and form
                if (loopParams.substanceText != "" && loopParams.substanceText == itemName) {
                    var entryText = reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(loopParams.substanceText)];
                    if (loopParams.methodText != "") {
                        entryText += "[method]" + loopParams.methodText;
                    }
                    if (loopParams.amountText != "") {
                        entryText += "[amount]" + loopParams.amountText;
                    }
                    if (loopParams.formText != "") {
                        loopParams.formText = loopParams.formText.replace(/\(|\)/g, '') //remove parenthesis
                        entryText += "[form]" + loopParams.formText;
                    }
                    reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(loopParams.substanceText)] = entryText;
                    //in case of sitations where for instance 5-Me-DMT has just DMT in its dose chart
                } else if (loopParams.substanceText != "" && itemName.indexOf(loopParams.substanceText) != -1) {
                    var entryText = reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)];
                    if (loopParams.methodText != "") {
                        entryText += "[method]" + loopParams.methodText;
                    }
                    if (loopParams.amountText != "") {
                        entryText += "[amount]" + loopParams.amountText;
                    }
                    if (loopParams.formText != "") {
                        loopParams.formText = loopParams.formText.replace(/\(|\)/g, '') //remove parenthesis
                        entryText += "[form]" + loopParams.formText;
                    }
                    reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)] = entryText;
                    //in case of the reverse, where for instance report is listed under Alcohol, but chart has Alcohol - Beer/Wine
                } else if (loopParams.substanceText != "" && loopParams.substanceText.indexOf(itemName) != -1) {
                    var entryText = reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)];
                    if (loopParams.methodText != "") {
                        entryText += "[method]" + loopParams.methodText;
                    }
                    if (loopParams.amountText != "") {
                        entryText += "[amount]" + loopParams.amountText;
                    }
                    if (loopParams.formText != "") {
                        loopParams.formText = loopParams.formText.replace(/\(|\)/g, '') //remove parenthesis
                        entryText += "[form]" + loopParams.formText;
                    }
                    reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)] = entryText;
                }

                loopParams.trStart = loopParams.thisRegion.indexOf("<tr>");
                loopParams.trRegion = loopParams.thisRegion.substring(loopParams.trStart, loopParams.trEnd);
            } //end while
        } //end dataLoop
    }

    //page through the search results by retrieving the source code and progressively
    //modifying the URL in order to move from one page to the next.
    function getURL(iter) {
       

        //if we've iterated over all of them
        if (iter >= allURLS.length) {
            //exportToCSV();
            console.log("we done");

            console.log(eevv.newComplete);
            var data = JSON.stringify(eevv.newComplete);
            console.log(data);
            // var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
            // window.open(url, '_blank');
            // window.focus();

            return;
        }

        //get the source for the search, count the reports, and shove them
        //in the div
        eevv.getSourceCode(allURLS[iter].url, function () {
            //we're flipping through pages. don't parse the original URL again
            if (onPageOne == true) {
                parseSource(allURLS[iter].itemName, allURLS[iter].urlType); //send in item name, and type
            }

            var url = allURLS[iter].url;
            var startBegin = url.indexOf("Start=") + 6;
            currStart += pageSize;
            nextPage = allURLS[iter].url.substring(0, startBegin - 6);
            nextPage += "Start=" + (currStart) + "&Max=" + pageSize + "&Cellar=1";

            eevv.getSourceCode(nextPage, function () {
                var totalBegin = eevv.URLSource.indexOf("><b>(") + 5;
                var totalEnd = eevv.URLSource.indexOf("Total");
                reportAmt = Number(eevv.URLSource.substring(totalBegin, totalEnd));

                if (eevv.URLSource.indexOf("No Reports Found Matching") > -1 || reportAmt == 0) {
                    console.log("url " + iter + "/" + allURLS.length + ". " + allURLS[iter].urlType + " " + allURLS[iter].itemName + ": " + reportAmt + " of " + reportAmt);

                    $(document).ready(function () {
                        //put the ID in the table with all its info
                        $("#yes").remove();
                        $("#progressBar").append('<p id="yes">' + iter + " of " + allURLS.length + "</p>");
                    });

                    onPageOne = true;
                    urlIter++;
                    currStart = 0;

                    //for recursive solution
                    // getURL(urlIter);

                    //for non-recursive
                    moveToNextURL = true;
                } else {
                    console.log("url " + iter + "/" + allURLS.length + ". " + allURLS[iter].urlType + " " + allURLS[iter].itemName + ": " + currStart + " of " + reportAmt);

                    onPageOne = false;
                    parseSource(allURLS[iter].itemName, allURLS[iter].urlType); //send in item name, and type

                    //for recursive solution
                    // getURL(urlIter);

                    //for non-recursive
                    moveToNextURL = true;
                }
            });
        });

    }
}