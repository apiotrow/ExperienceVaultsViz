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

			var json = File.ReadAllText(@"JSONS/complete_depthOne.json");
			IDictionary<string, IDictionary<string, string>> complete = 
				JsonConvert.DeserializeObject<IDictionary<String, IDictionary<String, String>>>(json);
			

			Dictionary<string, List<string>> allGroups = new Dictionary<string, List<string>>{
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
				{"categories", new List<string>{
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
			int permLength = 2;
			IEnumerable<IEnumerable<int>> result =
				GetPermutations(Enumerable.Range(0, 3), permLength);

			//put permutations in a list
			int permCount = 0;
			List<List<int>> permList = new List<List<int>>();
			foreach(var perm in result){
				permList.Add(new List<int>());
				foreach(var num in perm){
					permList[permCount].Add(num);
				}
				permCount++;
			}

			//check permutations list bt printing out
			foreach(var perm in permList){
				foreach(var num in perm){
					Console.Write(num);
				}
				Console.WriteLine("");
			}
			Console.WriteLine(permList.Count);

			//setup variables for digging and file output loop
//			Dictionary<string, int> res1 = new Dictionary<string, int>();
			Dictionary<string, Dictionary<string, Dictionary<string, double>>> res2 = 
				new Dictionary<string, Dictionary<string, Dictionary<string, double>>>();
//			Dictionary<string, Dictionary<string, Dictionary<string, int>>> res3 = 
//				new Dictionary<string, Dictionary<string, Dictionary<string, int>>>();
			List<string> group1 = new List<string>();
			List<string> group2 = new List<string>();
			string group1name = "bug";
			string group2name = "wat";

			//for all permutations
			foreach(var perm in permList){
				group1 = allGroups[allGroups.Keys.ElementAt(perm[0])];
				group2 = allGroups[allGroups.Keys.ElementAt(perm[1])];
				group1name = allGroups.Keys.ElementAt(perm[0]);
				group2name = allGroups.Keys.ElementAt(perm[1]);

//				Console.WriteLine(allGroups.Keys.ElementAt(perm[0]));

				//get base numbers for perc calculations
//				foreach(var item in complete)
//				{
//					foreach(string two in group2){
//						if(complete[item.Key].ContainsKey(two)){
//							if(res1.ContainsKey(two)){
//								res1[two]++;
//							}else{
//								res1[two] = 0;
//							}
//						}
//					}
//				}

				//dig in complete for this permutation, and output to file with
				//appropriate name
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

											double tot = 0;
											double raw = res2[one][two]["raw"];
											foreach(var twot in res2[one]){
												tot += res2[one][twot.Key]["raw"];
											}
											res2[one][two]["perc"] = (raw / tot) * 100f;

										}else{
											res2[one][two].Add("raw", 1);
											res2[one][two].Add("perc", 1);
										}
									}else{
										res2[one].Add(two, new Dictionary<string, double>());
										res2[one][two].Add("raw", 1);
										res2[one][two].Add("perc", 1);
									}
								}else{
									res2.Add(one,new Dictionary<string, Dictionary<string, double>>());
									res2[one].Add(two, new Dictionary<string, double>());
									res2[one][two].Add("raw", 1);
									res2[one][two].Add("perc", 1);
								}
							}
						}
					}

//					foreach(var one in res2){
//						foreach(var two in res2[one.Key]){
//							double raw = res2[one.Key][two.Key]["raw"];
//							double perc = (raw / total) * 100f;
//							res2[one.Key][two.Key].Add("perc", perc);
//						}
//					}


//					foreach(string one in group1){
//						foreach(string two in group2){
//							if(res2.ContainsKey(one)){
//								if(res2[one].ContainsKey(two)){
////									res2[one]
//								}
//							}else{
//								res2.Add(one, new Dictionary<string, int>());
//							}
//						}
//
//					}

				}

//				string group1str = MemberInfoGetting.GetMemberName(() => allGroups.Keys.ElementAt(li[0]));
//				string group2str = MemberInfoGetting.GetMemberName(() => gender);
				string fileName = group1name + "_" + group2name + ".json";
				DicToJSON(res2, fileName);
			}
		}
	}
}
