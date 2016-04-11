<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
include("mysql_connect.inc.php");

$score = $_POST['scoree'];
$id = $_SESSION['username'];
if($id != null)
{
       
        $sql = "insert into score (username,score) values ('$id','$score') ";
        if(mysql_query($sql))
        {
                echo '<script type="text/javascript">alert("Score recorded!");</script>';
                echo '<meta http-equiv=REFRESH CONTENT=2;url=mode.html>';
        }
        else
        {
                echo '<script type="text/javascript">alert("record fail...");</script>';
                echo '<meta http-equiv=REFRESH CONTENT=2;url=mode.html>';
        }
}
else
{
        echo 'No privilege';
        echo '<meta http-equiv=REFRESH CONTENT=2;url=mode.html>';
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
