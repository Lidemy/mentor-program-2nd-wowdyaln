<?php

require '../db/conn.php';
// find a user according to Cookies.
$findSession_stmt = $conn->prepare("SELECT * FROM users_certificate WHERE `session` = ? ");
$findSession_stmt->execute(array($_COOKIE["week5"]));

if ($findSession_stmt->rowCount() === 1){
$findSession_stmt->setFetchMode(PDO::FETCH_ASSOC);
$certificate = $findSession_stmt->fetch();

  $username = $certificate['username'];
  // echo "$username";
  $findUser_stmt = $conn->prepare("SELECT * FROM users WHERE `username` = ? ");
  $findUser_stmt->execute(array($username));
  $findUser_stmt->setFetchMode(PDO::FETCH_ASSOC);
  $user = $findUser_stmt->fetch();
  $userId = $user['id'];
  
  // 預防 XSS 腳本寫入攻擊
  $sub_comment = htmlspecialchars($_POST['sub_comment'], ENT_QUOTES);
  $write_subComment_stmt = $conn->prepare("INSERT INTO `sub_comments` (`id`, `comment_id`, `sub_content`, `created_at`, `user_id`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, ? )");
  if( $write_subComment_stmt->execute(array($_POST['comment_id'], $sub_comment, $userId))  ){
    // INSERT INTO success
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    // header("Location: ../board.php");
  } else {
      echo "sql Error ";
  }
} else {
  echo " something Error ";

}

?>
  