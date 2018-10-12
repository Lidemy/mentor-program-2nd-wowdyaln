<!-- main comment -->
<?php
  require '../db/conn.php';

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

    $findComment_userId_stmt = $conn->prepare("SELECT `user_id` FROM comments WHERE id = ? ");
    $findComment_userId_stmt->execute(array($_POST['comment_id']));
    $findComment_userId_stmt->setFetchMode(PDO::FETCH_ASSOC);
    $comment = $findComment_userId_stmt->fetch();
    $comment_userId = $comment['user_id'];

    // verify user id.
    if ($comment_userId === $userId){
      // 預防 XSS 腳本寫入攻擊
      $comment = htmlspecialchars($_POST['main_comment'], ENT_QUOTES);
      $updateComment_stmt = $conn->prepare("UPDATE `comments` SET `content` = ? WHERE `comments`.`id` = ? ");

      if ( $updateComment_stmt->execute(array($comment, $_POST['comment_id'])) ) {
        // INSERT INTO success
        // header("Location: ../board.php");
        header('Location: ' . $_SERVER['HTTP_REFERER']);
      } else {
      echo " Error: {$conn->error} :
                sql: {$updateComment}  ";
      }

    } else {
      var_dump ($comment_userId);
      var_dump ($userId);

    }
}

?>
