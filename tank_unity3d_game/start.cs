using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class start : MonoBehaviour {
    public GameObject info;
    public GameObject score;
    public GameObject hp;
    public GameObject start_can;
  
    // Use this for initialization
   

    void Start()
    {     
        info.GetComponent<Canvas>().enabled = false;
        score.GetComponent<Canvas>().enabled = false;
        hp.GetComponent<Canvas>().enabled = false;

    }

    // Update is called once per frame
    void Update () {
        if (Input.GetKeyDown("k"))
        {
            starter();
        }
       
    }
    void starter()
    {
        info.GetComponent<Canvas>().enabled = true;
        score.GetComponent<Canvas>().enabled = true;
        hp.GetComponent<Canvas>().enabled = true;
        start_can.GetComponent<Canvas>().enabled = false;
      
    }
}
