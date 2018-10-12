<?
// conncet to mySQL
require('./db/conn.php');

// todo: 使用 php 的 $_SESSION['week'] ，存在記憶體不用資料庫存取。(目前全部自行寫邏輯去操作)
// password 要經過 hash function ，然後去對比 hash

$findUser = "SELECT * FROM users WHERE username = ? ";
$findUser_stmt = $conn->prepare($findUser);
$findUser_stmt->execute( array($_POST['username']) );

$findUser_stmt->setFetchMode(PDO::FETCH_ASSOC);

// username 只有唯一一個
if ($findUser_stmt->rowCount() === 1){

  $user = $findUser_stmt->fetch();  
  
  if ( password_verify($_POST['password'], $user['password'])){

    $findExistSession_stmt = $conn->prepare("SELECT `session` FROM `users_certificate` WHERE `username` = ? ");
    $findExistSession_stmt->execute(array($_POST['username']));
    $username = $user['username'];
    // 如果 user 之前已經有留 session 在資料庫，先砍掉
    if( $findExistSession_stmt->rowCount() ){
      // echo "exist !!!";
      $removeSession = "DELETE FROM users_certificate WHERE username = '$username' ";
      $conn->exec($removeSession);
    }
    
    $newSession = session_create_id();
    
    $saveSession = "INSERT INTO `users_certificate` (`session`, `username`) VALUES ('{$newSession}', '{$username}')";
    $conn->exec($saveSession);
    
    // setcookie($name, $value, $expire);
    setcookie("week5", $newSession, time() + 60 * 60);
  }
  echo "<h2>登入成功</h2>  {$username}  你好！";
} else {
  echo 'login failed !';
}
  
echo "<br> <a href=./index.php> index page </a>";

?>