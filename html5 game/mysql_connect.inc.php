<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php

$db_server = "localhost";

$db_name = "numcrush";

$db_user = "root";

$db_passwd = "wingtat";

if(!@mysql_connect($db_server, $db_user, $db_passwd))
        die("fail to connect");


mysql_query("SET NAMES utf8");


if(!@mysql_select_db($db_name))
        die("cannot use that db");
?> 