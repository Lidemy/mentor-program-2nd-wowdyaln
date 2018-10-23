<?php
  session_start();

  require_once '../db/conn.php';
  require_once '../db/findUser.php';

  // find a user according to Cookies.
  $user = findUserByUsername($conn, $_SESSION['username']);
  $userId = $user['id'];

  $deleteComment_stmt = $conn->prepare("DELETE FROM `comments` WHERE `comments`.`id` = ? AND comments.user_id = ? ");
  $delete_subComment_stmt = $conn->prepare("DELETE FROM `sub_comments` WHERE `sub_comments`.`comment_id` = ? ");

  if ( $deleteComment_stmt->execute(array($_POST['comment_id'], $userId)) 
      &&
      $delete_subComment_stmt->execute(array($_POST['comment_id']))  ) {
        // DELETE success
        return;
  } else {
    echo " Error. ";
  }

?>
