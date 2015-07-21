

function scrapeReports() {
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

    resetURL();
    
    var allURLS = []; //holds all the URLs we construct using the option values
    fillURLArray();

    //iterate through each URL, parse it, and store the data from it
    var urlIter = 0;
    getURL(urlIter);
    
    
    function fillURLArray(){
        for (var i = 0; i < optionValueArrays.length; i++) {
            for (var j = 0; j < optionValueArrays[i].theArray.length; j++) {
                if(testMode == true){
                    if (j > 1) break; //uncomment this if we want to a do a quicker test
                }

                var url_Entry = {
                    urlType: optionValueArrays[i].type,
                    url: "",
                    itemName: "",
                };
                url_Entry.url = ""; //holds URL
                url_Entry.itemName = optionValueArrays[i].theArray[j].item; //holds item name

                resetURL();

                if (optionValueArrays[i].type == "drug") {
                    drugOne = optionValueArrays[i].theArray[j].optionValue;
                }else if(optionValueArrays[i].type == "category"){
                    category = optionValueArrays[i].theArray[j].optionValue;
                } else if (optionValueArrays[i].type == "nonsubstance") {
                    nonSubstance = optionValueArrays[i].theArray[j].optionValue;
                }else if (optionValueArrays[i].type == "context") {
                    context = optionValueArrays[i].theArray[j].optionValue;
                }else if (optionValueArrays[i].type == "dosemethod") {
                    doseMethod = optionValueArrays[i].theArray[j].optionValue;
                }else if (optionValueArrays[i].type == "intensity") {
                    intensityMin = optionValueArrays[i].theArray[j].optionValue;
                    intensityMax = optionValueArrays[i].theArray[j].optionValue;
                }else if (optionValueArrays[i].type == "genderselect") {
                    gender = optionValueArrays[i].theArray[j].optionValue;
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
                if(testMode == true){
                    if(/*optionValueArrays[i].type != "category" &&*/
                      optionValueArrays[i].type != "nonsubstance" &&
                      optionValueArrays[i].type != "context" &&
                      optionValueArrays[i].type != "dosemethod" &&
                      optionValueArrays[i].type != "genderselect"){
                        for (var urlFields_index in urlFields) {
                            if (urlFields.hasOwnProperty(urlFields_index)) {
                                url += urlFields[urlFields_index];
                            }
                        }

                        url += "&ShowViews=0&Start=0&Max=" + pageSize;
                    }
                }else{
                    for (var urlFields_index in urlFields) {
                        if (urlFields.hasOwnProperty(urlFields_index)) {
                            url += urlFields[urlFields_index];
                        }
                    }

                    url += "&SP=1&ShowViews=1&Start=0&Max=" + pageSize;
                }

                url_Entry.url = url;
                allURLS.push(url_Entry);
            }
        }
    }
    

    function resetURL() {
        urlFields = [];
        var iter = -1;

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

    
    function parseSource(itemName, type) {
        var text = URLSource;
        var pos = text.indexOf('exp.php?ID');
        
//        var parseParams = {
//            text: URLSource,
//            pos: text.indexOf('exp.php?ID')
//        }
        
        function loopThroughTrs(params){
            for(var k = 0; k < params.trCategs.length; k++){
                //check if the dosechart-category exists, because some don't have dosechart-form, etc.
                if(params.trRegion.indexOf("dosechart-" + params.trCategs[k]) != -1){
                    var categName = "dosechart-" + params.trCategs[k];
                    params.thisRegion = params.trRegion.substring(params.trRegion.indexOf(categName), params.trEnd);
                    params.thisRegion = params.thisRegion.substring(params.thisRegion.indexOf(">") + 1, params.trEnd);

                    //substance may have a link we need to skip over
                    var linkRegion = params.thisRegion.substring(0, params.thisRegion.indexOf(">") + 1);
                    if(params.trCategs[k] == "substance" && linkRegion.indexOf("href") != -1){
                        params.thisRegion = params.thisRegion.substring(params.thisRegion.indexOf(">") + 1, params.trEnd);
                    }

                    //form has a <b> we have to skip over
                    if(params.trCategs[k] == "form"){
                        params.thisRegion = params.thisRegion.substring(params.thisRegion.indexOf(">") + 1, params.trEnd);
                    }

                    var resultText = params.thisRegion.substring(0, params.thisRegion.indexOf("<"));

                    //remove whitespace that exists due to the &nbsp;'s
                    resultText = resultText.trim();

                    if(params.trCategs[k] == "amount")
                        params.amountText = resultText;
                    else if(params.trCategs[k] == "method")
                        params.methodText = resultText;
                    else if(params.trCategs[k] == "substance")
                        params.substanceText = resultText;
                    else if(params.trCategs[k] == "form")
                        params.formText = resultText;
                } 
            }
        }//end loopThroughTrs
        
        function dataLoop(params, reportArrayEntry){
            //is this updating the actual array, or not?
            //may have to push before we call this function
            //and instead send in the necessary info from the array
            reportArrayEntry.drugs.push(itemName);

            //get position of next ID
            var nextIDPos = text.indexOf('exp.php?ID', pos + 1);

            //if we're on last ID, next position will be -1, so set next to be end of document
            if(nextIDPos == -1){
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
                trCategs: ["amount","method","substance","form"],
                trStart: params.doseChartRegion.indexOf("DOSE:"),
                trEnd: params.doseChartRegion.indexOf("</table>") + 9,
                trRegion: ""
            }
            loopParams.trRegion = params.doseChartRegion.substring(loopParams.trStart, loopParams.trEnd)

            while(loopParams.trStart != -1){
                loopThroughTrs(loopParams);

                //check if the substance is a match. if it is, edit the drug entry to have amount,
                //method, and form
                if(loopParams.substanceText != "" && loopParams.substanceText == itemName){
                    var entryText = reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(loopParams.substanceText)];
                    if(loopParams.methodText != ""){
                        entryText += "(" + loopParams.methodText + ")";
                    }
                    if(loopParams.amountText != ""){
                        entryText += "(" + loopParams.amountText + ")";
                    }
                    if(loopParams.formText != ""){
                        entryText += loopParams.formText;
                    }
                    reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(loopParams.substanceText)] = entryText;
                //in case of sitations where for instance 5-Me-DMT has just DMT in its dose chart
                }else if(loopParams.substanceText != "" && itemName.indexOf(loopParams.substanceText) != -1){
                    var entryText = reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)];
                    if(loopParams.methodText != ""){
                        entryText += "(" + loopParams.methodText + ")";
                    }
                    if(loopParams.amountText != ""){
                        entryText += "(" + loopParams.amountText + ")";
                    }
                    if(loopParams.formText != ""){
                        entryText += loopParams.formText;
                    }
                    reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)] = entryText;
                //in case of the reverse, where for instance report is listed under Alcohol, but chart has Alcohol - Beer/Wine
                }else if(loopParams.substanceText != "" && loopParams.substanceText.indexOf(itemName) != -1){
                    var entryText = reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)];
                    if(loopParams.methodText != ""){
                        entryText += "(" + loopParams.methodText + ")";
                    }
                    if(loopParams.amountText != ""){
                        entryText += "(" + loopParams.amountText + ")";
                    }
                    if(loopParams.formText != ""){
                        entryText += loopParams.formText;
                    }
                    reportArrayEntry.drugs[reportArrayEntry.drugs.indexOf(itemName)] = entryText;
                }

                loopParams.trStart = loopParams.thisRegion.indexOf("<tr>");
                loopParams.trRegion = loopParams.thisRegion.substring(loopParams.trStart, loopParams.trEnd);
            }//end while
        }//end dataLoop

        while (pos != -1) {
            var idArea = text.substring(pos, text.indexOf(">", pos));
            var idnum = idArea.substring(idArea.indexOf('=') + 1, idArea.indexOf('"'));
            
            dataParams = {
                titleText: "",
                authorText: "",
                dateText: "",
                viewsText: ""
            }

            if (!(idnum in reportArrays)) {
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
                    views:[],
                };

                //every report has a drug entry, so if we do the dose chart parsing here, we won't miss any.
                //we do it only in drug so that we only parse the dose chart once for each report.
                if (type == "drug") {
                    dataLoop(dataParams, reportArray_Entry);
                    
                    
//                    reportArray_Entry.drugs.push(itemName);
//                    
//                    //get position of next ID
//                    var nextIDPos = text.indexOf('exp.php?ID', pos + 1);
//                    
//                    //if we're on last ID, next position will be -1, so set next to be end of document
//                    if(nextIDPos == -1){
//                        nextIDPos = text.length - 1;
//                    }
//                    
//                    //get the region the dose chart is in
//                    var doseChartRegion = text.substring(pos, nextIDPos);
//                    
//                    //get things
//                    var titleText = doseChartRegion.substring(doseChartRegion.indexOf(">") + 1, doseChartRegion.indexOf("<"));
//                    //shrink doseChartRegion to beginning of author
//                    doseChartRegion = doseChartRegion.substring(doseChartRegion.indexOf("<"), nextIDPos);
//                    doseChartRegion = doseChartRegion.substring(13, nextIDPos);
//                    var authorText = doseChartRegion.substring(0, doseChartRegion.indexOf("<"));
//                    //shrink doseChartRegion to beginning of date
//                    doseChartRegion = doseChartRegion.substring(doseChartRegion.indexOf('="right"'), nextIDPos);
//                    doseChartRegion = doseChartRegion.substring(9, nextIDPos);
//                    var dateText = doseChartRegion.substring(0, doseChartRegion.indexOf("<"));
//                    //shrink doseChartRegion to beginning of views
//                    doseChartRegion = doseChartRegion.substring(doseChartRegion.indexOf("right"), nextIDPos);
//                    doseChartRegion = doseChartRegion.substring(7, nextIDPos);
//                    var viewsText = doseChartRegion.substring(0, doseChartRegion.indexOf("<"));
//
//                    //shrink doseChartRegion to first tr entry
////                    var trStart = doseChartRegion.indexOf("DOSE:");
////                    var trEnd = doseChartRegion.indexOf("</table>") + 9;
////                    var trRegion = doseChartRegion.substring(trStart, trEnd);
//                    
//
//                    
//                    //gather categories that are within the dose chart
////                    var amountText = "";
////                    var methodText = "";
////                    var substanceText = "";
////                    var formText = "";
////                    var thisRegion = "";
////                    var trCategs = ["amount","method","substance","form"];
//
//                    var loopParams = {
//                        amountText: "",
//                        methodText: "",
//                        substanceText: "",
//                        formText: "",
//                        thisRegion: "",
//                        trCategs: ["amount","method","substance","form"],
//                        trStart: doseChartRegion.indexOf("DOSE:"),
//                        trEnd: doseChartRegion.indexOf("</table>") + 9,
//                        trRegion: ""
//                    }
//                    loopParams.trRegion = doseChartRegion.substring(loopParams.trStart, loopParams.trEnd)
//                    
////                  while(trStart != -1){
//                    while(loopParams.trStart != -1){
//                        loopThroughTrs(loopParams);
//                        
////                        for(var k = 0; k < trCategs.length; k++){
////                            //check if the dosechart-category exists, because some don't have dosechart-form, etc.
////                            if(trRegion.indexOf("dosechart-" + trCategs[k]) != -1){
////                                var categName = "dosechart-" + trCategs[k];
////                                thisRegion = trRegion.substring(trRegion.indexOf(categName), trEnd);
////                                thisRegion = thisRegion.substring(thisRegion.indexOf(">") + 1, trEnd);
////
////                                //substance may have a link we need to skip over
////                                var linkRegion = thisRegion.substring(0, thisRegion.indexOf(">") + 1);
////                                if(trCategs[k] == "substance" && linkRegion.indexOf("href") != -1){
////                                    thisRegion = thisRegion.substring(thisRegion.indexOf(">") + 1, trEnd);
////                                }
////                                
////                                //form has a <b> we have to skip over
////                                if(trCategs[k] == "form"){
////                                    thisRegion = thisRegion.substring(thisRegion.indexOf(">") + 1, trEnd);
////                                }
////
////                                var resultText = thisRegion.substring(0, thisRegion.indexOf("<"));
////
////                                //remove whitespace that exists due to the &nbsp;'s
////                                resultText = resultText.trim();
////
////                                if(trCategs[k] == "amount")
////                                    amountText = resultText;
////                                else if(trCategs[k] == "method")
////                                    methodText = resultText;
////                                else if(trCategs[k] == "substance")
////                                    substanceText = resultText;
////                                else if(trCategs[k] == "form")
////                                    formText = resultText;
////                            } 
////                        }
////                        //check if the substance is a match. if it is, edit the drug entry to have amount,
////                        //method, and form
////                        if(substanceText != "" && substanceText == itemName){
////                            var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(substanceText)];
////                            if(methodText != ""){
////                                entryText += "(" + methodText + ")";
////                            }
////                            if(amountText != ""){
////                                entryText += "(" + amountText + ")";
////                            }
////                            if(formText != ""){
////                                entryText += formText;
////                            }
////                            reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(substanceText)] = entryText;
////                        //in case of sitations where for instance 5-Me-DMT has just DMT in its dose chart
////                        }else if(substanceText != "" && itemName.indexOf(substanceText) != -1){
////                            var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)];
////                            if(methodText != ""){
////                                entryText += "(" + methodText + ")";
////                            }
////                            if(amountText != ""){
////                                entryText += "(" + amountText + ")";
////                            }
////                            if(formText != ""){
////                                entryText += formText;
////                            }
////                            reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)] = entryText;
////                        //in case of the reverse, where for instance report is listed under Alcohol, but chart has Alcohol - Beer/Wine
////                        }else if(substanceText != "" && substanceText.indexOf(itemName) != -1){
////                            var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)];
////                            if(methodText != ""){
////                                entryText += "(" + methodText + ")";
////                            }
////                            if(amountText != ""){
////                                entryText += "(" + amountText + ")";
////                            }
////                            if(formText != ""){
////                                entryText += formText;
////                            }
////                            reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)] = entryText;
////                        }
////                        trStart = thisRegion.indexOf("<tr>");
////                        trRegion = thisRegion.substring(trStart, trEnd);
//                        
//                        //check if the substance is a match. if it is, edit the drug entry to have amount,
//                        //method, and form
//                        if(loopParams.substanceText != "" && loopParams.substanceText == itemName){
//                            var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(loopParams.substanceText)];
//                            if(loopParams.methodText != ""){
//                                entryText += "(" + loopParams.methodText + ")";
//                            }
//                            if(loopParams.amountText != ""){
//                                entryText += "(" + loopParams.amountText + ")";
//                            }
//                            if(loopParams.formText != ""){
//                                entryText += loopParams.formText;
//                            }
//                            reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(loopParams.substanceText)] = entryText;
//                        //in case of sitations where for instance 5-Me-DMT has just DMT in its dose chart
//                        }else if(loopParams.substanceText != "" && itemName.indexOf(loopParams.substanceText) != -1){
//                            var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)];
//                            if(loopParams.methodText != ""){
//                                entryText += "(" + loopParams.methodText + ")";
//                            }
//                            if(loopParams.amountText != ""){
//                                entryText += "(" + loopParams.amountText + ")";
//                            }
//                            if(loopParams.formText != ""){
//                                entryText += loopParams.formText;
//                            }
//                            reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)] = entryText;
//                        //in case of the reverse, where for instance report is listed under Alcohol, but chart has Alcohol - Beer/Wine
//                        }else if(loopParams.substanceText != "" && loopParams.substanceText.indexOf(itemName) != -1){
//                            var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)];
//                            if(loopParams.methodText != ""){
//                                entryText += "(" + loopParams.methodText + ")";
//                            }
//                            if(loopParams.amountText != ""){
//                                entryText += "(" + loopParams.amountText + ")";
//                            }
//                            if(loopParams.formText != ""){
//                                entryText += loopParams.formText;
//                            }
//                            reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)] = entryText;
//                        }
//
//                        loopParams.trStart = loopParams.thisRegion.indexOf("<tr>");
//                        loopParams.trRegion = loopParams.thisRegion.substring(loopParams.trStart, loopParams.trEnd);
//                    }//end while
                    
//                    //push new things
//                    reportArray_Entry.title.push(titleText);
//                    reportArray_Entry.author.push(authorText);
//                    reportArray_Entry.date.push(dateText);
//                    reportArray_Entry.views.push(viewsText);
                    
                    //push new things
                    reportArray_Entry.title.push(dataParams.titleText);
                    reportArray_Entry.author.push(dataParams.authorText);
                    reportArray_Entry.date.push(dataParams.dateText);
                    reportArray_Entry.views.push(dataParams.viewsText);
                } else if (type == "category") {
                    reportArray_Entry.category.push(itemName);
                } else if (type == "nonsubstance") {
                    reportArray_Entry.nonSubstance.push(itemName);
                } else if (type == "context") {
                    reportArray_Entry.context.push(itemName);
                } else if (type == "dosemethod") {
                    reportArray_Entry.doseMethod.push(itemName);
                } else if (type == "intensity") {
                    reportArray_Entry.intensity.push(itemName);
                } else if (type == "genderselect") {
                    reportArray_Entry.gender.push(itemName);
                }

                reportArrays[idnum] = reportArray_Entry;
            } else {
                console.log("already in there");
                //the indexOf checks are required so we don't duplicate entries
                //as we iterate through multiple pages
                if (type == "drug") {
                    if (reportArrays[idnum].drugs.indexOf(itemName) == -1){
                        reportArrays[idnum].drugs.push(itemName);
                    
                        //get position of next ID
//                        var nextIDPos = text.indexOf('exp.php?ID', pos + 1);
//
//                        //if we're on last ID, next position will be -1, so set next to be end of document
//                        if(nextIDPos == -1){
//                            nextIDPos = text.length - 1;
//                        }
//
//                        //get the region the dose chart is in
//                        var doseChartRegion = text.substring(pos, nextIDPos);
//
//                        //get things
//                        //var titleText = doseChartRegion.substring(doseChartRegion.indexOf(">") + 1, doseChartRegion.indexOf("<"));
//                        //shrink doseChartRegion to beginning of author
//                        doseChartRegion = doseChartRegion.substring(doseChartRegion.indexOf("<"), nextIDPos);
//                        doseChartRegion = doseChartRegion.substring(13, nextIDPos);
//                        //var authorText = doseChartRegion.substring(0, doseChartRegion.indexOf("<"));
//                        //shrink doseChartRegion to beginning of date
//                        doseChartRegion = doseChartRegion.substring(doseChartRegion.indexOf('="right"'), nextIDPos);
//                        doseChartRegion = doseChartRegion.substring(9, nextIDPos);
//                        //var dateText = doseChartRegion.substring(0, doseChartRegion.indexOf("<"));
//                        //shrink doseChartRegion to beginning of views
//                        doseChartRegion = doseChartRegion.substring(doseChartRegion.indexOf("right"), nextIDPos);
//                        doseChartRegion = doseChartRegion.substring(7, nextIDPos);
//                        //var viewsText = doseChartRegion.substring(0, doseChartRegion.indexOf("<"));
//
//                        //shrink doseChartRegion to first tr entry
//                        var trStart = doseChartRegion.indexOf("DOSE:");
//                        var trEnd = doseChartRegion.indexOf("</table>") + 9;
//                        var trRegion = doseChartRegion.substring(trStart, trEnd);
//
//                        while(trStart != -1){
//                            //gather categories that are within the dose chart
//                            var amountText = "";
//                            var methodText = "";
//                            var substanceText = "";
//                            var formText = "";
//                            var thisRegion = "";
//                            var trCategs = ["amount","method","substance","form"];
//                            for(var k = 0; k < trCategs.length; k++){
//                                //check if the dosechart-category exists, because some don't have dosechart-form, etc.
//                                if(trRegion.indexOf("dosechart-" + trCategs[k]) != -1){
//                                    var categName = "dosechart-" + trCategs[k];
//                                    thisRegion = trRegion.substring(trRegion.indexOf(categName), trEnd);
//                                    thisRegion = thisRegion.substring(thisRegion.indexOf(">") + 1, trEnd);
//
//                                    //substance may have a link we need to skip over
//                                    var linkRegion = thisRegion.substring(0, thisRegion.indexOf(">") + 1);
//                                    if(trCategs[k] == "substance" && linkRegion.indexOf("href") != -1){
//                                        thisRegion = thisRegion.substring(thisRegion.indexOf(">") + 1, trEnd);
//                                    }
//
//                                    //form has a <b> we have to skip over
//                                    if(trCategs[k] == "form"){
//                                        thisRegion = thisRegion.substring(thisRegion.indexOf(">") + 1, trEnd);
//                                    }
//
//
//                                    var resultText = thisRegion.substring(0, thisRegion.indexOf("<"));
//
//                                    //the way trRegion is cut off, we need to go to very end rather than the next
//                                    //instance of "<"
//                                    //if(trCategs[k] == "form"){
//        //                                resultText = thisRegion.substring(0, trEnd);
//                                    //}
//
//                                    //remove whitespace that exists due to the &nbsp;'s
//                                    resultText = resultText.trim();
//
//                                    if(trCategs[k] == "amount")
//                                        amountText = resultText;
//                                    else if(trCategs[k] == "method")
//                                        methodText = resultText;
//                                    else if(trCategs[k] == "substance")
//                                        substanceText = resultText;
//                                    else if(trCategs[k] == "form")
//                                        formText = resultText;
//                                } 
//                            }
//                            //check if the substance is a match. if it is, edit the drug entry to have amount,
//                            //method, and form
//                            if(substanceText != "" && substanceText == itemName){
//                                var entryText = reportArrays[idnum].drugs[reportArrays[idnum].drugs.indexOf(substanceText)];
//                                if(methodText != ""){
//                                    entryText += "(" + methodText + ")";
//                                }
//                                if(amountText != ""){
//                                    entryText += "(" + amountText + ")";
//                                }
//                                if(formText != ""){
//                                    entryText += formText;
//                                }
//                                reportArrays[idnum].drugs[reportArrays[idnum].drugs.indexOf(substanceText)] = entryText;
//                            //in case of sitations where for instance 5-Me-DMT has just DMT in its dose chart
//                            }else if(substanceText != "" && itemName.indexOf(substanceText) != -1){
//                                var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)];
//                                if(methodText != ""){
//                                    entryText += "(" + methodText + ")";
//                                }
//                                if(amountText != ""){
//                                    entryText += "(" + amountText + ")";
//                                }
//                                if(formText != ""){
//                                    entryText += formText;
//                                }
//                                reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)] = entryText;
//                            }
//                            //in case of the reverse, where for instance report is listed under Alcohol, but chart has Alcohol - Beer/Wine
//                            else if(substanceText != "" && substanceText.indexOf(itemName) != -1){
//                                    var entryText = reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)];
//                                    if(methodText != ""){
//                                        entryText += "(" + methodText + ")";
//                                    }
//                                    if(amountText != ""){
//                                        entryText += "(" + amountText + ")";
//                                    }
//                                    if(formText != ""){
//                                        entryText += formText;
//                                    }
//                                    reportArray_Entry.drugs[reportArray_Entry.drugs.indexOf(itemName)] = entryText;
//                                }
//
//                            trStart = thisRegion.indexOf("<tr>");
//                            trRegion = thisRegion.substring(trStart, trEnd);
//                        }//end while

                        //push new things
                        //reportArray_Entry.title.push(titleText);
                       // reportArray_Entry.author.push(authorText);
                       // reportArray_Entry.date.push(dateText);
                        //reportArray_Entry.views.push(viewsText);
                    }
                } else if (type == "category") {
                    if (reportArrays[idnum].category.indexOf(itemName) == -1)
                        reportArrays[idnum].category.push(itemName);
                } else if (type == "nonsubstance") {
                    if (reportArrays[idnum].nonSubstance.indexOf(itemName) == -1)
                        reportArrays[idnum].nonSubstance.push(itemName);
                } else if (type == "context") {
                    if (reportArrays[idnum].context.indexOf(itemName) == -1)
                        reportArrays[idnum].context.push(itemName);
                } else if (type == "dosemethod") {
                    if (reportArrays[idnum].doseMethod.indexOf(itemName) == -1)
                        reportArrays[idnum].doseMethod.push(itemName);
                } else if (type == "intensity") {
                    if (reportArrays[idnum].intensity.indexOf(itemName) == -1)
                        reportArrays[idnum].intensity.push(itemName);
                } else if (type == "genderselect") {
                    if (reportArrays[idnum].gender.indexOf(itemName) == -1)
                        reportArrays[idnum].gender.push(itemName);
                }
            }

            //fills in drug ID table
            $(document).ready(function () {
                $("#" + idnum).remove(); //if entry in table exists, replace it with new one

                //put the ID in the table with all its info
                $("#reportTable").append('<tr id="' 
                                         + idnum + '"><td>' 
                                         + idnum + '</td><td>' 
                                         + reportArrays[idnum].drugs + '</td><td>' 
                                         + reportArrays[idnum].category + '</td><td>' 
                                         + reportArrays[idnum].nonSubstance + '</td><td>' 
                                         + reportArrays[idnum].context + '</td><td>' 
                                         + reportArrays[idnum].doseMethod + '</td><td>' 
                                         + reportArrays[idnum].intensity + '</td><td>' 
                                         + reportArrays[idnum].gender + '</td><td>' 
                                         + reportArrays[idnum].title + '</td><td>' 
                                         + reportArrays[idnum].author + '</td><td>'
                                         + reportArrays[idnum].date + '</td><td>'
                                         + reportArrays[idnum].views + '</tr>');

            });
            
            pos = text.indexOf('exp.php?ID', pos + 1);
        }
    }


    function getURL(iter) {
        //if we've iterated over all of them
        if (iter >= allURLS.length) {
            //exportToCSV();
            console.log("we done");
            return;
        }

        //get the source for the search, count the reports, and shove them
        //with their appropriate drug in the drugTotalsList array
        getSourceCode(allURLS[iter].url, function () {
            //we're flipping through pages. don't parse the original URL again
            if (onPageOne == true){
                parseSource(allURLS[iter].itemName, allURLS[iter].urlType); //send in item name, and type
            }

            var url = allURLS[iter].url;
            var startBegin = url.indexOf("Start=") + 6;
            currStart += pageSize;
            nextPage = allURLS[iter].url.substring(0, startBegin - 6);
            nextPage += "Start=" + (currStart) + "&Max=" + pageSize;
            getSourceCode(nextPage, function () {
                var totalBegin = URLSource.indexOf("><b>(") + 5;
                var totalEnd = URLSource.indexOf("Total");
                reportAmt = Number(URLSource.substring(totalBegin, totalEnd));

                if (URLSource.indexOf("No Reports Found Matching") > -1 || reportAmt == 0) {
                    console.log("url " + iter + "/" + allURLS.length + ". " + allURLS[iter].urlType + " " + allURLS[iter].itemName + ": " + reportAmt + " of " + reportAmt);
                    onPageOne = true;
                    urlIter++;
                    currStart = 0;
                    getURL(urlIter);
                } else {
                    console.log("url " + iter + "/" + allURLS.length + ". " + allURLS[iter].urlType + " " + allURLS[iter].itemName + ": " + currStart + " of " + reportAmt);
                    
                    onPageOne = false;
                    parseSource(allURLS[iter].itemName, allURLS[iter].urlType); //send in item name, and type
                    getURL(urlIter);
                }
            });
        });
    }
}
