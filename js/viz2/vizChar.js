/*
Viz for categories
*/
require(['ErowidCategories','jquery'], function(ErowidCategories, $){

	var eevv = new ErowidCategories();

	var drugSel = eevv.getUrlParameter('drug');
	var profiles = JSON.parse(localStorage.getItem('profiles'));
	// var complete = JSON.parse(localStorage.getItem('complete'));

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
			//append line to table with drug, raw report count, percentage, and a bar of periods indicating its size
			$("#textViz").append(
				"<tr><td>" + 
				"<a href='vizChar.html?drug=" + drugSel+ "?cat=" + sorted[i][0] + "' id='link'>" + sorted[i][0] + "</a>" + 
				"</td><td>" + 
				sorted[i][1] + 
				"</td></tr>");
		}
});
