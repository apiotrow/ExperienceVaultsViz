using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class uibargraph : MonoBehaviour {
    public List<RectTransform> bars; //holds bar dimensions so we can modify them

    void Start () {
        setupButtons();
    }

    void setupButtons()
    {
        Button btn;
        btn = GameObject.Find("Button1").GetComponent("Button") as Button;
        btn.onClick.AddListener(() => {
            createBarGraph(new float[] { 0.2f, 6, 7, 8, 8, 4 });
        });
        btn = GameObject.Find("Button2").GetComponent("Button") as Button;
        btn.onClick.AddListener(() => {
            createBarGraph(new float[] { 0.5f, 7, 7, 4, 1, 12, 5, 15, 1, 5, 8, 8, });
        });
        btn = GameObject.Find("Button3").GetComponent("Button") as Button;
        btn.onClick.AddListener(() => {
            createBarGraph(new float[] { 7, 4, 2, 6, 2, 7, 8, 6, 3, 1, 0.8f, 13 });
        });
    }


    //make bar graph with given data
    void createBarGraph(float[] a)
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
        int barcount = a.Length;
        for (int i = 0; i < barcount; i++)
        {
            GameObject newBar = GameObject.Instantiate(Resources.Load("UIBar"), transform.position, Quaternion.identity) as GameObject;
            newBar.transform.parent = barholder;
            bars.Add(newBar.GetComponent<RectTransform>());
        }

        //make the bars lerp to their needed height.
        //if curreny graph is in process of growing, stop that first.
        StopCoroutine("barHeightLerp");
        StartCoroutine("barHeightLerp", a);
    }

    //make bars grow up to needed height
    IEnumerator barHeightLerp(float[] data)
    {

        while (true)
        {
            bool done = true;

            //smoothly change height of each bar
            for (int i = 0; i < bars.Count; i++)
            {
                bars[i].transform.localScale = new Vector3(1f, Mathf.Lerp(bars[i].transform.localScale.y, data[i], Time.deltaTime * 5f), 1f);

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
