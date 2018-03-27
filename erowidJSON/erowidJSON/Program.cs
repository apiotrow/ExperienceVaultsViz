using System;
using System.IO;
using System.Linq.Expressions;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Microsoft.CSharp;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;

namespace erowidJSON
{
	class MainClass
	{
		public class MyConverter : CustomCreationConverter<IDictionary<string, object>>
		{

			public override IDictionary<string, object> Create(Type objectType)
			{
				return new Dictionary<string, object>();
			}

			public override bool CanConvert(Type objectType)
			{
				// in addition to handling IDictionary<string, object>
				// we want to handle the deserialization of dict value
				// which is of type object
				return objectType == typeof(object) || base.CanConvert(objectType);
			}

			public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
			{
				if (reader.TokenType == JsonToken.StartObject
					|| reader.TokenType == JsonToken.Null)
					return base.ReadJson(reader, objectType, existingValue, serializer);

				// if the next token is not an object
				// then fall back on standard deserializer (strings, numbers etc.)
				return serializer.Deserialize(reader);
			}
		
		}

		//compute permutations of a list of stuff, with length being length
		//of each permutation
		static IEnumerable<IEnumerable<T>>
		GetPermutations<T>(IEnumerable<T> list, int length)
		{
			if (length == 1) return list.Select(t => new T[] { t });

			return GetPermutations(list, length - 1)
				.SelectMany(t => list.Where(e => !t.Contains(e)),
					(t1, t2) => t1.Concat(new T[] { t2 }));
		}

		//gets name of variable as a string
		public static class MemberInfoGetting
		{
			public static string GetMemberName<T>(Expression<Func<T>> memberExpression)
			{
				MemberExpression expressionBody = (MemberExpression)memberExpression.Body;
				return expressionBody.Member.Name;
			}
		}

		public static void DicToJSON(Dictionary<string, Dictionary<string, Dictionary<string, Dictionary<string, double>>>> info, string fileName){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/" + fileName, json);
		}

		public static void DicToJSON(Dictionary<string, Dictionary<string, Dictionary<string, double>>> info, string fileName){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/" + fileName, json);
		}

		public static void DicToJSON(Dictionary<string, Dictionary<string, double>> info, string fileName){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/" + fileName, json);
		}

		public static void DicToJSON(Dictionary<string,double> info, string fileName){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/" + fileName, json);
		}

		public static void Main (string[] args)
		{


//			dynamic stuff = JsonConvert.DeserializeObject(File.ReadAllText(@"JSONS/context_gender.json"));
//			dynamic stuff = JsonConvert.DeserializeObject(File.ReadAllText(@"JSONS/path.json"));
//			dynamic stuff = JsonConvert.DeserializeObject(File.ReadAllText(@"JSONS/complete.json"));

//			Console.WriteLine(stuff);

			var json = File.ReadAllText(@"JSONS/combinedComplete.json");
			IDictionary<string, IDictionary<string, string>> complete = 
				JsonConvert.DeserializeObject<IDictionary<String, IDictionary<String, String>>>(json);
			

			Dictionary<string, List<string>> allGroups = new Dictionary<string, List<string>>{
				{"drug", new List<string>{
					"1,4-Butanediol",
					"19-Norandrostenedione",
					"1P-ETH-LAD",
					"1P-LSD",
					"2'-Oxo-PCE",
					"2-Aminoindan",
					"2-Fluoroamphetamine",
					"2-Fluoromethamphetamine",
					"2-hydroxycocaine",
					"2-Me-DMT",
					"2-Methyl-2-Butanol",
					"25B-NBOH",
					"25B-NBOMe",
					"25C-NBOMe",
					"25D-NBOMe",
					"25G-NBOMe",
					"25I-NBOH",
					"25I-NBOMe",
					"2C-B",
					"2C-B-Fly",
					"2C-C",
					"2C-D",
					"2C-E",
					"2C-EF",
					"2C-G-N",
					"2C-H",
					"2C-I",
					"2C-N",
					"2C-P",
					"2C-T-13",
					"2C-T-2",
					"2C-T-21",
					"2C-T-4",
					"2C-T-7",
					"2C-TFM",
					"3,4-Dichloromethylphenidate",
					"3-Fluoroamphetamine",
					"3-MEO-PCE",
					"3-MeO-PCMo",
					"3-MeO-PCP",
					"3-Methylmethcathinone",
					"3C-B",
					"3C-E",
					"3C-P",
					"3F-Phenmetrazine",
					"4-AcO-DALT",
					"4-AcO-DET",
					"4-AcO-DiPT",
					"4-AcO-DMT",
					"4-AcO-DPT",
					"4-AcO-EIPT",
					"4-AcO-MET",
					"4-AcO-MiPT",
					"4-Chloroethcathinone",
					"4-Chloromethcathinone",
					"4-Ethylmethcathinone",
					"4-Fluoroamphetamine",
					"4-Fluorobutyrfentanyl",
					"4-Fluorococaine",
					"4-Fluoromethamphetamine",
					"4-Fluoromethcathinone",
					"4-Fluoromethylphenidate",
					"4-HO-DET",
					"4-HO-DiPT",
					"4-HO-DPT",
					"4-HO-MET",
					"4-HO-MiPT",
					"4-HO-MPT",
					"4-MeO-DMT",
					"4-MeO-MiPT",
					"4-MeO-PCP",
					"4-Methoxymethcathinone",
					"4-Methylaminorex",
					"4-Methylethcathinone",
					"4-Methylmethcathinone",
					"4-MTA",
					"5-APB",
					"5-APDB",
					"5-IT",
					"5-MAPB",
					"5-MeO-AET",
					"5-MeO-AMT",
					"5-MeO-BFE",
					"5-MeO-DALT",
					"5-MeO-DET",
					"5-MeO-DiBF",
					"5-MeO-DiPT",
					"5-MeO-DMT",
					"5-MeO-DPT",
					"5-MeO-EIPT",
					"5-MeO-MIPT",
					"5-MeO-TMT",
					"5-Methoxy-Tryptamine",
					"5-Methyl-MDA",
					"5F-AKB48",
					"6-APB",
					"6-APDB",
					"6-MAPB",
					"7-Hydroxy-Mytragynine",
					"a-PVP",
					"AB-CHMINACA",
					"AB-FUBINACA",
					"Absinthe",
					"Acacia",
					"Acacia confusa",
					"Acetaminophen",
					"Acetildenafil",
					"Acetylfentanyl",
					"Aconitum napellus",
					"Adrafinil",
					"Adrenochrome",
					"AET",
					"AH-7921",
					"AL-LAD",
					"Albizia julibrissin",
					"Alcohol",
					"ALD-52",
					"Aleph-4",
					"Allylescaline",
					"Aloes",
					"alpha-PHP",
					"AlphaStim100",
					"AM-DIPT",
					"Amanitas",
					"AMB-FUBINACA",
					"Amphetamines",
					"Amphetamines - Substituted",
					"AMT",
					"Anadenanthera spp.",
					"Animals",
					"Animals - Black Widow Spider",
					"Animals - Frogs",
					"Aniracetam",
					"Anise",
					"Argemone spp.",
					"Ariadne",
					"Armodafinil",
					"Arundo donax",
					"Ashwagandha",
					"Aspirin",
					"Ayahuasca",
					"Bacopa monnieri",
					"Bad/Suspect Ecstasy",
					"Banisteriopsis caapi",
					"Banisteriopsis muricata",
					"Barbital",
					"Barbiturates",
					"BDB",
					"Bee",
					"Belladonna",
					"Benzodiazepines",
					"Betel Nut",
					"Biperiden",
					"Bismuth Subsalicylate",
					"BK-2C-B",
					"bk-DMDBD",
					"bk-MBDB",
					"bk-MDDMA",
					"bk-MDEA",
					"Black Cohosh",
					"Blue Lily",
					"BOD",
					"BOHB",
					"Boophone disticha",
					"Borage",
					"Bromazepam",
					"Bromo-Dragonfly",
					"Brugmansia",
					"Brunfelsia",
					"Bryonia",
					"Bufotenin",
					"Butalbital",
					"BZ",
					"Cacahuaxochitl",
					"Cacao",
					"Cacti",
					"Caffeine",
					"Calamus",
					"Calea zacatechichi",
					"Cannabidiol",
					"Cannabinoid Receptor Agonists",
					"Cannabis",
					"Cannabis - High CBD",
					"Cannabis - High THC",
					"Capsaicin",
					"Capsicum spp.",
					"Carbidopa",
					"Carbogen",
					"Casimiroa edulis",
					"Catha edulis",
					"Cathinone",
					"Catnip",
					"Catuaba",
					"Cerebrolysin",
					"Cestrum spp.",
					"Chamomile",
					"Cheese - Blue",
					"Chloral Hydrate",
					"Chloroform",
					"Chlorpheniramine Maleate",
					"Chocolate",
					"Citicoline",
					"Clenbuterol",
					"Clonazolam",
					"Cloves",
					"Clozapine",
					"Coca",
					"Cocaine",
					"Codeine",
					"Coleus",
					"CP 47,497",
					"CP 55,940",
					"Cranial Electrotherapy Stimulation",
					"Cytisus scoparius",
					"Damiana",
					"Datura",
					"Deschloroketamine",
					"Desfontainia spinosa",
					"Desfontainia spp.",
					"Desloratadine",
					"Desmanthus illinoensis",
					"Desomorphine",
					"Desoxypipradrol",
					"DET",
					"DHEA",
					"Diclazepam",
					"Dimenhydrinate",
					"Dimethocaine",
					"Dioscorea spp.",
					"Diphenhydramine",
					"Diphenidine",
					"Diphenoxylate",
					"Diphenyl-2-pyrrolidinemethanol",
					"Diplopterys cabrerana",
					"DiPT",
					"Dizocilpine",
					"DMAE",
					"DMMDA",
					"DMT",
					"DOB",
					"DOC",
					"DOET",
					"DOI",
					"DOM",
					"DON",
					"Donepezil",
					"DOPR",
					"DPT",
					"DXM",
					"DXO",
					"Echinacea",
					"Entada rheedii",
					"Ephedra sinica",
					"Ephedrine",
					"Ephenidine",
					"Epimedium spp.",
					"Ergot",
					"Erythrina mulungu",
					"Erythroxylum novogranatense",
					"Escaline",
					"Etaqualone",
					"ETH-LAD",
					"Ether",
					"Ethylcathinone",
					"Ethylene",
					"Ethylphenidate",
					"Etizolam",
					"Eyebright",
					"Flubromazolam",
					"Foxglove",
					"GABA",
					"GABOB",
					"Galangal",
					"Galantamine",
					"Gamma-Crotonolactone",
					"Garlic",
					"GBL",
					"GHB",
					"GHV",
					"Ginger",
					"Ginkgo biloba",
					"Ginseng",
					"Glaucine",
					"Gotu Kola",
					"Guanfacine",
					"Guarana",
					"GVL",
					"H.B. Woodrose",
					"Halothane",
					"Harmala Alkaloids",
					"Harmaline",
					"Harmine",
					"HDMP-28",
					"Heimia myrtifolia",
					"Heimia salicifolia",
					"Herbal Ecstasy",
					"Heroin",
					"Hops",
					"Horseradish",
					"HOT-17",
					"HOT-2",
					"HOT-7",
					"Huasca - Misc Combo",
					"Huperzine",
					"Hydergine",
					"Hydrangea",
					"Hydrocodone",
					"Hydromorphone",
					"Hydroxyzine",
					"Hyoscyamine",
					"Hyoscyamus niger",
					"Hypocretin",
					"IAP",
					"Ibogaine",
					"Idebenone",
					"Ilex guayusa",
					"Indian Warrior",
                    "Inhalants",
                    "Inhalants - Nitrites",
					"Isopropylphenidate",
					"JB-336",
					"Jojoba",
					"JWH-018",
					"JWH-019",
					"JWH-073",
					"JWH-081",
					"JWH-122",
					"JWH-200",
					"JWH-210",
					"JWH-250",
					"Kava",
					"Ketamine",
					"Kola Nut",
					"Kratom",
					"L-DOPA",
					"Lactuca spp.",
					"Lady's Slipper",
					"Lagochilus inebrians",
					"Lavandula spp.",
					"Lecithin",
					"Lemon Balm",
					"Leonotis leonurus",
					"Leonotis nepetaefolia",
					"Leonurus cardiaca",
					"Leonurus sibiricus",
					"Levamisole",
					"Levmetamfetamine",
					"Licorice Root",
					"Lisdexamfetamine",
					"Lobelia spp.",
					"Lofepramine",
					"Loperamide",
					"Loratadine",
					"Lorcaserin",
					"Lotus/Lily",
					"LSA",
					"LSA - Other",
					"LSD",
					"LSM-775",
					"LSZ",
					"Mandrake",
					"MAOI",
					"MBDB",
					"MDA",
					"MDAI",
					"MDE",
					"MDMA",
					"MDMB-CHMICA",
					"MDOH",
					"MDPR",
					"MDPV",
					"Melatonin",
					"MEM",
					"Mescaline",
					"MET",
					"Metaxalone",
					"Methadone",
					"Methallylescaline",
					"Methamphetamine",
					"Methaqualone",
					"Methcathinone",
					"Methiopropamine",
					"Methocarbamol",
					"Methoxetamine",
					"Methoxphenidine",
					"Methoxyketamine",
					"Methylbenzylpiperazine",
					"Methylmethaqualone",
					"Methylone",
					"Metoprolol",
					"Mexedrone",
					"Milk Thistle",
					"Mimosa spp.",
					"MIPT",
					"Miracle Berry",
					"MMDA",
					"MMDA-3a",
					"Moclobemide",
					"Modafinil",
					"Monotropa uniflora",
					"Morning Glory",
					"Morphine",
					"MPTP",
					"MSM",
					"MT-45",
					"Mucuna pruriens",
					"Mugwort",
					"Mulberry",
					"Mullein",
					"Mushrooms",
					"Myrrh",
					"Mytragynine",
					"N-Ethylhexedrone",
					"N-Ethylnorketamine",
					"Nabilone",
					"Naloxone",
					"Naltrexone",
					"Naproxen",
					"Napthylpyrovalerone",
					"NBOH Series",
					"NBOMe Series",
					"Nicotine",
					"Nightshade",
					"Nimetazepam",
					"Nitric Oxide",
					"Nitrous Oxide",
					"NMDA Antagonists",
					"Noopept",
					"Nootka Lupine",
					"Nutmeg",
					"Ondansetron",
                    "Opiates",
                    "Opioids",
                    "Opium",
					"Orphenadrine",
					"Oxandrolone",
					"Oxcarbazepine",
					"Oxygen",
					"Oxytocin",
					"Passion Flower",
					"PCP",
					"Pedicularis spp.",
					"Pennyroyal",
					"Pentedrone",
					"Pentylone",
					"Periwinkle",
					"Petroleum Ether",
					"Peyote",
					"Phalaris Grass",
					"Pharmaceuticals",
					"Pharms - Dexmethylphenidate",
					"Pharms - Albuterol",
					"Pharms - Alprazolam",
					"Pharms - Amitriptyline",
					"Pharms - Antibiotics",
					"Pharms - Aripiprazole",
					"Pharms - Atenolol",
					"Pharms - Atomoxetine",
					"Pharms - Baclofen",
					"Pharms - Benzphetamine",
					"Pharms - Buprenorphine",
					"Pharms - Bupropion",
					"Pharms - Buspirone",
					"Pharms - Butorphanol",
					"Pharms - Carbamazepine",
					"Pharms - Carisoprodol",
					"Pharms - Chlordiazepoxide",
					"Pharms - Chlorpromazine",
					"Pharms - Citalopram",
					"Pharms - Clonazepam",
					"Pharms - Clonidine",
					"Pharms - Corticosteroid",
					"Pharms - Cyclizine",
					"Pharms - Cyclobenzaprine",
					"Pharms - Diazepam",
					"Pharms - Dihydrocodeine",
					"Pharms - Divalproex",
					"Pharms - Doxepin",
					"Pharms - Doxycycline",
					"Pharms - Doxylamine",
					"Pharms - Escitalopram",
					"Pharms - Ethylmorphine",
					"Pharms - Fenfluramine",
					"Pharms - Fentanyl",
					"Pharms - Flunitrazepam",
					"Pharms - Fluoxetine",
					"Pharms - Flurazepam",
					"Pharms - Fluvoxamine",
					"Pharms - Gabapentin",
					"Pharms - Haloperidol",
					"Pharms - Hydroxyzine",
					"Pharms - Ketobemidone",
					"Pharms - Lamotrigine",
					"Pharms - Levofloxacin",
					"Pharms - Levorphanol",
					"Pharms - Levothyroxine",
					"Pharms - Lidocaine",
					"Pharms - Lithium",
					"Pharms - Lorazepam",
					"Pharms - Meclizine",
					"Pharms - Mefloquine",
					"Pharms - Memantine",
					"Pharms - Meperidine",
					"Pharms - Meprobamate",
					"Pharms - Metaxalone",
					"Pharms - Methotrimeprazine",
					"Pharms - Methylphenidate",
					"Pharms - Midazolam",
					"Pharms - Mirtazapine",
					"Pharms - Nalbuphine",
					"Pharms - Nortriptyline",
					"Pharms - Olanzapine",
					"Pharms - Oxycodone",
					"Pharms - Oxymorphone",
					"Pharms - Paroxetine",
					"Pharms - Perazine",
					"Pharms - Phenazepam",
					"Pharms - Phenelzine",
					"Pharms - Phentermine",
					"Pharms - Phenylephrine",
					"Pharms - Phenytoin",
					"Pharms - Prednisone",
					"Pharms - Pregabalin",
					"Pharms - Procaine",
					"Pharms - Procyclidine",
					"Pharms - Promethazine",
					"Pharms - Propofol",
					"Pharms - Propoxyphene",
					"Pharms - Propranolol",
					"Pharms - Propylhexedrine",
					"Pharms - Quetiapine",
					"Pharms - Reboxetine",
					"Pharms - Risperidone",
					"Pharms - Selegeline",
					"Pharms - Sertraline",
					"Pharms - Sildenafil",
					"Pharms - Temazepam",
					"Pharms - Thiothixene",
					"Pharms - Tiagabine",
					"Pharms - Tianeptine",
					"Pharms - Tiletamine",
					"Pharms - Topiramate",
					"Pharms - Tramadol",
					"Pharms - Trazodone",
					"Pharms - Triazolam",
					"Pharms - Valproate",
					"Pharms - Valproic Acid",
					"Pharms - Venlafaxine",
					"Pharms - Warfarin",
					"Pharms - Zaleplon",
					"Pharms - Ziprasidone",
					"Pharms - Zolazepam",
					"Pharms - Zolpidem",
					"Pharms - Zopiclone",
					"Phendimetrazine",
					"Phenethylamine",
					"Phenethylamines - Other",
					"Phenylalanine",
					"Phosphatidylserine",
					"Phyllomedusa bicolor",
					"Picamilon",
					"Pinoline",
					"Piperazines",
					"Piperazines - MeOPP",
					"Piperazines - pFPP",
					"Piracetam",
					"Pituri",
					"Placebo",
					"PMA",
					"PMMA",
					"Poppies - California",
					"Poppies - Opium",
					"Pramipexole",
					"Pramiracetam",
					"Prazosin",
					"PRL-8-53",
					"Prochlorperazine",
					"Products - Bath Salts, Plant Food, etc",
					"Products - Other",
					"Products - Smoking Blends - Cannabis-Like",
					"Products - Spice and Synthetic Cannabinoids",
					"Prolintane",
					"Propofol",
					"Pseudoephedrine",
					"Psilocin",
					"Psilocybin",
					"Psychotria viridis",
					"Pyrazolam",
					"Red Rock",
					"Rhodiola rosea",
					"Ritonavir",
					"Sakae Naa",
					"Salvia apiana",
					"Salvia divinorum",
					"Salvia officinalis",
					"Salvinorin A",
					"Salvinorin B",
					"Salvinorin B Ethoxymethyl Ether",
					"SAMe",
					"Sassafras",
					"Sceletium tortuosum",
					"Scopolamine",
					"Silene capensis",
					"Skullcap",
					"Smarts - Oxiracetam",
					"Smarts - Phenibut",
					"Sophora secundiflora",
					"Spearmint",
                    "SSRIs",
                    "St. John's Wort",
                    "Steroids",
                    "Stimulants",
                    "Stipa robusta",
					"Sumatriptan",
					"Synaptolepis kirkii",
					"Syrian Rue",
					"Tabernaemontana",
					"Tabernanthe iboga",
					"Tapentadol",
					"TCB-2",
					"Tea",
					"Testosterone",
					"Tetrahydroharmine",
					"Theanine",
					"Thujone",
					"Tizanidine",
					"TMA",
					"TMA-2",
					"TMA-6",
					"Toad Venom",
					"Tobacco",
					"Triazolam",
					"Trihexyphenidyl",
					"Triprolidine",
					"Tryptamines - Substituted",
					"Tryptophan",
					"Turbina corymbosa",
					"Tyrosine",
					"U-47700",
                    "Unknown",
                    "UR-144",
					"Uvaursi",
					"Valerian",
					"Vardenafil",
					"Varenicline",
                    //"Various",
                    "Vasopressin",
					"Vervain",
					"Vinpocetine",
					"Virola spp.",
					"Vitamin B-6",
					"Vitamin C",
					"Vitamins - Choline",
					"Vitamins - Niacin",
					"Voacanga africana",
					"Wasabi",
					"Wormwood",
					"Xenon",
					"XLR-11",
					"Xylazine",
					"Yarrow",
					"Yerba Mate",
					"Yohimbe",
					}},
				{"context", new List<string>{
					"Alone",
					"Small Group (2-9)",
					"Large Group (10+)",
					"Club / Bar",
					"Rave / Dance Event",
					"Large Party",
					"Festival / Lg. Crowd",
					"Group Ceremony",
					"School",
					"Workplace",
					"Military",
					"Hospital",
					"Various",
					"Unknown Context",
					"Public Space (Museum, Park, etc)",
					"Not Applicable"
					}},
				{"gender", new List<string>{
					"Male",
					"Female",
					"Not-Specified"
					}},
				{"nonsubstance", new List<string>{
					"Breathing",
					"Chanting",
					"Conferences",
					"Devices",
					"Devices - Magnetic",
					"Devices - Mind Machine",
					"Dreams",
					"Drug Testing",
					"Endogenous",
					"Fasting",
					"Floatation Tank",
					"Guiding",
					"Humor",
					"Hyperventilation",
					"Meditation",
					"Migraines",
					"Mindfulness",
					"Music",
					"Nitrogen Narcosis",
					"OBE",
					"Police / Customs",
					"Ritual",
					"Sleep Deprivation",
					"Sound (non-music)",		
					"Sweating",
					"Yoga / Bodywork",
					}},
				{"intensity", new List<string>{
					"No Effect",
                    "Light",
					"Medium",
					"Strong",
					"Extreme",
					}},
				{"category", new List<string>{
					"First Times",
					"General",
					"Retrospective / Summary",
					"Preparation / Recipes",
					"Difficult Experiences",
					"Bad Trips",
					"Health Problems",
					"Train Wrecks & Trip Disasters",
					"Addiction & Habituation",
					"Glowing Experiences",
					"Mystical Experiences",
					"Health Benefits",
					"Families",
					"Medical Use",
					"What Was in That?",
					"Second Hand Report",
					"Entities / Beings",
					"Therapeutic Intent or Outcome",
					"Personal Preparation",
					"Pregnancy / Baby",
					"Guides / Sitters",
					"HPPD / Lasting Visuals",
					"Overdose",
					"Video",
					"Performance Enhancement",
					"Loss of Magic",
					"Depression",
					"Post Trip Problems",
					"Music Discussion",
					"Nature / Outdoors",
					"Cultivation / Synthesis",
					"Multi-Day Experience",
					"Poetry",
					"Relationships",
					"Hangover / Days After",
					"Sex Discussion"
					}},
			};







			//generate permutations
			//---
			//put permutations in a list
			List<List<int>> permList = new List<List<int>>();



			//make all permutations for length of 1 (should be same number as # of items in allGroups)
			//--
			//how many categories are compared, e.g. 2 = gender_context, 3 = gender_context_category
			int permLength = 1; 
			IEnumerable<IEnumerable<int>> result =
				GetPermutations(Enumerable.Range(0, 6), permLength);
			int permCount = 0;
			foreach(var perm in result){
				permList.Add(new List<int>());
				foreach(var num in perm){
					permList[permCount].Add(num);
				}
				permCount++;
			}

			//make all permutations for length of 2
			permLength = 2; 
			result = GetPermutations(Enumerable.Range(0, 6), permLength);
			foreach(var perm in result){
				permList.Add(new List<int>());
				foreach(var num in perm){
					permList[permCount].Add(num);
				}
				permCount++;
			}

			//make all permutations for length of 3
//			permLength = 3; 
//			result = GetPermutations(Enumerable.Range(0, 6), permLength);
//			foreach(var perm in result){
//				permList.Add(new List<int>());
//				foreach(var num in perm){
//					permList[permCount].Add(num);
//				}
//				permCount++;
//			}


			//check permutations list by printing out
			foreach(var perm in permList){
				foreach(var num in perm){
					Console.Write(num);
				}
				Console.WriteLine("");
			}
			Console.WriteLine(permList.Count);


			//setup variables for digging and file output loop
			//---
			//for files doing counts on just 1 group
			Dictionary<string, Dictionary<string, double>> res1 = new Dictionary<string, Dictionary<string, double>>();
			//for files doing counts on 2 groups
			Dictionary<string, Dictionary<string, Dictionary<string, double>>> res2 = 
				new Dictionary<string, Dictionary<string, Dictionary<string, double>>>();
			//for files doing counts on 3 groups
			Dictionary<string, Dictionary<string, Dictionary<string, Dictionary<string, double>>>> res3 = 
				new Dictionary<string, Dictionary<string, Dictionary<string, Dictionary<string, double>>>>();
			List<string> group1 = new List<string>();
			List<string> group2 = new List<string>();
			List<string> group3 = new List<string>();
			string group1name = "";
			string group2name = "";
			string group3name = "";




			string fileName = "";
			//for all permutations
			foreach(var perm in permList){

				if(perm.Count == 1){
					group1 = allGroups[allGroups.Keys.ElementAt(perm[0])];
					group1name = allGroups.Keys.ElementAt(perm[0]);
					res1.Clear();

					//res1
					foreach(var item in complete)
					{
						foreach(string one in group1){
							if(complete[item.Key].ContainsKey(one)){
								if(res1.ContainsKey(one)){
									if(res1[one].ContainsKey("raw")){
										res1[one]["raw"]++;
									}else{
										res1[one].Add("raw", 1);
										res1[one].Add("perc", 0);
									}
								}else{
									res1.Add(one, new Dictionary<string, double>());
									res1[one].Add("raw", 1);
									res1[one].Add("perc", 0);
								}
							}
						}
					}

                    //collect all report IDs (this is the total for 1-group stats)
                    int cnt = 0;
                    foreach (var item in complete)
                    {
                        cnt++;
                    }
                    foreach (string one in group1)
                    {
                        if (res1.ContainsKey(one))
                        {
                            res1[one]["total"] = cnt;
                        }
                    }

                    ////calculate percents
                    foreach (string one in group1)
                    {
                        if (res1.ContainsKey(one))
                        {
                            res1[one]["perc"] = (res1[one]["raw"] / res1[one]["total"]) * 100f;
                        }
                    }






                    //collect total
                    //               double thisTot = 0;
                    //foreach(string one in group1){
                    //	if(res1.ContainsKey(one)){
                    //		thisTot += res1[one]["raw"];
                    //	}
                    //}

                    //calculate percents
                    //foreach(string one in group1){
                    //	if(res1.ContainsKey(one)){
                    //		res1[one]["total"] = thisTot;
                    //		res1[one]["perc"] = (res1[one]["raw"] / thisTot) * 100f;
                    //	}
                    //}

                    fileName = group1name + ".json";
					DicToJSON(res1, fileName);
				}else if(perm.Count == 2){
					group1 = allGroups[allGroups.Keys.ElementAt(perm[0])];
					group2 = allGroups[allGroups.Keys.ElementAt(perm[1])];
					group1name = allGroups.Keys.ElementAt(perm[0]);
					group2name = allGroups.Keys.ElementAt(perm[1]);
					res1.Clear();
					res2.Clear();

					//res2
					foreach(var item in complete)
					{
						//fill in raw numbers for two groups
						foreach(string one in group1){
							foreach(string two in group2){
								if(complete[item.Key].ContainsKey(one) && complete[item.Key].ContainsKey(two)){
									if(res2.ContainsKey(one)){
										if(res2[one].ContainsKey(two)){
											if(res2[one][two].ContainsKey("raw")){
												res2[one][two]["raw"]++;
											}else{
												res2[one][two].Add("raw", 1);
												res2[one][two].Add("perc", 0);
											}
										}else{
											res2[one].Add(two, new Dictionary<string, double>());
											res2[one][two].Add("raw", 1);
											res2[one][two].Add("perc", 0);
										}
									}else{
										res2.Add(one, new Dictionary<string, Dictionary<string, double>>());
										res2[one].Add(two, new Dictionary<string, double>());
										res2[one][two].Add("raw", 1);
										res2[one][two].Add("perc", 0);
									}
								}
							}
						}
					}

                    //collect all report IDs that have group1 in them
                    HashSet<string> reportsThatMatch = new HashSet<string>();
                    foreach (string one in group1)
                    {
                        reportsThatMatch.Clear();
                        foreach (var item in complete)
                        {
                            if (complete[item.Key].ContainsKey(one))
                            {
                                if (!reportsThatMatch.Contains(item.Key))
                                    reportsThatMatch.Add(item.Key);
                            }
                        }
                        foreach (string two in group2)
                        {
                            if (res2.ContainsKey(one))
                            {
                                if (res2[one].ContainsKey(two))
                                {
                                    res2[one][two].Add("total", reportsThatMatch.Count);
                                    res2[one][two]["perc"] = (res2[one][two]["raw"] / reportsThatMatch.Count) * 100f;
                                }
                            }
                        }
                    }




                    //               foreach (string one in group1){
                    //	//collect total
                    //	double thisTot = 0;
                    //	foreach(string two in group2){
                    //		if(res2.ContainsKey(one)){
                    //			if(res2[one].ContainsKey(two)){
                    //				thisTot += res2[one][two]["raw"];
                    //			}
                    //		}					
                    //	}
                    //	//calculate percents
                    //	foreach(string two in group2){
                    //		if(res2.ContainsKey(one)){
                    //			if(res2[one].ContainsKey(two)){
                    //				res2[one][two].Add("total", thisTot);
                    //				res2[one][two]["perc"] = (res2[one][two]["raw"] / thisTot) * 100f;
                    //			}
                    //		}					
                    //	}
                    //}

                    fileName = group1name + "_" + group2name + ".json";
					DicToJSON(res2, fileName);
				}else if(perm.Count == 3){
					group1 = allGroups[allGroups.Keys.ElementAt(perm[0])];
					group2 = allGroups[allGroups.Keys.ElementAt(perm[1])];
					group3 = allGroups[allGroups.Keys.ElementAt(perm[2])];
					group1name = allGroups.Keys.ElementAt(perm[0]);
					group2name = allGroups.Keys.ElementAt(perm[1]);
					group3name = allGroups.Keys.ElementAt(perm[2]);
					res1.Clear();
					res2.Clear();
					res3.Clear();

					//res3
					foreach(var item in complete)
					{
						foreach(string one in group1){
							foreach(string two in group2){
								foreach(string three in group3){
									if(complete[item.Key].ContainsKey(one) && complete[item.Key].ContainsKey(two) && complete[item.Key].ContainsKey(three)){
										if(res3.ContainsKey(one)){
											if(res3[one].ContainsKey(two)){
												if(res3[one][two].ContainsKey(three)){
													if(res3[one][two][three].ContainsKey("raw")){
														res3[one][two][three]["raw"]++;
													}else{
														res3[one][two][three].Add("raw", 1);
														res3[one][two][three].Add("perc", 0);
													}
												}else{
													res3[one][two].Add(three, new Dictionary<string, double>());
													res3[one][two][three].Add("raw", 1);
													res3[one][two][three].Add("perc", 0);
												}
											}else{
												res3[one].Add(two, new Dictionary<string, Dictionary<string, double>>());
												res3[one][two].Add(three, new Dictionary<string, double>());
												res3[one][two][three].Add("raw", 1);
												res3[one][two][three].Add("perc", 0);
											}
										}else{
											res3.Add(one, new Dictionary<string, Dictionary<string, Dictionary<string, double>>>());
											res3[one].Add(two, new Dictionary<string, Dictionary<string, double>>());
											res3[one][two].Add(three, new Dictionary<string, double>());
											res3[one][two][three].Add("raw", 1);
											res3[one][two][three].Add("perc", 0);
										}
									}
								}
							}
						}
					}

					foreach(string one in group1){
						foreach(string two in group2){
							//collect total
							double thisTot = 0;
							foreach(string three in group3){
								if(res3.ContainsKey(one)){
									if(res3[one].ContainsKey(two)){
										if(res3[one][two].ContainsKey(three)){
											thisTot += res3[one][two][three]["raw"];
										}
									}
								}					
							}

							//calculate percents
							foreach(string three in group3){
								if(res3.ContainsKey(one)){
									if(res3[one].ContainsKey(two)){
										if(res3[one][two].ContainsKey(three)){
											res3[one][two][three].Add("total", thisTot);
											res3[one][two][three]["perc"] = (res3[one][two][three]["raw"] / thisTot) * 100f;
										}
									}
								}					
							}
						}
					}

					fileName = group1name + "_" + group2name + "_" + group3name + ".json";
					DicToJSON(res3, fileName);
				}









//				group1 = allGroups[allGroups.Keys.ElementAt(perm[0])];
//				group2 = allGroups[allGroups.Keys.ElementAt(perm[1])];
//				group3 = allGroups[allGroups.Keys.ElementAt(perm[2])];
//				group1name = allGroups.Keys.ElementAt(perm[0]);
//				group2name = allGroups.Keys.ElementAt(perm[1]);
//				group3name = allGroups.Keys.ElementAt(perm[2]);
//
//				res1.Clear();
//				res2.Clear();
//				res3.Clear();
//
//				//res1
//				int baseTot = 0;
//				foreach(var item in complete)
//				{
//					foreach(string two in group2){
//						if(complete[item.Key].ContainsKey(two)){
//							if(res1.ContainsKey(two)){
//								if(res1[two].ContainsKey("raw")){
//									baseTot++;
//									res1[two]["raw"]++;
//									res1[two]["perc"] = (res1[two]["raw"] / baseTot) * 100f;
//								}else{
//									res1[two].Add("raw", 1);
//									res1[two].Add("perc", 1);
//									baseTot++;
//								}
//							}else{
//								res1.Add(two, new Dictionary<string, double>());
//							}
//						}
//					}
//				}
//
//				//dig in complete for this permutation, and output to file with
//				//appropriate name
//				//--
//				//res2
//				foreach(var item in complete)
//				{
//					//fill in raw numbers for two groups
//					foreach(string one in group1){
//						foreach(string two in group2){
//							if(complete[item.Key].ContainsKey(one) && complete[item.Key].ContainsKey(two)){
//								if(res2.ContainsKey(one)){
//									if(res2[one].ContainsKey(two)){
//										if(res2[one][two].ContainsKey("raw")){
//											res2[one][two]["raw"]++;
//
//											double tot = 0;
//											double raw = res2[one][two]["raw"];
//											foreach(var twot in res2[one]){
//												tot += res2[one][twot.Key]["raw"];
//											}
//											res2[one][two]["perc"] = (raw / tot) * 100f;
//
//										}else{
//											res2[one][two].Add("raw", 1);
//											res2[one][two].Add("perc", 1);
//										}
//									}else{
//										res2[one].Add(two, new Dictionary<string, double>());
//										res2[one][two].Add("raw", 1);
//										res2[one][two].Add("perc", 1);
//									}
//								}else{
//									res2.Add(one,new Dictionary<string, Dictionary<string, double>>());
//									res2[one].Add(two, new Dictionary<string, double>());
//									res2[one][two].Add("raw", 1);
//									res2[one][two].Add("perc", 1);
//								}
//							}
//						}
//					}
//				}
//
//				//res3
//				foreach(var item in complete)
//				{
//					foreach(string one in group1){
//						foreach(string two in group2){
//							foreach(string three in group3){
//								if(complete[item.Key].ContainsKey(one) && complete[item.Key].ContainsKey(two) && complete[item.Key].ContainsKey(three)){
//									if(res3.ContainsKey(one)){
//										if(res3[one].ContainsKey(two)){
//											if(res3[one][two].ContainsKey(three)){
//												if(res3[one][two][three].ContainsKey("raw")){
//													res3[one][two][three]["raw"]++;
//
//													double tot = 0;
//													double raw = res3[one][two][three]["raw"];
//													foreach(var threet in res3[one][two]){
//														tot += res3[one][two][threet.Key]["raw"];
//													}
//													res3[one][two][three]["perc"] = (raw / tot) * 100f;
//
//												}else{
//													res3[one][two][three].Add("raw", 1);
//													res3[one][two][three].Add("perc", 1);
//												}
//											}else{
//												res3[one][two].Add(three, new Dictionary<string, double>());
//												res3[one][two][three].Add("raw", 1);
//												res3[one][two][three].Add("perc", 1);
//											}
//										}else{
//											res3[one].Add(two, new Dictionary<string, Dictionary<string, double>>());
//											res3[one][two].Add(three, new Dictionary<string, double>());
//											res3[one][two][three].Add("raw", 1);
//											res3[one][two][three].Add("perc", 1);
//										}
//									}else{
//										res3.Add(one, new Dictionary<string, Dictionary<string, Dictionary<string, double>>>());
//										res3[one].Add(two, new Dictionary<string, Dictionary<string, double>>());
//										res3[one][two].Add(three, new Dictionary<string, double>());
//										res3[one][two][three].Add("raw", 1);
//										res3[one][two][three].Add("perc", 1);
//									}
//								}
//							}
//						}
//					}
//				}
//
//				//fot turning variable names into strings. not using anymore.
////				string group1str = MemberInfoGetting.GetMemberName(() => allGroups.Keys.ElementAt(li[0]));
////				string group2str = MemberInfoGetting.GetMemberName(() => gender);
//
//				string fileName = "";
//
//				fileName = group1name + "_" + group2name + "_" + group3name + ".json";
//				DicToJSON(res3, fileName);
//
//				fileName = group1name + "_" + group2name + ".json";
//				DicToJSON(res2, fileName);
//
//				fileName = group2name + ".json";
//				DicToJSON(res1, fileName);
			}
		}
	}
}
