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
    var OptionValues_PopularDrugs_Entry = {drug: "Salvia divinorum",optionValue: "44"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "MDMA",optionValue: "3"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "LSD",optionValue: "2"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "DXM",optionValue: "22"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Opiates",optionValue: "207"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Opioids",optionValue: "407"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Alcohol",optionValue: "61"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Cocaine",optionValue: "13"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Morning Glory",optionValue: "38"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "2C-I",optionValue: "172"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Harmala Alkaloids",optionValue: "76"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Amphetamines",optionValue: "6"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "DMT",optionValue: "18"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Methamphetamine",optionValue: "37"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Syrian Rue",optionValue: "45"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "H.B. Woodrose",optionValue: "26"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "5-MeO-DMT",optionValue: "58"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Ketamine",optionValue: "31"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "2C-E",optionValue: "137"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "5-MeO-DiPT",optionValue: "57"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "SSRIs",optionValue: "396"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Cacti",optionValue: "10"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Nitrous Oxide",optionValue: "40"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "AMT",optionValue: "7"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "NBOMe Series",optionValue: "539"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Nutmeg",optionValue: "41"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Kratom",optionValue: "203"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "2C-B",optionValue: "52"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Datura",optionValue: "15"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Diphenhydramine",optionValue: "109"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Oxycodone",optionValue: "176"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Benzodiazepines",optionValue: "434"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "2C-T-7",optionValue: "54"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Tramadol",optionValue: "149"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Ayahuasca",optionValue: "8"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Amanitas",optionValue: "5"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Caffeine",optionValue: "11"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "DPT",optionValue: "21"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Dimenhydrinate",optionValue: "17"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Heroin",optionValue: "27"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Hydrocodone",optionValue: "111"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Kava",optionValue: "30"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "2C-T-2",optionValue: "53"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Inhalants",optionValue: "29"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "GHB",optionValue: "25"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Zolpidem",optionValue: "143"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Codeine",optionValue: "14"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Mimosa spp.",optionValue: "393"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "25I-NBOMe",optionValue: "542"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Tobacco",optionValue: "47"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Methylone",optionValue: "255"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "AB-FUBINACA",optionValue: "628"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Spice and Synthetic Cannabinoids",optionValue: "472"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Cannabinoid Receptor Agonists",optionValue: "484"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Alprazolam",optionValue: "98"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Pharms - Methylphenidate",optionValue: "114"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "5-MeO-AMT",optionValue: "104"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Venlafaxine",optionValue: "191"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Bupropion",optionValue: "87"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Methoxetamine",optionValue: "527"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Anadenanthera spp.",optionValue: "284"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Paroxetine",optionValue: "148"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "4-AcO-DMT",optionValue: "387"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Piperazines",optionValue: "99"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "4-Methylmethcathinone",optionValue: "672"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Buprenorphine",optionValue: "265"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Absinthe",optionValue: "4"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Calea zacatechichi",optionValue: "97"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Tryptophan",optionValue: "138"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Valerian",optionValue: "48"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "25C-NBOMe",optionValue: "540"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "2C-C",optionValue: "262"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "JWH-018",optionValue: "483"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Lotus/Lily",optionValue: "399"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Clonazepam",optionValue: "125"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Diazepam",optionValue: "115"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Gabapentin",optionValue: "183"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Wormwood",optionValue: "50"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Quetiapine",optionValue: "273"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Poppies - Opium",optionValue: "43"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "MDA",optionValue: "34"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Methadone",optionValue: "166"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Brugmansia",optionValue: "84"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Banisteriopsis caapi",optionValue: "169"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "GBL",optionValue: "89"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "PCP",optionValue: "113"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Catnip",optionValue: "68"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "MDPV",optionValue: "377"};
    OptionValues_PopularDrugs.push(OptionValues_PopularDrugs_Entry);
    var OptionValues_PopularDrugs_Entry = {drug: "Morphine",optionValue: "211"};
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

            drugTotalsListEntry.drug = OptionValues_PopularDrugs[i].drug;

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
            if (thang >= allURLS.length) {
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
//                console.log("thing: " + thing + ", " + "allURLS.length: " + allURLS.length);
                gettotals(thing);
                

            });
        } //end gettotals



        function getbadtrips(thang) {
            //if we've iterated over all of them, stop
            if (thang >= badtripURLS.length) {
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
            if (thang >= mysticalURLS.length) {
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
            if (thang >= addictionURLS.length) {
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
            if (thang >= aloneURLS.length) {
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
            if (thang >= smallgroupURLS.length) {
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
            if (thang >= largegroupURLS.length) {
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