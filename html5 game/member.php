<?php session_start(); ?>
<!DOCTYPE html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="user-scalable=no, width=device-width /">
<title>NumCrush-member</title>
<link rel="stylesheet" href="css/main.css" type="text/css"/>
<script type="text/javascript" src="js/numcrush.js"></script>

</head>

<body >

<div id="tit">
    <img src="numcrush/tit.png"  />
    </div>
	<div id="member">
   
    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
include("mysql_connect.inc.php");

if($_SESSION['username'] != null)
{
        
    
   
		$id = $_SESSION['username'];
                $sql = "SELECT * FROM member_table where username='$id'";
        $result = mysql_query($sql);
        while($row = mysql_fetch_row($result))
        {
                 echo  " ID($row[0])：$row[1] <br><br>" ;
        }
		$sql2 = "SELECT SUM(score) FROM score where username='$id' GROUP BY '$id'";
		$result2 = mysql_query($sql2);
		$row2 = mysql_fetch_row($result2);
		echo  " Total score: $row2[0]<br>" ;
                $sql3 = "SELECT MAX(score) FROM score where username='$id' ";
		$result3 = mysql_query($sql3);
		$row3 = mysql_fetch_row($result3);
		echo  " Highest score: $row3[0]" ;
                
                
}else
{
        echo 'No privilege';
        echo '<meta http-equiv=REFRESH CONTENT=2;url=main.html>';
}


?>
</div>


 <a href="mode.html" target="_parent"><button id="ret1">
	 <img src="numcrush/rtn.png"  /></button></a>
</div>
</body>
</html>	
 









