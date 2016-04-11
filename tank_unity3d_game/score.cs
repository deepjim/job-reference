using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class score : MonoBehaviour {
    public static int score1;
    Text text;
    // Use this for initialization
    void Awake()
    {
        text = GetComponent<Text>();
        score1 = 0;
    }
    void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        text.text = "Score:" + score1;
    }
}
