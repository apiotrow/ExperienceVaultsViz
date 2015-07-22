//option value scraping

function scrapeAllOptionValues(){
    fillOptionValueArrays();
    for(var i = 0; i < optionValueArrays.length; i++){
        scrapeOptionValues(optionValueArrays[i].begin, optionValueArrays[i].end, optionValueArrays[i].theArray);
    }
}

function fillOptionValueArrays() {
    var iter = -1;
    
    optionValueArrays[++iter] = {
        type: "drug",
        begin: "S1",
        end: "S2",
        theArray: OptionValues_Drugs = []
    };
    optionValueArrays[++iter] = {
        type: "category",
        begin: "C1",
        end: "S4",
        theArray: OptionValues_Category = []
    };
    optionValueArrays[++iter] = {
        type: "nonsubstance",
        begin: "S4",
        end: "GenderSelect",
        theArray: OptionValues_NonSubstance = []
    };
    optionValueArrays[++iter] = {
        type: "genderselect",
        begin: "GenderSelect",
        end: "Context",
        theArray: OptionValues_Gender = []
    };
    optionValueArrays[++iter] = {
        type: "context",
        begin: "Context",
        end: "DoseMethodID",
        theArray: OptionValues_Context = []
    };
    optionValueArrays[++iter] = {
        type: "dosemethod",
        begin: "DoseMethodID",
        end: "A1",
        theArray: OptionValues_DoseMethod = []
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
    optionValueArrays[++iter] = {
        type: "intensity",
        begin: "Intensity",
        end: "I2",
        theArray: OptionValues_Intensity = []
    };
}


function scrapeOptionValues(begin, end, dataDtructure) {
    var text = URLSource; 

    //get start and end of list
    var startPos = URLSource.indexOf('select name="' + begin + '"');
    var endPos = URLSource.indexOf('select name="' + end +  '"');

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
        if(OptionValues_Entry.item.indexOf("----") == -1 &&
          OptionValues_Entry.item.indexOf("- - - -") == -1){
            dataDtructure.push(OptionValues_Entry);
        }

        //find next location, but from the place we left off rather than the very beginning
        pos = text.indexOf('value="', pos + 1);
    }

}