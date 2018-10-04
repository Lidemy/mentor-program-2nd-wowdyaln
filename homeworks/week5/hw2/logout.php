<?
  // connect to my SQL
  require('./db/conn.php');

  // set Client's cookie expired right now
  setcookie("week5", "", time() - 3600);
  header("Location: ./index.php");
  
?>