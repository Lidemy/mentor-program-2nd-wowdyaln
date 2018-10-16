<?
function autoLogin($connection, $input_username, $password){

  $user = findUserByUsername($connection, $input_username);
  $hash = $user['password'];
  $username = $user['username'];

  // 前端的 password 經過hash 之後，跟 後端 hash 比對看看有沒有相同。
  if ( password_verify($password, $hash) ){
      $newSession = session_create_id();
      $saveSession = "INSERT INTO `wowdyaln_users_certificate` (`session`, `username`) VALUES ('{$newSession}', '{$username}')";
      $connection->query($saveSession);
      setcookie("week5", $newSession, time() + 60 * 60);

  } else {
  echo 'login failed !';
  }
}

?>