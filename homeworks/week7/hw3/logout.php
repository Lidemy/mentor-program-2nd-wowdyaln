<?
  // connect to my SQL
  require_once('./db/conn.php');

  $session = $_COOKIE['week5'];
  $removeSession_stmt = $conn->prepare("DELETE FROM `wowdyaln_users_certificate` WHERE `wowdyaln_users_certificate`.`session` = ? ");
  
  if ( $removeSession_stmt->execute(array($_COOKIE['week5'])) ){
    // remove session from mySQL success.
    // set Client's cookie expired right now
      setcookie("week5", "", time() - 3600);
      header("Location: ./index.php");
  }
  
?>