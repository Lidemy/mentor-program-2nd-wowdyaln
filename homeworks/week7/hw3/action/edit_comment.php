<?php
  require_once '../db/conn.php';
  require_once '../db/findUser.php';
  $username = findUserNameBySession($conn, $_COOKIE['week5']);

  $findUserId = "SELECT id FROM wowdyaln_users WHERE username = '{$user}'";
  $userId = findUserByUsername($conn, $username)['id'];
  // 預防 XSS 腳本寫入攻擊
  $comment = htmlspecialchars($_POST['main_comment'], ENT_QUOTES);

  // verify user id.
  $updateComment_stmt = $conn->prepare("UPDATE `wowdyaln_comments` SET `content` = ? WHERE `wowdyaln_comments`.`id` = ? AND wowdyaln_comments.user_id = ? ");
  if ( $updateComment_stmt->execute(array($comment, $_POST['comment_id'], $userId)) ){
    //INSERT INTO success
    header('Location: ' . $_SERVER['HTTP_REFERER']); // 轉到原本頁數
    // header("Location: ../boots_layout.php");

  } else {
    echo " Error. ";
  }
// mysql 不要自動更新 time stamp 。要設定一下：ALTER TABLE `wowdyaln_comments` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
?>
