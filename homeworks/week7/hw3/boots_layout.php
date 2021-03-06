<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/minty/bootstrap.min.css" rel="stylesheet" integrity="sha384-Qt9Hug5NfnQDGMoaQYXN1+PiQvda7poO7/5k4qAmMN6evu0oDFMJTyjqaoTGHdqf" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" media="screen" href="./css/boots_layout.css">
  <title>Minty board</title>
</head>
<?php
  session_start();

  //conncet to mySQL
  require_once './db/conn.php';
  require_once './db/findUser.php';

  $username = false;   //current user's name
  $unId = false;       //current user's id
  
  if ( isset($_SESSION['username']) ){ // find a user according to Cookies.
    $username = $_SESSION['username'];
    $unId = findUserByUsername($conn, $username)['id'];
    $nk = findUserByUsername($conn, $username)['nickname'];
  }
?>
<body class="mt-5">
  <!-- navbar -->
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="./boots_layout.php">留言板</a>
    <span class="navbar-text">
        <?
        if ($username) {
          echo "已登入 ✅  Hello! $username ( $nk )";
        } else {
          echo "未登入 ❌  要登入才能留言 ";
        }
        ?>
    </span>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <?
        if (!$username) {
          echo "
          <li class=nav-item>
            <a class=nav-link href=./verify.php>登入</a>
          </li>
          ";
        }
        if ($username) {
          echo "
          <li class=nav-item>
          <a class=nav-link href=./logout.php>登出</a>
          </li>";
        }
        ?>
      </ul>
    </div>
  </nav> 

<div class="container">
    <!-- you can send main comment if login -->
    <?php
      if ( $username ){
          echo "
            <div id='main-comment-box' class='card border-primary row justify-content-center sticky-top'>
              <div class='card-header'>
                <h4 class='text-center'>輸入主留言</h4>
              </div>
              <div class='card-body'>
                  <form id=comment_ajax action=./action/create_comment.php method=post>
                    <label for=main_comment>Main Comment</label>
                    <textarea class=form-control rows=2 name=main_comment id=main_comment placeholder='type comment here' required></textarea>
                    <input type=hidden name=user_id value={$unId}>
                    <button type=submit class='btn btn-outline-primary btn-lg btn-block mt-3'>送出</button>
                  </form>
              </div>
            </div>
            ";
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

          $nickname = findUserById($conn, $main_user_id)['nickname'];        

          echo "<div class='card border-success mt-3'>
                  <div class=card-header>
                    main comment {$id}。Post at : {$created_at}
                  </div>
                  <div class=card-body>
                    <h4 class=card-title>暱稱：{$nickname}</h4>
                    <h5>{$content}</h5>
                  </div>
                ";

          if ( $unId === $main_user_id) {
                        echo "
                        <div class='d-flex justify-content-around'>
                            <div>
                            <!-- Button trigger modal -->
                            <button type=button class='btn btn-outline-warning' data-toggle='modal' data-target='#editModal{$id}'>編輯主留言</button>
                            </button>

                            <!-- Modal -->
                            <div class='modal fade' id='editModal{$id}' tabindex='-1' role='dialog' aria-labelledby='editModalLabel' aria-hidden='true'>
                              <div class='modal-dialog' role='document'>
                                <div class='modal-content'>
                                  <div class='modal-header'>
                                    <h5 class='modal-title' id='editModalLabel'>編輯 主留言</h5>
                                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                                      <span aria-hidden='true'>&times;</span>
                                    </button>
                                  </div>
                                <form>
                                                            <!-- <form action=./action/edit_comment.php method=post> -->
                                  <div class='modal-body'>
                                    <label for=main_comment class=mb-0>主留言</label>
                                    <textarea class=form-control rows=2 name=main_comment required>{$content}</textarea>
                                  </div>
                                  <div class='modal-footer'>
                                      <input type=hidden name=comment_id class=comment_id value={$id}>
                                      <button type=submit class='btn btn-primary' data-dismiss='modal'>送出</button>
                                      <button type='button' class='btn btn-secondary' data-dismiss='modal'>取消</button>
                                  </div>
                                </form>
                                  </div>
                              </div>
                            </div>
                          </div>   
                        <div>
                            <!-- Button trigger modal -->
                            <button type=button class='btn btn-outline-danger' data-toggle='modal' data-target='#deleteModal{$id}'>刪除主留言</button>
                            </button>

                            <!-- Modal -->
                            <div class='modal fade' id='deleteModal{$id}' tabindex='-1' role='dialog' aria-labelledby='deleteModalLabel' aria-hidden='true'>
                              <div class='modal-dialog' role='document'>
                                <div class='modal-content'>
                                  <div class='modal-header'>
                                    <h5 class='modal-title' id='deleteModalLabel'>確定刪除 主留言？</h5>
                                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                                      <span aria-hidden='true'>&times;</span>
                                    </button>
                                  </div>
                                  
                                  <form>
                                                            <!-- <form action=./action/delete_comment.php method=post> -->

                                  <div class='modal-body'>
                                      <p>{$content}</p>
                                      <span aria-hidden='true'>子留言也會一併刪除。刪除之後無法復原，確定嗎？</span>
                                      
                                  </div>
                                  <div class='modal-footer'>
                                      <input type=hidden name=comment_id value={$id}>
                                      <button type=submit class='btn btn-danger' data-dismiss='modal'>確定</button>
                                      <button type='button' class='btn btn-info' data-dismiss='modal'>取消</button>
                                  </div>
                                </form>
                                </div>
                              </div>
                            </div>
                      </div>
                            
                  </div>
                          ";
                  }

            // read all sub_comments from mySQL
            $read_subAll = "SELECT * FROM `sub_comments` WHERE comment_id = $id ORDER BY created_at DESC";
            $sub_result = $conn->query($read_subAll);

            // if ($sub_result->num_rows > 0) {
                while ($sub_row = $sub_result->fetch(PDO::FETCH_ASSOC)) {
                    $sub_id = $sub_row["id"];
                    $sub_user_id = $sub_row["user_id"];
                    $sub_content = $sub_row["sub_content"];
                    $created_at = $sub_row["created_at"];

                    $sub_nickname = findUserById($conn, $sub_user_id)['nickname'];

                    echo "
                          <div class='row justify-content-center'>
                    ";
                    // 原作者在自己的留言底下回覆的話，背景會顯示不同的顏色
                    if ($sub_user_id === $main_user_id) {
                        echo "<!--author's sub comment -->
                                <div class='card border-danger col-8'>
                                  <div class=card-body>
                                    <h4 class='card-title text-center'>Author: {$sub_nickname} </h4>
                                    <p class=card-text>reply at: {$created_at}</p>
                                    <p class=card-text>{$sub_content}</p>
                                  </div>
                                </div>
                          ";
                    } else {
                        echo "<!-- sub comment -->
                              <div class='card border-warning col-10'>
                                <div class=card-body>
                                  <p class=card-text>reply at: {$created_at}</p>
                                  <h5 class=card-title>{$sub_nickname} :</h5>
                                  <p class=card-text>{$sub_content}</p>
                                </div>
                              </div>
                        ";
                    }
                    echo "
                      </div>
                    ";
                }
            
            if ($username) {
                echo "
                    <!-- write a sub comment here -->
                    <div class='row justify-content-center'>
                      <div class='card bg-light col-10 mb-3'>
                        <form action=./action/create_sub_comment.php method=post>
                          <fieldset>
                            <h4 class='text-center font-weight-light mt-3 mb-0'>子留言</h4>
                              <div class=form-group>
                                <label for=sub_comment class=mb-0>reply</label>
                                <textarea class=form-control rows=5 cols=30 name=sub_comment id=sub_comment required></textarea>
                              </div>

                              <div class=form-group>
                                <input type=hidden name=comment_id value={$id}>
                                <input type=hidden name=user_id value={$unId}>
                                <button type=submit class='btn btn-primary'>送出</button>
                              </div>

                          </fieldset>
                        </form>
                      </div>
                    </div>
                        ";
            }

            echo "</div>";
        }
    ?>

  <div class='fixed-bottom'>
    <ul class="pagination justify-content-start">
    <? // pages
      for ($i=1; $i <= $pages_count; $i++){
        if($current_page == $i){    // !: 小心兩者型別不同 不能使用 '===' 
          echo "
          <li class='page-item active'>
            <a class=page-link href=boots_layout.php?page={$i}>{$i}</a>
          </li>";

        } else {
          echo "
          <li class=page-item>
            <a class=page-link href=boots_layout.php?page={$i}>{$i}</a>
          </li>
          ";
        }
      }
    ?>
    </ul>
  </div> 
</div><!-- container -->

    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="./script/main.js"></script>
  </body>
</html>