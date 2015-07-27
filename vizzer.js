eevv.vizzer = function (profiles, drugTotalsArray, threshold) {
    
    //make chart
    $(document).ready(function () {
        var str = "";
        str += "<tr><td>Drug</td>"
        for (key in eevv.categories) {
            str += "<td>" + eevv.categories[key] + "</td>";
        }
        str += "</tr>";
        $("#outTable").append(str);
    });
    $(document).ready(function () {
        var str = "";
        
        //loop through drugTotalsArray so we can get most popular
        //drug at top and go in descending order
        for (var i = 0; i < drugTotalsArray.length; i++) {
            var drug = drugTotalsArray[i][0];
            
            //because drugs with counts of 0 will not be in profiles
            if (drug in profiles && profiles[drug]["total"] > threshold) {
                str += "<tr><td>" + drug + "</td>";
                for (key in eevv.categories) {
                    
                    //0s are appended manually because categories with
                    //a count of 0 are just not in the profiles data structure
                    if (eevv.categories[key] in profiles[drug]){
                        var percent = profiles[drug][eevv.categories[key]] / profiles[drug]["total"];
                        percent = (Math.round(percent * 1000)) / 10;
                        str += "<td>" + percent + "</td>";
                    }else{
                        str += "<td>" + "0" + "</td>";
                    }
                }
            }
        }
        str += "</tr>";
        $("#outTable").append(str);
    });
}