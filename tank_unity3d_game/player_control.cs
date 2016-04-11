using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class player_control : MonoBehaviour {
    public bool k = false;
    public static bool kk=false;
    public int movespeed = 20;
    public int turnspeed = 50;

    public GameObject bullet;
    public GameObject firePoint;
    public float shootForce = 1000;

    public int health = 3000;

    public bool flag = false;
    public GameObject Aiorplay;

    public float x, y, z, re_t= 15.0f;
    public Vector3 pos, rot;
    private ParticleSystem shellExplosion;
    public GameObject AI1, AI2, AI3;
    public GameObject help;
    public GameObject info;
    public GameObject expo,hpp;
    private bool contr = false;
    private bool contr2 = false;

    public int startingHealth = 500;
    public int currentHealth;
    public Slider healthSlider;
    public Image damageImage;
    public AudioClip deathClip;
    public float flashSpeed = 5f;
    public Color flashColour = new Color(1f, 0f, 0f, 0.1f);
    public bool demaged = false;
    //public AudioSource shellExplosionSound;

    // Use this for initialization
    void Start()
    {
        help.GetComponent<Canvas>().enabled = false;
        shellExplosion = expo.GetComponent<ParticleSystem>();
        currentHealth = 500;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.K))
        {
            k = true;
            kk = true;
        }
        if (k)
        {
            move();
            shoot();
            canva();
            demage();
            renew.renew1 -= Time.deltaTime;
            if (re_t > 0)
            {
                re_t -= Time.deltaTime;
            }
            else
            {
                emermy();
                re_t = 15.0f;
            }

            if (Input.GetKeyDown(KeyCode.Escape))
            {
                Application.Quit();
            }
        }
    }

    void move()
    {
        if (Input.GetKey(KeyCode.UpArrow))
        {
            this.transform.Translate((Vector3.forward) * movespeed * Time.deltaTime);
            // Debug.Log("up");
        }
        if (Input.GetKey(KeyCode.DownArrow))
        {
            this.transform.Translate((Vector3.back) * movespeed * Time.deltaTime);
            // Debug.Log("down");
        }
        if (Input.GetKey(KeyCode.LeftArrow))
        {
            this.transform.Rotate(Vector3.up, -turnspeed * Time.deltaTime);
            // Debug.Log("left turn");
        }
        if (Input.GetKey(KeyCode.RightArrow))
        {
            this.transform.Rotate(Vector3.up, turnspeed * Time.deltaTime);
            // Debug.Log("right turn");
        }
        if (Input.GetKey("w"))
        {
            this.transform.Translate((Vector3.forward) * movespeed * Time.deltaTime);
            // Debug.Log("up");
        }
        if (Input.GetKey("s"))
        {
            this.transform.Translate((Vector3.back) * movespeed * Time.deltaTime);
            // Debug.Log("down");
        }
        if (Input.GetKey("a"))
        {
            this.transform.Rotate(Vector3.up, -turnspeed * Time.deltaTime);
            // Debug.Log("left turn");
        }
        if (Input.GetKey("d"))
        {
            this.transform.Rotate(Vector3.up, turnspeed * Time.deltaTime);
            // Debug.Log("right turn");
        }
    }

    void shoot()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            GameObject temBullet;
            temBullet = Instantiate(bullet, firePoint.transform.position, firePoint.transform.rotation) as GameObject;
            Rigidbody temRigBody;
            temRigBody = temBullet.GetComponent<Rigidbody>();
            temRigBody.AddForce(firePoint.transform.forward* shootForce);           
            Destroy(temBullet, 2);
 
        }
    }

    void emermy()
    {
        

        GameObject Ai1 = Instantiate(AI1, new Vector3(-19, 0, Random.Range(-20, 20)), Quaternion.Euler(0, 90, 0)) as GameObject;
        GameObject Ai2 = Instantiate(AI2, new Vector3(-19, 0, Random.Range(-20, 20)), Quaternion.Euler(0, 90, 0)) as GameObject;
        GameObject Ai3 = Instantiate(AI3, new Vector3(-19, 0, Random.Range(-20, 20)), Quaternion.Euler(0, 90, 0)) as GameObject;


    }
    void canva()
    {
        if (Input.GetKeyUp("g"))
        {
            if (contr == false)
            {
                help.GetComponent<Canvas>().enabled = true;
                contr = true;
            }
            else
            {
                help.GetComponent<Canvas>().enabled = false;
                contr = false;
            }                  
        }
        
        if (Input.GetKeyUp("r"))
        {
           emermy();
        }
        if (Input.GetKeyUp("t"))
        {
            if (contr2 == false)
            {
                info.GetComponent<Canvas>().enabled = false;
                contr2 = true;
            }
            else
            {
                info.GetComponent<Canvas>().enabled = true;
                contr2 = false;
            }
        }
    }
    void demage()
    {
        if (demaged)
        {    
            damageImage.color = flashColour;
        }   
        else
        {           
            damageImage.color = Color.Lerp(damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
        }
        demaged = false;
    }

    void OnTriggerEnter(Collider other)
    {

        if (other.gameObject.name == "bullet(Clone)")
        {
            health -= 10;
            shellExplosion.Play();
            damageImage.color = flashColour;
            currentHealth -= 1;
            healthSlider.value = currentHealth;
            demaged = true;
            if (health <= 0) Destroy(Aiorplay, 0.0f);
        }
       

    }
   


}
