/*
namespace for Erowid Experience Vaults Visualization
*/

eevv = {
    //for storing and grabbing source code that the ajax
    //request gets in sourceGetter.js
    URLSource: "",
    recurseCount: 0,

    //holds all arrays that hold option values, as well
    //as their starting and ending points in the source code
    optionValueArrays: [],

    //final scraped data for reportScraper.js
    reportArrays: {},
    newComplete: {},

    groups: {
        categories: "categories",
        nonsubstances: "nonsubstances",
        gender: "gender",
        context: "context",
        method: "method",
        intensity: "intensity",
    },

    categories: {
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
    },

    categoriesTrimmed: {
        difficultExp: "Difficult Experiences",
        badTrip: "Bad Trips",
        healthProb: "Health Problems",
        trainWreck: "Train Wrecks & Trip Disasters",
        addiction: "Addiction & Habituation",
        glowing: "Glowing Experiences",
        mysticalExperiences: "Mystical Experiences",
        healthBenefits: "Health Benefits",
        medicalUse: "Medical Use",
        entities: "Entities / Beings",
        therapeutic: "Therapeutic Intent or Outcome",
        postTripProblems: "Post Trip Problems",
    },

    nonsubstances: {
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
    },

    gender: {
        male: "Male",
        female: "Female",
        notSpecified: "Not-Specified",
    },

    context: {
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
    },

    method: {
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
    },

    intensity: {
        noEffect: "No Effect",
        medium: "Medium",
        strong: "Strong",
        extreme: "Extreme",
    },

    readTextFile: function (file, callback) {
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
    },


    colorList: [
      "Pink",
"LightPink",
"HotPink",
"DeepPink",
"PaleVioletRed",
"MediumVioletRed",
"LightSalmon",
"Salmon",
"DarkSalmon",
"LightCoral",
"IndianRed",
"Crimson",
"FireBrick",
"DarkRed",
"Red",
"OrangeRed",
"Tomato",
"Coral",
"DarkOrange",
"Orange",
"Yellow",
"LightYellow",
"LemonChiffon",
"LightGoldenrodYellow",
"PapayaWhip",
"Moccasin",
"PeachPuff",
"PaleGoldenrod",
"Khaki",
"DarkKhaki",
"Gold",
"Cornsilk",
"BlanchedAlmond",
"Bisque",
"NavajoWhite",
"Wheat",
"BurlyWood",
"Tan",
"RosyBrown",
"SandyBrown",
"Goldenrod",
"DarkGoldenrod",
"Peru",
"Chocolate",
 "SaddleBrown",
"Sienna",
"Brown",
"Maroon",
"DarkOliveGreen",
"Olive",
 "OliveDrab",
 "YellowGreen",
 "LimeGreen",
 "Lime",
 "LawnGreen",
 "Chartreuse",
 "GreenYellow",
 "SpringGreen",
 "MediumSpringGreen",
 "LightGreen",
 "PaleGreen",
 "DarkSeaGreen",
 "MediumSeaGreen",
 "SeaGreen",
 "ForestGreen",
 "Green",
 "DarkGreen",
 "MediumAquamarine",
 "Aqua",
 "Cyan",
 "LightCyan",
 "PaleTurquoise",
 "Aquamarine",
 "Turquoise",
 "MediumTurquoise",
 "DarkTurquoise",
 "LightSeaGreen",
 "CadetBlue",
 "DarkCyan",
 "Teal",
 "LightSteelBlue",
 "PowderBlue",
 "LightBlue",
 "SkyBlue",
 "LightSkyBlue",
 "DeepSkyBlue",
 "DodgerBlue",
 "CornflowerBlue",
 "SteelBlue",
 "RoyalBlue",
 "Blue",
 "MediumBlue",
 "DarkBlue",
 "Navy",
 "MidnightBlue",
 "Lavender",
 "Thistle",
 "Plum",
 "Violet",
 "Orchid",
 "Fuchsia",
 "Magenta",
 "MediumOrchid",
 "MediumPurple",
 "BlueViolet",
 "DarkViolet",
 "DarkOrchid",
 "DarkMagenta",
 "Purple",
 "Indigo",
 "DarkSlateBlue",
 "SlateBlue",
 "MediumSlateBlue",
 "White",
 "Snow",
 "Honeydew",
 "MintCream",
 "Azure",
 "AliceBlue",
 "GhostWhite",
 "WhiteSmoke",
 "Seashell",
 "Beige",
 "OldLace",
 "FloralWhite",
 "Ivory",
 "AntiqueWhite",
 "Linen",
 "LavenderBlush",
 "MistyRose",
 "Gainsboro",
 "LightGray",
 "Silver",
 "DarkGray",
 "Gray",
 "DimGray",
 "LightSlateGray",
 "SlateGray",
 "DarkSlateGray",
 "Black"
    ],
};