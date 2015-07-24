//option value scraping
function scrapeOptionValues() {
    scrapeAllOptionValues();
    printOptionValues();

    function scrapeAllOptionValues() {
        fillOptionValueArrays();
        for (var i = 0; i < scraperglobals.optionValueArrays.length; i++) {
            scrapeOptionValues(scraperglobals.optionValueArrays[i].begin,
                scraperglobals.optionValueArrays[i].end,
                scraperglobals.optionValueArrays[i].theArray);
        }
    }

    function fillOptionValueArrays() {
        var iter = -1;

        scraperglobals.optionValueArrays[++iter] = {
            type: "drug",
            begin: "S1",
            end: "S2",
            theArray: scraperglobals.OptionValues_Drugs = []
        };
        scraperglobals.optionValueArrays[++iter] = {
            type: "category",
            begin: "C1",
            end: "S4",
            theArray: scraperglobals.OptionValues_Category = []
        };
        scraperglobals.optionValueArrays[++iter] = {
            type: "nonsubstance",
            begin: "S4",
            end: "GenderSelect",
            theArray: scraperglobals.OptionValues_NonSubstance = []
        };
        scraperglobals.optionValueArrays[++iter] = {
            type: "genderselect",
            begin: "GenderSelect",
            end: "Context",
            theArray: scraperglobals.OptionValues_Gender = []
        };
        scraperglobals.optionValueArrays[++iter] = {
            type: "context",
            begin: "Context",
            end: "DoseMethodID",
            theArray: scraperglobals.OptionValues_Context = []
        };
        scraperglobals.optionValueArrays[++iter] = {
            type: "dosemethod",
            begin: "DoseMethodID",
            end: "A1",
            theArray: scraperglobals.OptionValues_DoseMethod = []
        };
        //    optionValueArrays[++iter] = {
        //    type: "author",
        //        begin: "A1",
        //        end: "Lang",
        //        theArray: OptionValues_Author = []
        //    };
        //    optionValueArrays[++iter] = {
        //    type: "language",
        //        begin: "Lang",
        //        end: "Group",
        //        theArray: OptionValues_Lang = []
        //    };
        scraperglobals.optionValueArrays[++iter] = {
            type: "intensity",
            begin: "Intensity",
            end: "I2",
            theArray: scraperglobals.OptionValues_Intensity = []
        };
    }


    function scrapeOptionValues(begin, end, dataDtructure) {
        var text = scraperglobals.URLSource;

        //get start and end of list
        var startPos = scraperglobals.URLSource.indexOf('select name="' + begin + '"');
        var endPos = scraperglobals.URLSource.indexOf('select name="' + end + '"');

        //only want to search through this short interval
        text = text.substring(startPos, endPos);


        //get us near location of first option value
        var pos = text.indexOf('value="');

        while (pos != -1) {
            //create a new entry varaible (otherwise it just overwrites every entry in the array)
            var OptionValues_Entry = {
                item: "",
                optionValue: "ff"
            };

            //get just the number
            //OptionValues_Entry.optionValue = text.substring(pos, pos + 13).replace(/(^.+\D)(\d+)(\D.+$)/i, '$2');

            //get the option value. this one gets between the quotes, to account
            //for option values that aren't numbers, such as gender select
            var valGet = text.substring(pos, pos + 13);
            valGet = valGet.substring(valGet.indexOf('"') + 1, valGet.indexOf('"', valGet.indexOf('"') + 1));
            OptionValues_Entry.optionValue = valGet;

            //store text between > and < brackets, from the position we're at.
            //this will be the item name
            itemText = text.substring(pos);
            itemText = itemText.substring(itemText.indexOf(">") + 1, itemText.indexOf("<"));

            //store the item name in the entry
            OptionValues_Entry.item = itemText;

            //check if it's one of those options like ------ ALL ------- which we don't want,
            //then push the entry into the array
            if (OptionValues_Entry.item.indexOf("----") == -1 &&
                OptionValues_Entry.item.indexOf("- - - -") == -1) {
                dataDtructure.push(OptionValues_Entry);
            }

            //find next location, but from the place we left off rather than the very beginning
            pos = text.indexOf('value="', pos + 1);
        }

    }

    function printOptionValues() {
        for (var i = 0; i < scraperglobals.optionValueArrays.length; i++) {
            printLoop(scraperglobals.optionValueArrays[i].theArray);
        }

    }

    function printLoop(dataStructure) {
        for (var i = 0; i < dataStructure.length; i++) {
            $(document).ready(function () {
                $("#outTable").append("<tr><td>" + dataStructure[i].item + "</td><td>" + dataStructure[i].optionValue + "</td></tr>");
            });
        }
    }
}