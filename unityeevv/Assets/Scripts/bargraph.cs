using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class bargraph : MonoBehaviour {
    public List<GameObject> bars; //holds bar dimensions so we can modify them

	void Start () {
        setupButtons();
    }

    void setupButtons()
    {
        Button btn;
        btn = GameObject.Find("Button1").GetComponent("Button") as Button;
        btn.onClick.AddListener(() => {
            createBarGraph(new int[] { 2,6,7,8,8,4});
        });
        btn = GameObject.Find("Button2").GetComponent("Button") as Button;
        btn.onClick.AddListener(() => {
            createBarGraph(new int[] { 5, 7,7,4,1,12,5,15,1,5,8,8, });
        });
        btn = GameObject.Find("Button3").GetComponent("Button") as Button;
        btn.onClick.AddListener(() => {
            createBarGraph(new int[] {7,4,2,6,2,7,8,6,3,1,8,13 });
        });
    }

    //make bar graph with given data
    void createBarGraph(int[] a)
    {
        //create new list of bar dimensions
        bars.Clear();
        bars = new List<GameObject>();

        //find bar holder game object
        Transform barholder = GameObject.Find("bars").transform;

        //delete any previous graph
        foreach (Transform child in barholder)
        {
            GameObject.Destroy(child.gameObject);
        }

        //make physical bars
        int barcount = a.Length;
        for (int i = 0; i < barcount; i++)
        {
            //each bar has its own holder
            GameObject bparent = new GameObject();
            bparent.transform.parent = barholder;
            bparent.transform.position = new Vector3((float)i, 0f, 0f);

            //the actual bar. set position so it will grow from it's bottom rather it's center.
            GameObject b = GameObject.CreatePrimitive(PrimitiveType.Cube);
            b.transform.parent = bparent.transform;
            b.transform.localPosition = new Vector3(0f, 0.5f, 0f);

            //add to bar holder gameobject
            bars.Add(bparent);
        }

        //make the bars lerp to their needed height.
        //if curreny graph is in process of growing, stop that first.
        StopCoroutine("barHeightLerp");
        StartCoroutine("barHeightLerp", a);
    }

    //make bars grow up to needed height
    IEnumerator barHeightLerp(int[] data)
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

    void Update () {
        
	}
}
