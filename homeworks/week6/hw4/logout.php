<?
  // connect to my SQL
  require('./db/conn.php');

  $session = $_COOKIE['week5'];
  $removeSession = "DELETE FROM `users_certificate` WHERE `users_certificate`.`session` = '{$session}' ";
  
  // remove session from mySQL
  if ( $conn->exec($removeSession) ){
    // set Client's cookie expired right now
      setcookie("week5", "", time() - 3600);
      header("Location: ./index.php");
  }
  
?>