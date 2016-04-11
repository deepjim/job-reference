using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class chase : MonoBehaviour {
    
    public Transform target;
    public int movespeed = 5;
    public int rotationspeed = 5;
    public float maxdis = 5.0f;
    private Transform myTransform;

    public GameObject bullet; //gun
    public GameObject firePoint,expo,expo2;
    public float shootForce = 500;
    public float freeze_time = 0.0f;
    public float mindis = 5.0f;//3 is too close

    public int health = 30;
    public GameObject Aiorplay;

    private ParticleSystem shellExplosion, tankExplosion;
    // Use this for initialization

    void Awake()
    {
        myTransform = transform;
    }

    void Start()
    {
        GameObject go = GameObject.FindWithTag("Player");
        target = go.transform;
        shellExplosion = expo.GetComponent<ParticleSystem>();
        tankExplosion = expo2.GetComponent<ParticleSystem>();
    }

    // Update is called once per frame
    void Update()
    {
       
        if (player_control.kk == true)
        {
            ki();
            myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(target.position - myTransform.position), rotationspeed * Time.deltaTime);

            chas();

            if (Vector3.Distance(target.position, myTransform.position) < mindis)//gun
            {
                attack();
            }

            if (freeze_time > 0) freeze_time -= Time.deltaTime;
        }
    }

    void chas()
    {
        if (Vector3.Distance(target.position, myTransform.position) > maxdis)
        {
            myTransform.position += myTransform.forward * movespeed * Time.deltaTime;
        }
    }

    void attack()
    {
        myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(target.position - myTransform.position), rotationspeed * Time.deltaTime);
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
         //   Debug.Log(health);
            if (health == 0)
            {
                tankExplosion.Play();
                Destroy(Aiorplay, 0.5f);
                score.score1 += 50;

            }

        }
    }
}
