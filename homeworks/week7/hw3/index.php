<?php
session_start();

if ( isset($_SESSION['username'])){
  echo "<h1>Hello, {$_SESSION['username']} ! 你已經登入</h1>
        <br>
        <a href=./boots_layout.php>前往 Minty 留言板 </a>
        ";
} else {
  echo " <h1>未登入</h1>
  <a href=./verify.php> 登入（註冊）頁面 </a>
  <br>
  <a href=./boots_layout.php>前往 Minty 留言板 </a>
  ";
}
?>