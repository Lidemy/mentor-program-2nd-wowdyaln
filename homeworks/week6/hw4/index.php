<?php
require './db/conn.php';
// find a user according to Cookies.
$findSession_stmt = $conn->prepare("SELECT * FROM users_certificate WHERE `session` = ? ");
$findSession_stmt->execute(array($_COOKIE["week5"]));

if ($findSession_stmt->rowCount() === 1){
  echo "<h1>你已經登入</h1>
        <br>
        <a href=./board.php> 留言板 </a>
        ";
} else {
  echo " <h1>未登入</h1>
  <a href=./verify.php> 登入（註冊）頁面 </a>
  <br>
  <a href=./board.php> 留言板 </a>
  ";
}

?>