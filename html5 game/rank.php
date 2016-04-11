<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="user-scalable=no, width=device-width /">
<title>NumCrush-rank</title>
<link rel="stylesheet" href="css/main.css" type="text/css"/>
<script type="text/javascript" src="js/numcrush.js"></script>

</head>

<body>

<div id="tit">
    <img src="numcrush/tit.png"  />
    </div>
	<div id = "rankk">
	<a id="top10">TOP 10 </a></br></br>
  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
include("mysql_connect.inc.php");

if($_SESSION['username'] != null)
{
        
        $result = mysql_query("SELECT username,MAX(score) FROM score GROUP BY username ORDER BY MAX(score) DESC LIMIT 10") ;  
		 
                echo "<table id ='tab1' border='1'>";
        echo "<tr> <th>Username</th> <th>Highest Score</th> </tr>";
        // keeps getting the next row until there are no more to get
    
        while($row = mysql_fetch_array( $result )) {
     	// Print out the contents of each row into a table
	    echo "<tr><td>"; 
	    echo $row['username'];
	    echo "</td><td>"; 
	    echo $row['MAX(score)'];
	    echo "</td></tr>"; 
} 

echo "</table>";

}else
{
        echo 'No privilege';
        echo '<meta http-equiv=REFRESH CONTENT=2;url=main.html>';
}


?>
</div>


<div id=""ret"">
 <a href="mode.html" target="_parent"><button id="ret1">
	 <img src="numcrush/rtn.png"  /></button></a>
</div>
</body>
</html>	
 









