
    <!-- main comment -->
      <?php
      //conncet to mySQL
      require '../db/conn.php';

      // find a user according to Cookies.
      $id = $_COOKIE["week5"];
      // $findUser = "SELECT nickname FROM users WHERE id = '{$id}'";
      // $user = $conn->query($findUser)->fetch_assoc()['username'];

      $findNickname = "SELECT nickname FROM users WHERE id = '{$id}'";
      $nickname = $conn->query($findNickname)->fetch_assoc()['nickname'];

      //
      $comment = $_POST['sub_comment'];
      $comment_id = $_POST['comment_id'];
      $write_subComment = "INSERT INTO `sub_comments` (`id`, `comment_id`, `sub_content`, `created_at`, `user_id`) VALUES (NULL, '{$comment_id}', '{$comment}', CURRENT_TIMESTAMP, '{$id}')";

      if ($conn->query($write_subComment)) {

        // INSERT INTO success
        header("Location: ../board.php");
      } else {
          echo " Error: {$conn->error} :
                    sql: {$sql}  ";
      }
      ?>
  