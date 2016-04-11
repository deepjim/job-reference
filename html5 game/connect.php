<?php session_start(); ?>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php

include("mysql_connect.inc.php");
$id = $_POST['id'];
$pw = $_POST['pw'];

$sql = "SELECT * FROM member_table where username = '$id'";
$result = mysql_query($sql);
$row = @mysql_fetch_row($result);

if($id != null && $pw != null && $row[1] == $id && $row[2] == $pw)
{
    
        $_SESSION['username'] = $id;
        echo '<script type="text/javascript">alert("Log in success!");</script>';
     
	   echo '<meta http-equiv=REFRESH CONTENT=1;url=mode.html>';
}
else
{
        echo '<script type="text/javascript">alert("fail to log in!");</script>';
        echo '<meta http-equiv=REFRESH CONTENT=1;url=main.html>';
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