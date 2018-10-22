<?php
session_start();

require_once '../db/conn.php';
require_once '../db/findUser.php';

// find a user according to Cookies.
$user = findUserByUsername($conn, $_SESSION['username']);
$userId = $user['id'];

// 預防 XSS 腳本寫入攻擊
$comment = htmlspecialchars($_POST['sub_comment'], ENT_QUOTES);
$write_subComment_stmt = $conn->prepare("INSERT INTO `sub_comments` (`id`, `comment_id`, `sub_content`, `created_at`, `user_id`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, ? )");

if ( $write_subComment_stmt->execute(array($_POST['comment_id'], $comment, $userId)) ) {
  // INSERT INTO success
  header('Location: ' . $_SERVER['HTTP_REFERER']);
  // todo: sub_comment 還會重新刷新頁面，做成 ajax
} else {
    echo " Error. ";
}
?>
