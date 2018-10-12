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

    $findComment_userId_stmt = $conn->prepare("SELECT `user_id` FROM comments WHERE id = ? ");
    $findComment_userId_stmt->execute(array($_POST['comment_id']));
    $findComment_userId_stmt->setFetchMode(PDO::FETCH_ASSOC);
    $comment = $findComment_userId_stmt->fetch();
    $comment_userId = $comment['user_id'];

    // verify user id.
    if ($comment_userId === $userId) {
        $deleteComment_stmt = $conn->prepare("DELETE FROM `comments` WHERE `comments`.`id` = ? ");
        $delete_subComment_stmt = $conn->prepare("DELETE FROM `sub_comments` WHERE `sub_comments`.`comment_id` = ? ");

        if (  $deleteComment_stmt->execute(array($_POST['comment_id']))
            &&
            $delete_subComment_stmt->execute(array($_POST['comment_id']))  ) {
            // DELETE success
            // 返回原來頁面
            header('Location: ' . $_SERVER['HTTP_REFERER']);

        } else {
            echo " Error: {$conn->error} :
                sql: {$updateComment}  ";
        }
    } else {
        var_dump($comment_userId);
        var_dump($userId);
        // header("Location: ../index.php");
    }
  }
?>
