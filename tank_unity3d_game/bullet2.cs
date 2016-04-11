using UnityEngine;
using System.Collections;

public class bullet2 : MonoBehaviour {
    public GameObject bullet;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnTriggerEnter(Collider other)
    {

        if (other.gameObject.name == "Player")
        {
           //  Debug.Log(other);
            Destroy(bullet, 0.001f);
        }
    }
}
