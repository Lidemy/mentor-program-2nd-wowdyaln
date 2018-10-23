<?
session_start();

function autoLogin($connection, $input_username, $password){

  $user = findUserByUsername($connection, $input_username);
  $hash = $user['password'];
  $username = $user['username'];

  // 前端的 password 經過 hash 之後，跟 後端 hash 比對看看有沒有相同。
  if ( password_verify($password, $hash) ){
      $_SESSION['username'] = $username;
  } else {
  echo 'login failed !';
  }
}

?>