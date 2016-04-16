//holds names of categories

define("ErowidCategories", function() {

	return function ErowidCategories(){

		this.categoriesTrimmed = {
	        difficultExp: "Difficult Experiences",
	        badTrip: "Bad Trips",
	        healthProb: "Health Problems",
	        trainWreck: "Train Wrecks & Trip Disasters",
	        addiction: "Addiction & Habituation",
	        glowing: "Glowing Experiences",
	        mysticalExperiences: "Mystical Experiences",
	        family: "Families",
	        healthBenefits: "Health Benefits",
	        medicalUse: "Medical Use",
	        entities: "Entities / Beings",
	        therapeutic: "Therapeutic Intent or Outcome",
	        postTripProblems: "Post Trip Problems",
	        preggoBaby: "Pregnancy / Baby",
	        hppd: "HPPD / Lasting Visuals",
	        overdose: "Overdose",
	        lossOfMagic: "Loss of Magic",
	        depression: "Depression",
	        nature: "Nature / Outdoors",
	        cultivationSynthesis: "Cultivation / Synthesis",
	        multidayExperience: "Multi-Day Experience",
	        poetry: "Poetry",
	        personalPrep: "Personal Preparation",
	        relationships: "Relationships",
	        sexDiscussion: "Sex Discussion",
	    };

	    this.groups = {
	        categories: "categories",
	        nonsubstances: "nonsubstances",
	        gender: "gender",
	        context: "context",
	        method: "method",
	        intensity: "intensity",
	        author: "author",
	        date: "date",
	        drugs: "drugs",
	        title: "title",
	        views: "views"
    	};

    	this.categories = {
	        firstTimes: "First Times",
	        general: "General",
	        retroSum: "Retrospective / Summary",
	        prepAndRecipes: "Preparation / Recipes",
	        difficultExp: "Difficult Experiences",
	        badTrip: "Bad Trips",
	        healthProb: "Health Problems",
	        trainWreck: "Train Wrecks & Trip Disasters",
	        addiction: "Addiction & Habituation",
	        glowing: "Glowing Experiences",
	        mysticalExperiences: "Mystical Experiences",
	        healthBenefits: "Health Benefits",
	        family: "Families",
	        medicalUse: "Medical Use",
	        whatWasInthat: "What Was in That?",
	        secondHandReport: "Second Hand Report",
	        entities: "Entities / Beings",
	        therapeutic: "Therapeutic Intent or Outcome",
	        personalPrep: "Personal Preparation",
	        preggoBaby: "Pregnancy / Baby",
	        sitters: "Guides / Sitters",
	        hppd: "HPPD / Lasting Visuals",
	        overdose: "Overdose",
	        video: "Video",
	        performanceEnh: "Performance Enhancement",
	        lossOfMagic: "Loss of Magic",
	        depression: "Depression",
	        postTripProblems: "Post Trip Problems",
	        musicDiscussion: "Music Discussion",
	        nature: "Nature / Outdoors",
	        cultivationSynthesis: "Cultivation / Synthesis",
	        multidayExperience: "Multi-Day Experience",
	        poetry: "Poetry",
	        relationships: "Relationships",
	        hangover: "Hangover / Days After",
	        sexDiscussion: "Sex Discussion",
    	};
    	this.nonsubstances = {
	        breathing: "Breathing",
	        chanting: "Chanting",
	        conferences: "Conferences",
	        devices: "Devices",
	        devicesMagnetic: "Devices - Magnetic",
	        devicesMindMachine: "Devices - Mind Machine",
	        dreams: "Dreams",
	        drugTesting: "Drug Testing",
	        endogenous: "Endogenous",
	        fasting: "Fasting",
	        floatationTank: "Floatation Tank",
	        guiding: "Guiding",
	        humor: "Humor",
	        hyperventilation: "Hyperventilation",
	        meditation: "Meditation",
	        migranes: "Migraines",
	        mindfulness: "Mindfulness",
	        music: "Music",
	        nitrogenNarcosis: "Nitrogen Narcosis",
	        obe: "OBE",
	        policeAndCustoms: "Police / Customs",
	        ritual: "Ritual",
	        sleepDeprivation: "Sleep Deprivation",
	        soundNonMusic: "Sound (non-music)",
	        sweating: "Sweating",
	        yogaAndBodyWork: "Yoga / Bodywork",
    	};

	    this.gender = {
	        male: "Male",
	        female: "Female",
	        notSpecified: "Not-Specified",
	    };

	    this.context = {
	        alone: "Alone",
	        smallGroup: "Small Group (2-9)",
	        largeGroup: "Large Group (10+)",
	        clubBar: "Club / Bar",
	        raveDanceEvent: "Rave / Dance Event",
	        largeParty: "Large Party",
	        festivalLargeCrowd: "Festival / Lg. Crowd",
	        groupCeremony: "Group Ceremony",
	        school: "School",
	        workplace: "Workplace",
	        military: "Military",
	        hospital: "Hospital",
	        various: "Various",
	        unknown: "Unknown Context",
	        publicSpace: "Public Space (Museum, Park, etc)",
	        notApplicable: "Not Applicable",
	    };

	    this.method = {
	        oral: "oral",
	        smoked: "smoked",
	        inhaled: "inhaled",
	        vaporized: "vaporized",
	        insufflated: "insufflated",
	        im: "IM",
	        iv: "IV",
	        sublingual: "sublingual",
	        sc: "SC",
	        rectal: "rectal",
	        transdermal: "transdermal",
	        vaginal: "vaginal",
	        buccal: "buccal",
	        ocular: "ocular",
	    };

	    this.intensity = {
	        noEffect: "No Effect",
	        medium: "Medium",
	        strong: "Strong",
	        extreme: "Extreme",
	    };

	    this.readTextFile = function (file, callback) {
	        var rawFile = new XMLHttpRequest();
	        rawFile.open("GET", file, false);
	        rawFile.onreadystatechange = function () {
	            if (rawFile.readyState === 4) {
	                if (rawFile.status === 200 || rawFile.status == 0) {
	                    callback(rawFile.responseText);
	                }
	            }
	        }
	        rawFile.send(null);
    	};

    	this.setCookie = function(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toUTCString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		};

		this.getCookie = function (cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		    }
		    return "";
		};

		//sorts an object by a particular numeric property of the object
		this.sortObjByProperty = function(obj, property)
		{
		  	//convert object into array
			var sortable=[];
			for(var key in obj)
				if(obj.hasOwnProperty(key))
			   		sortable.push([key, obj[key][property]]); // each item is an array in format [key, value]

			//sort items by value
			sortable.sort(function(a, b){
				return b[1]-a[1]; // compare numbers
			});
			return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
		};

		//sorts an object by a particular numeric property of the object
		this.sortObj = function(obj)
		{
		  	//convert object into array
			var sortable=[];
			for(var key in obj)
				if(obj.hasOwnProperty(key))
			   		sortable.push([key, obj[key]]); // each item is an array in format [key, value]

			//sort items by value
			sortable.sort(function(a, b){
				return b[1]-a[1]; // compare numbers
			});
			return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
		};

		//get a ?blah = bluh variable from the URL
		this.getUrlParameter = function getUrlParameter(sParam) {
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

		//check if thing is an object or just a value
	    this.isObject = function(obj) {
	        return obj === Object(obj);
	    }
	};
});