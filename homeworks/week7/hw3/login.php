<?
session_start();
require_once './db/conn.php';
require_once './db/findUser.php';

// 預防 XSS 腳本寫入攻擊
$input_username = htmlspecialchars($_POST['username'], ENT_QUOTES);
$user = findUserByUsername($conn, $input_username);
$hash = $user['password'];
$username = $user['username'];

// 前端的 password 經過hash 之後，跟 後端 hash 比對看看有沒有相同。
if ( password_verify($_POST['password'], $hash) ){
  // verify passed
  // 使用 php 的 $_SESSION，不透過資料庫存取。
    $_SESSION['username'] = $username;

    header("Location: ./boots_layout.php");

} else {
  echo 'login failed !';
  echo "<br> <a href=./verify.php> 登入（註冊）頁面 </a>";
}

?>