using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class renew : MonoBehaviour {
   
    public static float renew1;
    Text text;
    // Use this for initialization
    void Awake()
    {
        text = GetComponent<Text>();
        renew1 = 15.0f;
    }
    void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
       
        if (player_control.kk == true)
        {
            text.text = "Tanks renew after " + renew1 + "s";
            if (renew1 <= 0) renew1 = 15.0f;
        }
    }
}
