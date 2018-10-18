<?
// conncet to mySQL
require_once './db/conn.php';
require_once './db/findUser.php';

// 預防 XSS 腳本寫入攻擊
$input_username = htmlspecialchars($_POST['username'], ENT_QUOTES);
// todo: 使用 php 的 $_SESSION['week'] ，不用資料庫存取。(目前全部自行寫邏輯去操作)
$user = findUserByUsername($conn, $input_username);
$hash = $user['password'];
$username = $user['username'];

// 前端的 password 經過hash 之後，跟 後端 hash 比對看看有沒有相同。
if ( password_verify($_POST['password'], $hash) ){
    // verify passed
    $findSession = "SELECT * FROM `users_certificate` WHERE `username` = '{$username}' ";
    $newSession = session_create_id();

  if ( $conn->query($findSession)->rowCount() === 1){
    $oldSession = $conn->query($findSession)->fetch(PDO::FETCH_ASSOC)['session'];
    $updateSession = "UPDATE `users_certificate` SET `session` = '{$newSession}' WHERE `users_certificate`.`session` = '{$oldSession}' ";
    $conn->query($updateSession);
    setcookie("week5", $newSession, time() + 60 * 60);
    header("Location: ./boots_layout.php");
    
  } else {
    $saveSession = "INSERT INTO `users_certificate` (`session`, `username`) VALUES ('{$newSession}', '{$username}')";
    $conn->query($saveSession);
    setcookie("week5", $newSession, time() + 60 * 60);
    header("Location: ./boots_layout.php");

  }


} else {
  echo 'login failed !';
  echo "<br> <a href=./index.php> index page </a>";
}


?>