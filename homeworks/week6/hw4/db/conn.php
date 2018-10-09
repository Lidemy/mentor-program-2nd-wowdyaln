<?
$servername = "localhost";
$username = "";
$password = "";
$dbname = "";

// create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->query("SET NAMES 'UTF8'");
$conn->query("SET time_zone = '+08:00' ");


// check connection
if ($conn->connect_error) {
    die("connection failed: " . $conn->connect_error);
};

?>



