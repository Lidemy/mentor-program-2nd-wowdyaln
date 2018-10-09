<?
  // connect to my SQL
  require('./db/conn.php');

  $session = $_COOKIE['week5'];
  $removeSession = "DELETE FROM `wowdyaln_users_certificate` WHERE `wowdyaln_users_certificate`.`session` = '{$session}' ";
  
  // remove session from mySQL
  if ( $conn->query($removeSession) ){
    // set Client's cookie expired right now
      setcookie("week5", "", time() - 3600);
      header("Location: ./index.php");
  }
  // todo: 如果 user cookie 逾時而登出，在資料庫的 session 還會保留住，因此資料庫要定時把 session 清空才安全
?>