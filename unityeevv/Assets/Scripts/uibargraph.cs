using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public class uibargraph : MonoBehaviour {
    public List<RectTransform> bars; //holds bar transform so we can modify their height
    Dictionary<string, float> dataDict; //holds the <group, raw/perc> data that we graph
    List<float> valuesList; //just the values

    class Metric
    {
        public string perc = "perc";
        public string raw = "raw";
        public string total = "total";
    }
    Metric metric = new Metric();

    void Start () {
        dataDict = new Dictionary<string, float>();
        valuesList = new List<float>();

        setupButtons();
        TextAsset asset = Resources.Load(Path.Combine("output", "drug")) as TextAsset;
        JSONObject j = new JSONObject(asset.text);

        setupDict(j, metric.raw, 100f);
        sortDict(dataDict);

        valuesList = dataDict.Values.ToList();

        //foreach (var entry in dataDict)
        //{
        //    print(entry.Key + ": " + entry.Value);
        //}

    }

    void setupDict(JSONObject obj, string m, float cutOff)
    {
        for (int i = 0; i < obj.list.Count; i++)
        {
            JSONObject j = (JSONObject)obj.list[i];
            float value = j[m].n;

            if (value > cutOff)
                dataDict.Add((string)obj.keys[i], j[m].n);
        }
    }

    void sortDict(Dictionary<string, float> dict)
    {
        dataDict = dataDict.OrderBy(x => x.Value).Reverse().ToDictionary(x => x.Key, x => x.Value);
    }

    void setupButtons()
    {
        Button btn;
        btn = GameObject.Find("Button1").GetComponent("Button") as Button;
        btn.onClick.AddListener(() => {
            createBarGraph(valuesList);
        });
        //btn = GameObject.Find("Button2").GetComponent("Button") as Button;
        //btn.onClick.AddListener(() => {
        //    createBarGraph(new float[] { 0.5f, 7, 7, 4, 1, 12, 5, 15, 1, 5, 8, 8, });
        //});
        //btn = GameObject.Find("Button3").GetComponent("Button") as Button;
        //btn.onClick.AddListener(() => {
        //    createBarGraph(new float[] { 7, 4, 2, 6, 2, 7, 8, 6, 3, 1, 0.8f, 13 });
        //});
    }


    //make bar graph with given data
    void createBarGraph(List<float> a)
    {
        //create new list of bar dimensions
        bars.Clear();
        bars = new List<RectTransform>();

        //find bar holder game object
        Transform barholder = GameObject.Find("UIBarGraph").transform;

        //delete any previous graph
        foreach (Transform child in barholder)
        {
            GameObject.Destroy(child.gameObject);
        }

        //make physical bars
        int barcount = a.Count;
        for (int i = 0; i < barcount; i++)
        {
            GameObject newBar = GameObject.Instantiate(Resources.Load("UIBar"), transform.position, Quaternion.identity) as GameObject;
            newBar.transform.SetParent(barholder);
            bars.Add(newBar.GetComponent<RectTransform>());
        }

        //make the bars lerp to their needed height.
        //if curreny graph is in process of growing, stop that first.
        StopCoroutine("barHeightLerp");
        StartCoroutine("barHeightLerp", a);
    }

    //make bars grow up to needed height
    IEnumerator barHeightLerp(List<float> data)
    {
        while (true)
        {
            bool done = true;

            //smoothly change height of each bar
            for (int i = 0; i < bars.Count; i++)
            {
                //clamp bar height so the tallest bar is right up the the top edge of the screen
                float goToThisHeight = (data[i] / data.Max()) * 22f;

                bars[i].transform.localScale = new Vector3(1f, Mathf.Lerp(bars[i].transform.localScale.y, goToThisHeight, Time.deltaTime * 5f), 1f);

                //if we haven't hit the right height, coroutine still has to go
                if (Mathf.Abs(data[i] - bars[i].transform.localScale.y) > 0.01f)
                {
                    done = false;
                }
            }

            //if we hit the right height, stop coroutine. if not, do another iteration.
            if (done)
                yield break;
            else
                yield return null;
        }
    }
}
