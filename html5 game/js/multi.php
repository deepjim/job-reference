<?php
if(isset($_POST['action'])){
$dbc=mysqli_connect('fdb13.biz.nf','1853019_deep','wingtat1','1853019_deep') or die(mysqli_error());
$id = $_SESSION['username'];
if($_POST['action']=="getgrid"){
	$target=$_POST['target'];
	$s=array();
	$result=mysqli_query($dbc,"SELECT data FROM grid WHERE user=$target");
	for ($k=0;$k<100;$k++){
		$recent=$result[$k];
		array_push($s,$recent);
	}
	echo json_encode($s,JSON_UNESCAPED_UNICODE);
}
else if($_POST['action']=="getsignal"){
	$target=$_POST['target'];
	$result=mysqli_query($dbc,"SELECT signal FROM member_table WHERE NO=$target");
	echo $result;
}
else if($_POST['action']=="getscore"){
	$target=$_POST['target'];
	$s=array();
	$result=mysqli_query($dbc,"SELECT cursc FROM member_table WHERE user=$target");
	echo $result;
}
else if($_POST['action']=="getsel"){
	$target=$_POST['target'];
	$s=array();
	$result=mysqli_query($dbc,"SELECT data FROM sel WHERE user=$target");
	for ($k=0;$k<100;$k++){
		$recent=$result[$k];
		array_push($s,$recent);
	}
	echo json_encode($s,JSON_UNESCAPED_UNICODE);
}
else if($_POST['action']=="updateg"){
	$score=$_POST['curscore'];
	$result=mysqli_query($dbc,"UPDATE FROM member_table SET cursc=$score WHERE NO=$id");
	$grid=json_decode($_POST['grid']);
	$sel=json_decode($_POST['select']);
	$result=mysqli_query($dbc,"UPDATE FROM member_table SET signal=1 WHERE NO=$id");
	$result=mysqli_query($dbc,"DELETE FROM grid WHERE user=$id");
	$result=mysqli_query($dbc,"DELETE FROM sel WHERE user=$id");
	for ($k=0;$k<count($grid);$k++){
		$recent=$grid[$k];
		$result=mysqli_query($dbc,"INSERT INTO grid VALUES (data=$recent,user=$id)");
	}
	for ($k=0;$k<count($sel);$k++){
		$recent=$sel[$k];
		$result=mysqli_query($dbc,"INSERT INTO sel VALUES (data=$recent,user=$id)");
	}
}
else if($_POST['action']=="update"){
	$sel=json_decode($_POST['select']);
	$result=mysqli_query($dbc,"UPDATE FROM member_table SET signal=1 WHERE NO=$id");
	$result=mysqli_query($dbc,"DELETE FROM sel WHERE user=$id");
	for ($k=0;$k<count($sel);$k++){
		$recent=$sel[$k];
		$result=mysqli_query($dbc,"INSERT INTO sel VALUES (data=$recent,user=$id)");
	}
}
?>