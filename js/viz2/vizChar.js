require(['ErowidCategories','jquery'], function(ErowidCategories, $){



	//get a ?blah = bluh variable from the URL
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
    	}
	};

	var drugSel = getUrlParameter('drug');
	var profiles = JSON.parse(localStorage.getItem('profiles'));
	var eevv = new ErowidCategories();

	var catNums = {};
	console.log(profiles[drugSel]);	

	//loop over categories
	for(var cat in eevv.categoriesTrimmed){
		var catName = eevv.categoriesTrimmed[cat]; //e.g. "First Times"

		//if category is in profiles
		if(profiles[drugSel].hasOwnProperty(catName)){

			//add the number to caNums
			catNums[catName] = profiles[drugSel][catName];
		}
	}

	var sorted = eevv.sortObj(catNums, 'total');

	//title
	$("#textViz").append(
			"<center><tr><td>" + 
			drugSel + 
			"</td></tr></center>");

	for(var i = 0; i < sorted.length; i++){
			// var percent = (Math.round((sorted[i][1] / totalReports) * 1000) / 10);
			// var periodBar = "";

			// for(var j = 0; j < percent * 10; j++){
			// 	periodBar += ".";
			// }

			//append line to table with drug, raw report count, percentage, and a bar of periods indicating its size
			$("#textViz").append(
				"<tr><td>" + 
				// "<a href='vizChar.html?drug=" + sortedProfiles[i][0] +/* "?profiles=" + encodeURIComponent(profiles) +*/ "' id='link'>" + sortedProfiles[i][0] + "</a>" + 
				// "</td><td>" + 
				sorted[i][0] + 
				"</td><td>" + 
				sorted[i][1] + 
				// "</td><td>" +
				// percent + "%" + 
				// "</td><td>" + 
				// periodBar + 
				"</td></tr>");

		}
});
