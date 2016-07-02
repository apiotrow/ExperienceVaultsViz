using System;
using System.IO;
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

		public static void DicToJSON(Dictionary<string, Dictionary<string, string>> info){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/path.json", json);
		}

		public static void DicToJSON(Dictionary<string,string> info){
			string json = JsonConvert.SerializeObject(info);
			System.IO.File.WriteAllText (@"JSONS/output/path.json", json);
		}

		public static void Main (string[] args)
		{
			dynamic stuff = JsonConvert.DeserializeObject(File.ReadAllText(@"JSONS/context_gender.json"));
//			dynamic stuff = JsonConvert.DeserializeObject(File.ReadAllText(@"JSONS/path.json"));
//			dynamic stuff = JsonConvert.DeserializeObject(File.ReadAllText(@"JSONS/complete.json"));

			Console.WriteLine(stuff);

			var json = File.ReadAllText(@"JSONS/complete_depthOne.json");
//			var obj = JsonConvert.DeserializeObject<IDictionary<string, object>>(
//				json, new JsonConverter[] {new MyConverter()});

			IDictionary<string, IDictionary<string, string>> poo = 
				JsonConvert.DeserializeObject<IDictionary<String, IDictionary<String, String>>>(json);


			foreach(var item in poo)
			{
				Console.WriteLine(item.Key);
				foreach(var bee in poo[item.Key]){
					Console.WriteLine(bee.Key + ": " + bee.Value);
				}

			}



//			foreach (var x in poo)
//			{
//				
//			}
				

//			dynamic bee = JsonConvert.DeserializeObject(File.ReadAllText(@"JSONS/complete_depthOne.json"));
//			Dictionary<string, Dictionary<string, string>> poo = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, string>>>(bee);


			Dictionary<string, Dictionary<string, string>> info =
				new Dictionary<string, Dictionary<string, string>>
			{
				{"Gen",
					new Dictionary<string, string>
					{
						{"nayytme", "Genesis"},
						{"chapters", "50"},
						{"before", ""},
						{"after", "Exod"}
					}
				},
				{"Exod",
					new Dictionary<string, string>
					{
						{"name", "Exodus"},
						{"chapters", "40"},
						{"before", "Gen"},
						{"after", "Lev"}
					}
				}
			};
			DicToJSON(info);

		}
	}
}
