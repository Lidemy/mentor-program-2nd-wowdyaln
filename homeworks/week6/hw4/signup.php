<?
require('./db/conn.php');
// password 要經過 hash function，存 hash 進資料庫。
$hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

$signup_stmt = $conn->prepare("INSERT INTO `users` (`id`, `username`,nickname, `password`) VALUES (NULL, ?, ?, ? )");

if ( $signup_stmt->execute(array($_POST['username'], $_POST['nickname'], $hash)) ) {
  echo "New user created successfully 
  <h3>註冊成功！ 請重新登入。</h3>
  ";
} else {
    echo " Error ";
}

echo "<br> <a href=./board.php> 留言板 </a>";
?>