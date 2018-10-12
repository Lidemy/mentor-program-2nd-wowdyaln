<?php
  require '../db/conn.php';
  // find a user according to Cookies.
  $findSession_stmt = $conn->prepare("SELECT * FROM users_certificate WHERE `session` = ? ");
  $findSession_stmt->execute(array($_COOKIE["week5"]));

  if ($findSession_stmt->rowCount() === 1){

  $findSession_stmt->setFetchMode(PDO::FETCH_ASSOC);
  $certificate = $findSession_stmt->fetch();
  $username = $certificate['username'];
  
  $findUser_stmt = $conn->prepare("SELECT * FROM users WHERE `username` = ? ");
  $findUser_stmt->execute(array($username));
  $findUser_stmt->setFetchMode(PDO::FETCH_ASSOC);
  $user = $findUser_stmt->fetch();
  $userId = $user['id'];
  
  // 預防 XSS 腳本寫入攻擊
  $comment = htmlspecialchars($_POST['main_comment'], ENT_QUOTES);
  
  $writeAcomment = "INSERT INTO `comments` (`id`, `content`, `created_at`, `user_id` ) VALUES (NULL, '$comment', CURRENT_TIMESTAMP, '$userId' )";
  
  if ( $conn->query($writeAcomment) ){
    // INSERT INTO success
  // header('Location: ' . $_SERVER['HTTP_REFERER']);
  // 返回首頁
  header("Location: ../board.php");
  } else {
    echo " sql Error ";
  }
  } else {
  
  echo " something Error ";
  }
  
?>
