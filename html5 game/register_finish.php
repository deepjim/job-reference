<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
include("mysql_connect.inc.php");

$id = $_POST['id'];
$pw = $_POST['pw'];
$pw2 = $_POST['pw2'];




if($id != null && $pw != null && $pw2 != null && $pw == $pw2)
{
     
        $sql = "insert into member_table (username, password) values ('$id', '$pw')";
        if(mysql_query($sql))
        {
           $sql2 = "insert into score (username, score) values ('$id', '0')";
           mysql_query($sql2);
                echo '<script type="text/javascript">alert("Create ID success!");</script>';
                echo '<meta http-equiv=REFRESH CONTENT=2;url=main.html>';
        }
        else
        {
                echo '<script type="text/javascript">alert("Create fail!");</script>';
                echo '<meta http-equiv=REFRESH CONTENT=2;url=register.html>';
        }
}
else
{
        echo '<script type="text/javascript">alert("Wrong!");</script>';
        echo '<meta http-equiv=REFRESH CONTENT=2;url=register.html>';
}
?>
<!DOCTYPE html>
<html >
	<head>
		<meta charset="utf-8">
       <meta name="viewport" content="user-scalable=no, width=device-width /">
		<title>NumCrush-register</title>
               <link rel="stylesheet" href="css/main.css" type="text/css"/>
             <script type="text/javascript" src="js/numcrush.js"></script>
	
	</head>

	<body>
    <div id="tit">
    <img src="numcrush/tit.png"  />
    </div>
    
   
	
    
	</body>
</html>
