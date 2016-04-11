using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class wander : MonoBehaviour {
    
    public int movespeed = 5;
    public int rotationspeed = 20;
    public int maxdis = 5;
    public float x, y, z;
    public Vector3 pos;
    private Transform myTransform;
    public float time = 3.0f;

    public GameObject bullet; //gun
    public GameObject firePoint,expo,expo2;
    public float shootForce = 500;
    public float freeze_time = 0.0f;
    public float mindis = 5.0f;//3 is too close
    public Transform target;

    public int health = 30;
    public GameObject Aiorplay;
    // Use this for initialization
    private ParticleSystem shellExplosion,tankExplosion;
    void Awake()
    {
        myTransform = transform;
    }

    void Start()
    {
        x = Random.Range(-40,40);
        y = 0;
        z = Random.Range(-40,40);
        pos = new Vector3(x,y,z);

        GameObject go = GameObject.FindWithTag("Player");
        target = go.transform;
        shellExplosion = expo.GetComponent<ParticleSystem>();
        tankExplosion = expo2.GetComponent<ParticleSystem>();
    }

    // Update is called once per frame
    void Update()
    {
       
        if (player_control.kk==true)
        {
            ki();
            if (freeze_time > 0) freeze_time -= Time.deltaTime;
            if (time > 0) time -= Time.deltaTime;

            if (Vector3.Distance(target.position, myTransform.position) <= mindis)//gun
            {
                myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(target.position - myTransform.position), rotationspeed * Time.deltaTime);
                attack();
            }
            else
            {
                wan();
            }
        }
    }
    void attack()
    {
                
            if (freeze_time <= 0)
            {
                GameObject temBullet;
                temBullet = Instantiate(bullet, firePoint.transform.position, firePoint.transform.rotation) as GameObject;
                Rigidbody temRigBody;
                temRigBody = temBullet.GetComponent<Rigidbody>();
                temRigBody.AddForce(transform.forward * shootForce);
                Destroy(temBullet, 3);
                freeze_time = 1.0f;
            }
    
        
    }
    void wan()
    {
        if (time < 0)
        {
            myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(pos - myTransform.position), rotationspeed * Time.deltaTime);
            if (Vector3.Distance(pos, myTransform.position) >= maxdis)
            {
                myTransform.position += myTransform.forward * movespeed * Time.deltaTime;
            }
            else
            {
                x = Random.Range(-40, 40);
                y = 0;
                z = Random.Range(-40, 40);
                pos = new Vector3(x, y, z);
                time = 3.0f;
            }

        }
    }

    void ki()
    {
        if (Input.GetKeyUp("f"))
        {
            tankExplosion.Play();
            
            Destroy(Aiorplay, 0.5f);
        }
    }
    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.name == "bullet2(Clone)")
        {
            health-=10;
            shellExplosion.Play();
            score.score1 += 10;
            //    Debug.Log(health);
            if (health == 0)
            {
                tankExplosion.Play();
                Destroy(Aiorplay, 0.5f);
                score.score1 += 50;
            }
        }
    }
}
