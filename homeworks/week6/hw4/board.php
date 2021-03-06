<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" type="text/css" media="screen" href="./css/main.css" />

  <title>message board</title>
</head>
<body>
    <span class="loginStatus"> 
    <?php
    require './db/conn.php';

    $un = false;   //current user's name
    $unId = false; //current user's id

    if ( isset($_COOKIE["week5"]) ){
      $findUsername = "SELECT * FROM users_certificate WHERE `session` = ? ";
      $findUsername_stmt = $conn->prepare($findUsername);
      $findUsername_stmt->execute(array($_COOKIE["week5"]));
      $findUsername_stmt->setFetchMode(PDO::FETCH_ASSOC);
      $user = $findUsername_stmt->fetch();
      
      $un = $user['username'];
      
      $findUserInfo = "SELECT * FROM `users` WHERE `username` = ? ";
      $findUserInfo_stmt = $conn->prepare($findUserInfo);
      $findUserInfo_stmt->execute(array($un));
      $findUserInfo_stmt->setFetchMode(PDO::FETCH_ASSOC);
      $userInfo = $findUserInfo_stmt->fetch();
      
      $unId = $userInfo['id'];
      $nk = $userInfo['nickname'];

      echo "login ✅ <br>
            Hi ! $un <br>
            ($nk) <br>
      <a href=./logout.php>登出</a>";
    } else {
      echo "login ❌
      <br>
      要登入才能留言
      <br>
      <a href=./verify.php>登入頁面</a>
      ";
    }
    
    ?>
    </span>
  <div class="container">
<?php
    if ( $un ){
      echo "
    <!-- write a main comment -->
    <form action=./action/create_comment.php method=post>
      <div class=container__input>
      <h2>輸入主留言</h2>
          <label for=main_comment>Comment</label>
          <textarea rows=5 cols=30 name=main_comment id=main_comment required></textarea>
          <input type=hidden name=user_id value={$unId}>
          <button type=submit>submit</button>
      </div>
    </form>";
    }
    
// howManyComments
$howManyComments_sql = "SELECT COUNT(id) AS comment_count FROM comments";
$res = $conn->query($howManyComments_sql);
$comments_count = $res->fetch(PDO::FETCH_ASSOC);
// how many pages ?
$pages_count = ceil( $comments_count['comment_count'] / 10);

// 設定目前頁數
if (!isset($_GET['page'])){
   $current_page = 1; 
  } else {
    $current_page = $_GET['page'];
  }
$from = ($current_page-1)*10;
  // read 10 main comments depend on current page.
  
$readAll = "SELECT * FROM `comments` ORDER BY created_at DESC LIMIT 10 OFFSET {$from} ";
$result = $conn->query($readAll);
    
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      $id = $row["id"];
      $main_user_id = $row["user_id"];
      $content = $row["content"];
      $created_at = $row["created_at"];

      $findAuthorInfo_sql = "SELECT * FROM `users` WHERE `id` = ? ";
      $findAuthorInfo_stmt = $conn->prepare($findAuthorInfo_sql);
      $findAuthorInfo_stmt->execute(array($main_user_id));
      $findAuthorInfo_stmt->setFetchMode(PDO::FETCH_ASSOC);
      $author = $findAuthorInfo_stmt->fetch();

      $nickname = $author['nickname'];

echo "<div class=container__box>main comment {$id}。 at : {$created_at}
          <div class=box__nickname>暱稱：{$nickname}</div>
          <div class=box__content>留言：<p>{$content}</p></div>";
          if ( $unId === $main_user_id) {

            echo "
            <form action=./edit.php method=post>
              <input type=hidden name=comment_id value={$id}>
              
              <input type=hidden name=comment_content value='{$content}'>
              <button>EDIT</button>
            </form>

            <form action=./action/delete_comment.php method=post>
              <input type=hidden name=comment_id value={$id}>
              <button style='background-color: red;' class=delete >DELETE</button>
            </form>";
          }



// read all sub_comments from mySQL
$read_subAll_sql = "SELECT * FROM `sub_comments` WHERE comment_id = $id ORDER BY created_at DESC";
// $read_subAll_sql = "SELECT * FROM `sub_comments` WHERE comment_id = $id ORDER BY created_at DESC";
$read_subAll_sql_stmt = $conn->prepare($read_subAll_sql);
$read_subAll_sql_stmt->execute(array($id));

// $sub_result = $read_subAll_sql_stmt->fetch(PDO::FETCH_ASSOC);

// if ($sub_result->num_rows > 0) {
    while ($sub_result = $read_subAll_sql_stmt->fetch(PDO::FETCH_ASSOC) ) {
        $sub_id = $sub_result["id"];
        $sub_user_id = $sub_result["user_id"];
        $sub_content = $sub_result["sub_content"];
        $created_at = $sub_result["created_at"];


        $findAuthorInfo = "SELECT * FROM `users` WHERE `id` = ? ";
        $findAuthorInfo_stmt = $conn->prepare($findAuthorInfo);
        $findAuthorInfo_stmt->execute(array($sub_user_id));


        // $findAuthorInfo = "SELECT * FROM `users` WHERE `id` = '{$sub_user_id}'";
        $sub_author = $findAuthorInfo_stmt->fetch(PDO::FETCH_ASSOC);
        $sub_nickname = $sub_author['nickname'];
        
        // 原作者在自己的留言底下回覆的話，背景會顯示不同的顏色
        if ( $sub_user_id === $main_user_id){
          echo "<!-- sub comment -->
          <div class=box__authorReply>
            <div class=reply__nickname>{$sub_nickname}  at: {$created_at}</div>
            <div class=reply__content>{$sub_content}</div>
          </div>";

        } else {

          echo "<!-- sub comment -->
            <div class=box__reply>
              <div class=reply__nickname>{$sub_nickname}  at: {$created_at}</div>
              <div class=reply__content>{$sub_content}</div>
            </div>";
        }
    }
// }
          if ( $un ){
          echo"
          <!-- write a sub comment here -->
          <form action=./action/create_sub_comment.php method=post>
            <div class=container__input>
              <h2>子留言</h2>
              <label for=sub_comment>Comment</label>
              <textarea rows=5 cols=30 name=sub_comment id=sub_comment required></textarea>
              <input type=hidden name=comment_id value={$id}>
              <input type=hidden name=user_id value={$unId}>
              <button type=submit>submit</button>
            </div>
          </form>";
          }

        echo "</div>";
        }
      // }
  ?>
  </div>

  <div class="page">
        <? // pages
          for ($i=1; $i <= $pages_count; $i++){
            if($i === $current_page){
              echo "<b>{$i}</b>";
            } else {
              echo "<a href=board.php?page={$i}>{$i}</a>";
            }
          }
        ?>
  </div>

  <script src="./js/main.js"></script>
</body>
</html>