/*
namespace for Erowid Experience Vaults Visualization
*/

eevv = {
    //for storing and grabbing source code that the ajax
    //request gets in sourceGetter.js
    URLSource: "",

    //holds all arrays that hold option values, as well
    //as their starting and ending points in the source code
    optionValueArrays: [],

    //final scraped data for reportScraper
    reportArrays: {},

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
        mystical: "Mystical Experiences",
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

    nonSubstances: {
        breathing: "Breathing",
        chanting: "Chanting",
        conferences: "Conferences",
        devices: "Devices",
        devicesMagnetic: "Devices - Magnetic",
        devicesMindMachine: "Devices - Mind Machine",
        dreams: "Dreams",
        drugTesting: "Drug Testing",
        endogenous: "Endogenous",
        families: "Families",
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

    genders: {
        male: "Male",
        female: "Female",
        notSpecified: "Not-Specified",
    },

    contexts: {
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

    methods: {
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
    
    intensities: {
        noEffect: "No Effect",
        medium: "Medium",
        strong: "Strong",
        extreme: "Extreme",
    }
};