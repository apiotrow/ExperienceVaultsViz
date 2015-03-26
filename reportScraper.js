function scrapeReports() {



    var urlFields = []; //for constructing the URL
    //    var numURLFields = 16;

    var drugOne = -1;
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

    var prevIdnum;

    resetURL();

    function resetURL() {
        urlFields = [];
        var iter = -1;

        //put all in their non-selected state
        urlFields[++iter] = -1; //[0] = drugOne
        urlFields[++iter] = -1; //[0] = drugTwo
        urlFields[++iter] = -1; //[0] = drugThree
        urlFields[++iter] = -1; //[0] = category
        urlFields[++iter] = -1; //[0] = nonSubstance
        urlFields[++iter] = -1; //[0] = gender
        urlFields[++iter] = -1; //[0] = context
        urlFields[++iter] = -1; //[0] = doseMethod
        urlFields[++iter] = ""; //[0] = title
        urlFields[++iter] = ""; //[0] = authorSearch
        urlFields[++iter] = -1; //[0] = erowidAuthor
        urlFields[++iter] = 1; //[0] = language
        urlFields[++iter] = -1; //[0] = group
        urlFields[++iter] = ""; //[0] = strength
        urlFields[++iter] = ""; //[0] = intensityMin
        urlFields[++iter] = ""; //[0] = intensityMax


        drugOne = -1;
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
    var badtripURLS = [];
    var mysticalURLS = [];
    var addictionURLS = [];
    var aloneURLS = [];
    var smallgroupURLS = [];
    var largegroupURLS = [];
    var result = []; //holds the IDs we get. we use the length to know amount of reports.


    for (var i = 0; i < optionValueArrays.length; i++) {

        for (var j = 0; j < optionValueArrays[i].theArray.length; j++) {
            if (j > 4) break;

            var url = [];
            var url_Entry = {
                url: "",
                itemName: ""
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


            for (var urlFields_index in urlFields) {
                if (urlFields.hasOwnProperty(urlFields_index)) {
                    url_Entry.url += urlFields[urlFields_index];
                }
            }

            url_Entry.url += "&ShowViews=0&Start=0&Max=99999";

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

    function parseSource(itemName) {
        var text = URLSource;

        var pos = text.indexOf('exp.php?ID');

        while (pos != -1) {

            var idArea = text.substring(pos, text.indexOf(">", pos));
            var idnum = idArea.substring(idArea.indexOf('=') + 1, idArea.indexOf('"'));

            if (!(idnum in reportArrays)) {
                var reportArray_Entry = {
                    drugs: []
                };
                reportArray_Entry.drugs.push(itemName);
                reportArrays[idnum] = reportArray_Entry;

            } else {
                reportArrays[idnum].drugs.push(itemName);
            }

            $(document).ready(function () {
                $("#" + idnum).remove(); //if entry in table exists, replace it with new one

                $("#reportTable").append('<tr id="' + idnum + '"><td>' + idnum + '</td><td>' + reportArrays[idnum].drugs + '</td></tr>');

            });

            prevIdnum = idnum;

            pos = text.indexOf('exp.php?ID', pos + 1);
        }
    }

    var urlIter = 0;
    getURL(urlIter);

    function getURL(iter) {
        //if we've iterated over all of them, stop
        if (iter >= allURLS.length) {
            console.log("scraping done");
            return;
        }

        //get the source for the search, count the reports, and shove them
        //with their appropriate drug in the drugTotalsList array
        //        console.log(allURLS.length);
        console.log(allURLS[iter].itemName);
        getSourceCode(allURLS[iter].url, function () {

            parseSource(allURLS[iter].itemName); //send in item name

            urlIter++;
            getURL(urlIter);

        });
    }

}