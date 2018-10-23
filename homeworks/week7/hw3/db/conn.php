<?
$db_host = "";
$db_name = "";
$db_user = "";
$db_password = "";


$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";

try {
    $conn = new PDO( $dsn, $db_user, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query("SET time_zone= '+08:00'");

} catch (PDOException $e){
    echo "connection failed: {$e->getMessage()} ";
}

?>