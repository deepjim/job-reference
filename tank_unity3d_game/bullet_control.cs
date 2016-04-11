using UnityEngine;
using System.Collections;

public class bullet_control : MonoBehaviour {
    public GameObject bullet;
    // Use this for initialization
    void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnTriggerEnter(Collider other)
    {

        if (other.gameObject.name != "Player" && other.gameObject.name != "bullet(Clone)")
        {
           // Debug.Log(other);
            Destroy(bullet, 0.5f);
        }
    }
}
