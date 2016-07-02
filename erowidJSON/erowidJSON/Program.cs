using System;
using System.Collections.Generic;

namespace erowidJSON
{
	class MainClass
	{
		
		public static void Main (string[] args)
		{
			Console.WriteLine ("Hello World!");

			string[] lines = { "First line", "Second line", "Third line" };

			// Example #2: Write one string to a text file.
			string text = "A class is the most powerful data type in C#. Like a structure, " +
				"a class defines the data and behavior of the data type. ";
			// WriteAllText creates a file, writes the specified string to the file,
			// and then closes the file.    You do NOT need to call Flush() or Close().
			System.IO.File.WriteAllText(@"WriteText.txt", text);

			// Example #3: Write only some strings in an array to a file.
			// The using statement automatically flushes AND CLOSES the stream and calls 
			// IDisposable.Dispose on the stream object.
			// NOTE: do not use FileStream for text files because it writes bytes, but StreamWriter
			// encodes the output as text.
			using (System.IO.StreamWriter file = 
				new System.IO.StreamWriter(@"WriteLines2.txt"))
			{
				foreach (string line in lines)
				{
					// If the line doesn't contain the word 'Second', write the line to the file.
					if (!line.Contains("Second"))
					{
						file.WriteLine(line);
					}
				}
			}

		}
	}
}
