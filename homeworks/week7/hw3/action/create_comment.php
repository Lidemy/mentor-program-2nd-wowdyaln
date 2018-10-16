<?php
  //conncet to mySQL
  require_once '../db/conn.php';
  require_once '../db/findUser.php';

  // find a user according to Cookies.
  $username = findUserNameBySession($conn, $_COOKIE['week5']);
  $user = findUserByUsername($conn, $username);
  $nickname = $user['nickname'];
  
  $raw_comment = $_POST['main_comment'];
  // 預防 XSS 腳本寫入攻擊
  $comment = htmlspecialchars($raw_comment, ENT_QUOTES);
  $writeAcomment_stmt = $conn->prepare("INSERT INTO `wowdyaln_comments` (`id`, `content`, `created_at`, `user_id` ) VALUES (NULL, ?, CURRENT_TIMESTAMP, ? ) ");
  
  if ( $writeAcomment_stmt->execute(array($comment, $_POST['user_id']))  ) {
    // INSERT INTO success ， response 傳回 last_id , nickname , created_at
    // *資料庫拿到 剛產生的 main comment id
    $lastId = $conn->lastInsertId();
    
    // *資料庫拿到 剛生出來 main comment 的 created_at （有沒有更快的方式？）
    $findCreatedAt = "SELECT * FROM `wowdyaln_comments` WHERE `id` = '$lastId' ";
    $created_at = $conn->query($findCreatedAt)->fetch(PDO::FETCH_ASSOC)['created_at'];
    
    // response 回去
    $arr = array('last_id' => $lastId, 'nickname' => $nickname, 'created_at' => $created_at);

    echo json_encode($arr);
  // header("Location: ../boots_layout.php");
  } else {
  echo " Error ";
  }
?>
