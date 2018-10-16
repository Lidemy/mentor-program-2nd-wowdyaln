<?php
// todo: 確定刪除？的提示. 要有刪除成功的提示。

  require_once '../db/conn.php';
  require_once '../db/findUser.php';

  // find a user according to Cookies.
  $username = findUserNameBySession($conn, $_COOKIE['week5']);
  $user = findUserByUsername($conn, $username);
  $userId = $user['id'];

  $deleteComment_stmt = $conn->prepare("DELETE FROM `wowdyaln_comments` WHERE `wowdyaln_comments`.`id` = ? AND wowdyaln_comments.user_id = ? ");
  $delete_subComment_stmt = $conn->prepare("DELETE FROM `wowdyaln_sub_comments` WHERE `wowdyaln_sub_comments`.`comment_id` = ? ");

  if ( $deleteComment_stmt->execute(array($_POST['comment_id'], $userId)) 
      &&
      $delete_subComment_stmt->execute(array($_POST['comment_id']))  ) {
        // DELETE success
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        
  } else {
    echo " Error. ";
  }

?>
