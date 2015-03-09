function collectRest() {

    var text = sourceCode;

    //get start and end of drug list
    var startPos = text.indexOf('name="S1"  >');
    var endPos = text.indexOf('</select>');

    //only want to search through this short interval
    text = text.substring(startPos, endPos);

    //for adding entires into the list of option values
    var OptionValues_Drugs_Entry = {
        drug: "",
        optionValue: "ff"
    };

    //get us near location of first option value
    var pos = text.indexOf('on value="');

    //from that index until where number would end, 
    //but before drug name would begin (pos + 13),
    //remove all characters besides numbers. this retrieves the option value.
    OptionValues_Drugs_Entry.optionValue = text.substring(pos, pos + 13).replace(/(^.+\D)(\d+)(\D.+$)/i, '$2');

    //store text between > and < brackets, from the position we're at.
    //this will be the drug name
    var drugText = text.substring(pos);
    drugText = drugText.substring(drugText.indexOf(">") + 1, drugText.indexOf("<"));

    //store the drug name in the entry
    OptionValues_Drugs_Entry.drug = drugText;

    //push the entry into the array
    OptionValues_Drugs.push(OptionValues_Drugs_Entry);

    //    console.log(OptionValues_Drugs_Entry.optionValue + " " + OptionValues_Drugs_Entry.drug + ", array index #: " +    OptionValues_Drugs.length);

    //bring us to the next place
    pos = text.indexOf('on value="', pos + 1);

    while (pos != -1) {
        //create a new entry varaible (otherwise it just overwrites every entry in the array)
        var OptionValues_Drugs_Entry = {
            drug: "",
            optionValue: "ff"
        };

        OptionValues_Drugs_Entry.optionValue = text.substring(pos, pos + 13).replace(/(^.+\D)(\d+)(\D.+$)/i, '$2');

        //store text between > and < brackets, from the position we're at.
        //this will be the drug name
        drugText = text.substring(pos);
        drugText = drugText.substring(drugText.indexOf(">") + 1, drugText.indexOf("<"));

        //store the drug name in the entry
        OptionValues_Drugs_Entry.drug = drugText;

        //push the entry into the array
        OptionValues_Drugs.push(OptionValues_Drugs_Entry);

        //        console.log(OptionValues_Drugs_Entry.optionValue + " " + OptionValues_Drugs_Entry.drug + ", array index #: " + OptionValues_Drugs.length);

        //find next location, but from the place we left off rather than the very beginning
        pos = text.indexOf('value="', pos + 1);
    }

    //code above is janky, so i have to remove the first two indexes,
    //which are junk
    OptionValues_Drugs.splice(0, 2);

    //        console.log(OptionValues_Drugs[34].drug + ": " + OptionValues_Drugs[34].optionValue + ", array length: " + OptionValues_Drugs.length);


    

    //for iterating through only most popular drugs
    var OptionValues_PopularDrugs_Entry = {drug: "Mushrooms",optionValue: "39"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Cannabis",optionValue: "1"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);



    
    
    
    var restOptionValues = {
        badtrip: 6,
        mystical: 9,
        addiction: 10,
        alone: 16,
        smallgroup: 17,
        largegroup: 19
    }

    fillUpTotals();


    function fillUpTotals() {
        var urlFields = []; //for constructing the URL
        var allURLS = []; //holds all the URLs we construct using the option values
        var badtripURLS = [];
        var mysticalURLS = [];
        var addictionURLS = [];
        var aloneURLS = [];
        var smallgroupURLS = [];
        var largegroupURLS = [];
        var result = []; //holds the IDs we get. we use the length to know amount of reports.

        //iterate through all the drugs
        //for (var i = 0; i < OptionValues_Drugs.length; i++) {

        //iterate through most popular drugs
        for (var i = 0; i < OptionValues_PopularDrugs.length; i++) {
//            var drugOne = OptionValues_Drugs[i].optionValue;
            var drugOne = OptionValues_PopularDrugs[i].optionValue;
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

            var drugTotalsListEntry = {
                drug: "",
                amount: 0,
                badtrip: 0,
                mystical: 0,
                addiction: 0,
                alone: 0,
                smallgroup: 0,
                largegroup: 0
            };

            drugTotalsListEntry.drug = OptionValues_Drugs[i].drug;

            drugTotalsList.push(drugTotalsListEntry);


            function setupURL(f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16) {
                urlFields = {
                    init: "https://www.erowid.org/experiences/exp.cgi?A=Search",
                    drugOne: "&S1=" + f1,
                    // rest: "&S2=-1&S3=-1&C1=-1&S4=-1&GenderSelect=-1&Context=\
                    // -1&DoseMethodID=-1&Title=&AuthorSearch=&A1=-1&Lang=1&Grou\
                    // p=-1&Str=&Intensity=&I2="
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

                url = "";

                for (var urlFields_index in urlFields) {
                    if (urlFields.hasOwnProperty(urlFields_index)) {
                        url += urlFields[urlFields_index];
                    }
                }

                url += "&ShowViews=0&Start=0&Max=99999";
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
            allURLS.push(url);



            setupURL(drugOne,
                drugTwo,
                drugThree,
                restOptionValues.badtrip,
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
            badtripURLS.push(url);

            setupURL(drugOne,
                drugTwo,
                drugThree,
                restOptionValues.mystical,
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
            mysticalURLS.push(url);

            setupURL(drugOne,
                drugTwo,
                drugThree,
                restOptionValues.addiction,
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
            addictionURLS.push(url);

            setupURL(drugOne,
                drugTwo,
                drugThree,
                category,
                nonSubstance,
                gender,
                restOptionValues.alone,
                doseMethod,
                title,
                authorSearch,
                erowidAuthor,
                language,
                group,
                strength,
                intensityMin,
                intensityMax);
            aloneURLS.push(url);

            setupURL(drugOne,
                drugTwo,
                drugThree,
                category,
                nonSubstance,
                gender,
                restOptionValues.smallgroup,
                doseMethod,
                title,
                authorSearch,
                erowidAuthor,
                language,
                group,
                strength,
                intensityMin,
                intensityMax);
            smallgroupURLS.push(url);

            setupURL(drugOne,
                drugTwo,
                drugThree,
                category,
                nonSubstance,
                gender,
                restOptionValues.largegroup,
                doseMethod,
                title,
                authorSearch,
                erowidAuthor,
                language,
                group,
                strength,
                intensityMin,
                intensityMax);
            largegroupURLS.push(url);


        } //end for loop

        //        console.log("allURLS length: " + allURLS.length);
        //        console.log("badtripURLS length: " + badtripURLS.length);
        //        console.log("mysticalURLS length: " + mysticalURLS.length);



        //iterator for recursive loop
        var thing = 0;
        gettotals(thing);


        function countReportsOfURL() {
            var text = sourceCode;

            result = [];

            var pos = text.indexOf('exp.php?ID');

            result.push(text.substring(pos, pos + 24).replace(/(^.+\D)(\d+)(\D.+$)/i, '$2'));


            while (pos != -1) {
                pos = text.indexOf('exp.php?ID', pos + 1);
                result.push(text.substring(pos, pos + 24).replace(/(^.+\D)(\d+)(\D.+$)/i, '$2'));

            }

            //this pop gets rid of last entry which ends
            //up being "<html><head><met" or something weird
            result.pop();

        }


        function gettotals(thang) {
            //if we've iterated over all of them, stop
            if (thang > allURLS.length) {
                console.log("totals filled");
                thing = 0;
                getbadtrips(thing);
                return;
            }

            //get the source for the search, count the reports, and shove them
            //with their appropriate drug in the drugTotalsList array
            getSource(allURLS[thang], function () {
                countReportsOfURL();

                drugTotalsList[thang].amount = result.length;

                //                console.log(drugTotalsList[thang].drug + " has " + drugTotalsList[thang].amount + " reports");
                console.log("allURLS: " + thing);
                thing++;
                gettotals(thing);

            });
        } //end gettotals



        function getbadtrips(thang) {
            //if we've iterated over all of them, stop
            if (thang > badtripURLS.length) {
                console.log("bad trips filled");
                thing = 0;
                getmystical(thing);
                return;
            }

            //get the source for the search, count the reports, and shove them
            //with their appropriate drug in the drugTotalsList array
            getSource(badtripURLS[thang], function () {
                countReportsOfURL();

                drugTotalsList[thang].badtrip = result.length;

                //                console.log(drugTotalsList[thang].drug + " has " + drugTotalsList[thang].amount + " reports, and " + drugTotalsList[thang].badtrip + " bad trip reports." /* + "source parse: " + thang + ". URL: " + allURLS[thang]*/ );
                console.log("badtripURLS: " + thing);
                thing++;
                getbadtrips(thing);

            });
        } //end getbadtrips




        function getmystical(thang) {
            //if we've iterated over all of them, stop
            if (thang > mysticalURLS.length) {
                console.log("mystical filled");
                thing = 0;
                getaddiction(thing);
                return;
            }

            //get the source for the search, count the reports, and shove them
            //with their appropriate drug in the drugTotalsList array
            getSource(mysticalURLS[thang], function () {
                countReportsOfURL();

                drugTotalsList[thang].mystical = result.length;

                //                console.log(drugTotalsList[thang].drug + " has " + drugTotalsList[thang].amount + " reports, and " + drugTotalsList[thang].badtrip + " bad trip reports, and " + drugTotalsList[thang].mystical + " mystical experience reports." /* + "source parse: " + thang + ". URL: " + allURLS[thang]*/ );
                console.log("mysticalURLS: " + thing);
                thing++;
                getmystical(thing);

            });
        } //end getmystical





        function getaddiction(thang) {
            //if we've iterated over all of them, stop
            if (thang > addictionURLS.length) {
                console.log("addiction filled");
                thing = 0;
                getalone(thing);
                return;
            }

            //get the source for the search, count the reports, and shove them
            //with their appropriate drug in the drugTotalsList array
            getSource(addictionURLS[thang], function () {
                countReportsOfURL();

                drugTotalsList[thang].addiction = result.length;

                //                console.log(drugTotalsList[thang].drug + " has " + drugTotalsList[thang].amount + " reports, and " + drugTotalsList[thang].badtrip + " bad trip reports, and " + drugTotalsList[thang].mystical + " mystical experience reports." /* + "source parse: " + thang + ". URL: " + allURLS[thang]*/ );
                console.log("addictionURLS: " + thing);
                thing++;
                getaddiction(thing);

            });
        } //end getaddiction



        function getalone(thang) {
            //if we've iterated over all of them, stop
            if (thang > aloneURLS.length) {
                console.log("alone filled");
                thing = 0;
                getsmallgroup(thing);
                return;
            }

            //get the source for the search, count the reports, and shove them
            //with their appropriate drug in the drugTotalsList array
            getSource(aloneURLS[thang], function () {
                countReportsOfURL();

                drugTotalsList[thang].alone = result.length;

                //                console.log(drugTotalsList[thang].drug + " has " + drugTotalsList[thang].amount + " reports, and " + drugTotalsList[thang].badtrip + " bad trip reports, and " + drugTotalsList[thang].mystical + " mystical experience reports." /* + "source parse: " + thang + ". URL: " + allURLS[thang]*/ );
                console.log("aloneURLS: " + thing);
                thing++;
                getalone(thing);

            });
        } //end getalone


        function getsmallgroup(thang) {
            //if we've iterated over all of them, stop
            if (thang > smallgroupURLS.length) {
                console.log("small group filled");
                thing = 0;
                getlargegroup(thing);
                return;
            }

            //get the source for the search, count the reports, and shove them
            //with their appropriate drug in the drugTotalsList array
            getSource(smallgroupURLS[thang], function () {
                countReportsOfURL();

                drugTotalsList[thang].smallgroup = result.length;

                //                console.log(drugTotalsList[thang].drug + " has " + drugTotalsList[thang].amount + " reports, and " + drugTotalsList[thang].badtrip + " bad trip reports, and " + drugTotalsList[thang].mystical + " mystical experience reports." /* + "source parse: " + thang + ". URL: " + allURLS[thang]*/ );
                console.log("smallgroupURLS: " + thing);
                thing++;
                getsmallgroup(thing);

            });
        } //end getsmallgroup


        function getlargegroup(thang) {
            //if we've iterated over all of them, stop
            if (thang > largegroupURLS.length) {
                console.log("large group filled");
                //                thing = 0;
                //                getlargegroup(thing);
                return;
            }

            //get the source for the search, count the reports, and shove them
            //with their appropriate drug in the drugTotalsList array
            getSource(largegroupURLS[thang], function () {
                countReportsOfURL();

                drugTotalsList[thang].largegroup = result.length;

                console.log(drugTotalsList[thang].drug + " has " + drugTotalsList[thang].amount + " reports, and " + drugTotalsList[thang].badtrip + " bad trip reports, and " + drugTotalsList[thang].mystical + " mystical experience reports." + drugTotalsList[thang].addiction + " addiction experience reports." + drugTotalsList[thang].alone + " alone experience reports." + drugTotalsList[thang].smallgroup + " small group experience reports." + drugTotalsList[thang].largegroup + " large group experience reports.");
                console.log("largegroupURLS: " + thing);
                thing++;
                getlargegroup(thing);

            });
        } //end getlargegroup

    } //end fillUpTotals()


}