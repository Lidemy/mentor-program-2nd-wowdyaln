
      <?php
    // todo: 確定刪除？的提示. 要有刪除成功的提示。
      require_once '../db/conn.php';
      require_once '../db/findUser.php';

      // find a user according to Cookies.
      $username = findUserNameBySession($conn, $_COOKIE['week5']);
      $user = findUserByUsername($conn, $username);
      $userId = $user['id'];

      // 預防 XSS 腳本寫入攻擊
      $comment = htmlspecialchars($_POST['sub_comment'], ENT_QUOTES);
      $write_subComment_stmt = $conn->prepare("INSERT INTO `wowdyaln_sub_comments` (`id`, `comment_id`, `sub_content`, `created_at`, `user_id`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, ? )");

      if ( $write_subComment_stmt->execute(array($_POST['comment_id'], $comment, $userId)) ) {
        // INSERT INTO success
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        // header("Location: ../boots_layout.php");
        // todo: sub_comment 還會重新刷新頁面，做成 ajax
      } else {
          echo " Error. ";
      }
      ?>
  