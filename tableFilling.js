function printOptionValues() {
    for(var i = 0; i < optionValueArrays.length; i++){
        printLoop(optionValueArrays[i].theArray);
    }

}

function printLoop(dataStructure){
    for (var i = 0; i < dataStructure.length; i++) {
        $(document).ready(function () {
            $("#outTable").append("<tr><td>" + dataStructure[i].item + "</td><td>" + dataStructure[i].optionValue + "</td></tr>");
        });
    }
    
}