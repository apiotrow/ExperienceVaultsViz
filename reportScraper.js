function scrapeReports() {

    var urlFields = []; //for constructing the URL
    var reportAmt = 0;
    var nextPage = "";
    var currStart = 0;
    var pageSize = 500; //how big the pages are that we load
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

    resetURL();

    function resetURL() {
        urlFields = [];
        var iter = -1;

        //put all in their non-selected state
        //        urlFields[++iter] = 0; //[0] = drugOne
        //        urlFields[++iter] = -2; //[0] = drugTwo
        //        urlFields[++iter] = -2; //[0] = drugThree
        //        urlFields[++iter] = -1; //[0] = category
        //        urlFields[++iter] = -1; //[0] = nonSubstance
        //        urlFields[++iter] = -1; //[0] = gender
        //        urlFields[++iter] = -1; //[0] = context
        //        urlFields[++iter] = -1; //[0] = doseMethod
        //        urlFields[++iter] = ""; //[0] = title
        //        urlFields[++iter] = ""; //[0] = authorSearch
        //        urlFields[++iter] = -1; //[0] = erowidAuthor
        //        urlFields[++iter] = 1; //[0] = language
        //        urlFields[++iter] = -1; //[0] = group
        //        urlFields[++iter] = ""; //[0] = strength
        //        urlFields[++iter] = ""; //[0] = intensityMin
        //        urlFields[++iter] = ""; //[0] = intensityMax


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



    var allURLS = []; //holds all the URLs we construct using the option values


    for (var i = 0; i < optionValueArrays.length; i++) {

        for (var j = 0; j < optionValueArrays[i].theArray.length; j++) {
            //if (j > 2) break; //uncomment this if we want to a do a quicker test


            var url_Entry = {
                urlType: optionValueArrays[i].type,
                url: "",
                itemName: "",
            };
            url_Entry.url = ""; //holds URL
            url_Entry.itemName = optionValueArrays[i].theArray[j].item; //holds item name


            resetURL();

            if (optionValueArrays[i].type == "drug") {
                setupURL(optionValueArrays[i].theArray[j].optionValue,
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

            } else if (optionValueArrays[i].type == "category") {
                setupURL(drugOne,
                    drugTwo,
                    drugThree,
                    optionValueArrays[i].theArray[j].optionValue,
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

            } else if (optionValueArrays[i].type == "nonsubstance") {
                setupURL(drugOne,
                    drugTwo,
                    drugThree,
                    category,
                    optionValueArrays[i].theArray[j].optionValue,
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

            } else if (optionValueArrays[i].type == "context") {
                setupURL(drugOne,
                    drugTwo,
                    drugThree,
                    category,
                    nonSubstance,
                    gender,
                    optionValueArrays[i].theArray[j].optionValue,
                    doseMethod,
                    title,
                    authorSearch,
                    erowidAuthor,
                    language,
                    group,
                    strength,
                    intensityMin,
                    intensityMax);

            } else if (optionValueArrays[i].type == "dosemethod") {
                setupURL(drugOne,
                    drugTwo,
                    drugThree,
                    category,
                    nonSubstance,
                    gender,
                    context,
                    optionValueArrays[i].theArray[j].optionValue,
                    title,
                    authorSearch,
                    erowidAuthor,
                    language,
                    group,
                    strength,
                    intensityMin,
                    intensityMax);

            } else if (optionValueArrays[i].type == "intensity") {
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
                    optionValueArrays[i].theArray[j].optionValue,
                    optionValueArrays[i].theArray[j].optionValue);

            } else if (optionValueArrays[i].type == "genderselect") {
                setupURL(drugOne,
                    drugTwo,
                    drugThree,
                    category,
                    nonSubstance,
                    optionValueArrays[i].theArray[j].optionValue,
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

            }

            var url = "";

            for (var urlFields_index in urlFields) {
                if (urlFields.hasOwnProperty(urlFields_index)) {
                    url += urlFields[urlFields_index];
                }
            }

            url += "&ShowViews=0&Start=0&Max=" + pageSize;
            url_Entry.url = url;

            allURLS.push(url_Entry);

        }
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

        while (pos != -1) {

            var idArea = text.substring(pos, text.indexOf(">", pos));
            var idnum = idArea.substring(idArea.indexOf('=') + 1, idArea.indexOf('"'));

            if (!(idnum in reportArrays)) {
                
                //all the data for one report
                var reportArray_Entry = {
                    drugs: [],
                    category: [],
                    nonSubstance: [],
                    context: [],
                    doseMethod: [],
                    intensity: [],
                    gender: []
                };

                
                if (type == "drug") {
                    reportArray_Entry.drugs.push(itemName);
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

                //the indexOf checks are required so we don't duplicate entries
                //as we iterate through multiple pages
                if (type == "drug") {
                    if (reportArrays[idnum].drugs.indexOf(itemName) == -1)
                        reportArrays[idnum].drugs.push(itemName);
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
                $("#reportTable").append('<tr id="' + idnum + '"><td>' + idnum + '</td><td>' + reportArrays[idnum].drugs + '</td><td>' + reportArrays[idnum].category + '</td><td>' + reportArrays[idnum].nonSubstance + '</td><td>' + reportArrays[idnum].context + '</td><td>' + reportArrays[idnum].doseMethod + '</td><td>' + reportArrays[idnum].intensity + '</td><td>' + reportArrays[idnum].gender + '</tr>');

            });


            pos = text.indexOf('exp.php?ID', pos + 1);
        }
    }

    var urlIter = 0;
    getURL(urlIter);

    function getURL(iter) {
        //if we've iterated over all of them, stop
        if (iter >= allURLS.length) {
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
            //            var startEnd = url.indexOf("&Max");

            //            url = url.substring(startBegin, startEnd);

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