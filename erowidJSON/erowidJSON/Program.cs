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

		public static void DicToJSON(Dictionary<string, Dictionary<string, Dictionary<string, int>>> info, string fileName){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/" + fileName, json);
		}

		public static void DicToJSON(Dictionary<string, Dictionary<string, int>> info, string fileName){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/" + fileName, json);
					}

		public static void DicToJSON(Dictionary<string,int> info, string fileName){
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

			List<Dictionary<string, List<string>>> allGroups = new List<Dictionary<string, List<string>>>{
				{new Dictionary<string, List<string>>{
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
					}
				}
			};

			List<string> context = new List<string>(){
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
			};

			List<string> gender = new List<string>(){
				"Male",
				"Female",
				"Not-Specified"
			};




			int permLength = 3;
			IEnumerable<IEnumerable<int>> result =
				GetPermutations(Enumerable.Range(1, 8), permLength);

			int permCount = 0;
			List<List<int>> permList = new List<List<int>>();
			foreach(var perm in result){
				permList.Add(new List<int>());
				foreach(var num in perm){
					permList[permCount].Add(num);
//					Console.Write(perm2);
//					permLength++;
				}
//				Console.WriteLine(permList[permCount].ToString());
				permCount++;
			}

			foreach(var perm in permList){
				foreach(var num in perm){
					Console.Write(num);
				}
				Console.WriteLine("");
			}

			Console.Write(permList.Count);



			Dictionary<string, Dictionary<string, int>> res = new Dictionary<string, Dictionary<string, int>>();
			foreach(var item in complete)
			{
				foreach(string c in context){
					foreach(string g in gender){
						if(complete[item.Key].ContainsKey(c) && complete[item.Key].ContainsKey(g)){
							if(res.ContainsKey(c)){
								if(res[c].ContainsKey(g)){
									res[c][g]++;
								}else{
									res[c].Add(g, 0);
								}
							}else{
								res.Add(c, new Dictionary<string, int>());
							}
						}
					}
				}
			}
			

			string group1 = MemberInfoGetting.GetMemberName(() => context);
			string group2 = MemberInfoGetting.GetMemberName(() => gender);
			string fileName = group1 + "_" + group2;
			DicToJSON(res, fileName);



//			Dictionary<string, Dictionary<string, string>> info =
//				new Dictionary<string, Dictionary<string, string>>
//			{
//				{"Gen",
//					new Dictionary<string, string>
//					{
//						{"nayytme", "Genesis"},
//						{"chapters", "50"},
//						{"before", ""},
//						{"after", "Exod"}
//					}
//				},
//				{"Exod",
//					new Dictionary<string, string>
//					{
//						{"name", "Exodus"},
//						{"chapters", "40"},
//						{"before", "Gen"},
//						{"after", "Lev"}
//					}
//				}
//			};
//			DicToJSON(info);

		}
	}
}
