using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class patro : MonoBehaviour
{

    public Transform target1, target2, target3;
    public int movespeed = 5;
    public int rotationspeed = 5;
    public int maxdis;
    public int flag1 = 0, flag2 = 0, flag3 = 0;
    private Transform myTransform;
    // Use this for initialization

    public GameObject bullet; //gun
    public GameObject firePoint,expo,expo2;
    public float shootForce = 500;
    public float freeze_time = 3.0f;
    public float mindis = 5.0f;//3 is too close
    public Transform target;

    public int health = 30;
    public int hit = 0;
    public bool flag = false;
    public GameObject Aiorplay;
    private ParticleSystem shellExplosion, tankExplosion;
    
    void Awake()
    {
        myTransform = transform;
    }

    void Start()
    {
        GameObject go1 = GameObject.FindGameObjectWithTag("Gp1");
        target1 = go1.transform;
        GameObject go2 = GameObject.FindGameObjectWithTag("Gp2");
        target2 = go2.transform;
        GameObject go3 = GameObject.FindGameObjectWithTag("Gp3");
        target3 = go3.transform;
        maxdis = 5;
        shellExplosion = expo.GetComponent<ParticleSystem>();
        tankExplosion = expo2.GetComponent<ParticleSystem>();
    }

    // Update is called once per frame
    void Update()
    {
       
        if (player_control.kk == true)
        {
            ki();
            GameObject go = GameObject.FindWithTag("Player");
            target = go.transform;
            if (freeze_time > 0) freeze_time -= Time.deltaTime;
            if (Vector3.Distance(target.position, myTransform.position) < mindis)//gun
            {
                attack();
            }
            else {
                patr();
            }
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

    void patr()
    {
        if (flag1 == 0)
        {
            myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(target1.position - myTransform.position), rotationspeed * Time.deltaTime);
            if (Vector3.Distance(target1.position, myTransform.position) > maxdis)
            {
                myTransform.position += myTransform.forward * movespeed * Time.deltaTime;
            }
            else
            {
                flag1 = 1;
            }
        }
        else if (flag2 == 0)
        {
            myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(target2.position - myTransform.position), rotationspeed * Time.deltaTime);
            if (Vector3.Distance(target2.position, myTransform.position) > maxdis)
            {
                myTransform.position += myTransform.forward * movespeed * Time.deltaTime;
            }
            else
            {
                flag2 = 1;
            }
        }
        else if (flag3 == 0)
        {
            myTransform.rotation = Quaternion.Slerp(myTransform.rotation, Quaternion.LookRotation(target3.position - myTransform.position), rotationspeed * Time.deltaTime);
            if (Vector3.Distance(target3.position, myTransform.position) > maxdis)
            {
                myTransform.position += myTransform.forward * movespeed * Time.deltaTime;
            }
            else
            {
                flag3 = 1;
            }
        }
        else
        {
            flag1 = 0;
            flag2 = 0;
            flag3 = 0;
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
            // tankExplosion.Play();
            //  Debug.Log(health);
            if (health == 0)
            {
                tankExplosion.Play();
                Destroy(Aiorplay, 0.5f);
                score.score1 += 50;

            }
        }
    }
}