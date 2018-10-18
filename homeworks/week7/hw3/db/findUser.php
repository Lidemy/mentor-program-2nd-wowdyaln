<?

function findUserNameBySession($connection, $cookie){
  $findUser = "SELECT * FROM users_certificate WHERE session = ? ";
  $findUser_stmt = $connection->prepare($findUser);
  $findUser_stmt->execute(array($cookie));
  $findUser_stmt->setFetchMode(PDO::FETCH_ASSOC);
  $user = $findUser_stmt->fetch();

  return $user['username'];  //* user's username.

}

function findUserByUsername($connection, $username){
  $findUserInfo = "SELECT * FROM `users` WHERE `username` = ? ";
  $findUserInfo_stmt = $connection->prepare($findUserInfo);
  $findUserInfo_stmt->execute(array($username));
  $findUserInfo_stmt->setFetchMode(PDO::FETCH_ASSOC);

  return $findUserInfo_stmt->fetch();  //* A user.

}


function findUserById($connection, $user_id){
  $findUserInfo = "SELECT * FROM `users` WHERE `id` = ? ";
  $findUserInfo_stmt = $connection->prepare($findUserInfo);
  $findUserInfo_stmt->execute(array($user_id));
  $findUserInfo_stmt->setFetchMode(PDO::FETCH_ASSOC);

  return $findUserInfo_stmt->fetch(); //* A user.


}


?>