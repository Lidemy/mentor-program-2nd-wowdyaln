
    <!-- main comment -->
      <?php
      //conncet to mySQL
      require '../db/conn.php';

      $user_id = $_POST['user_id'];
      $comment = $_POST['main_comment'];
      $writeAcomment = "INSERT INTO `comments` (`id`, `content`, `created_at`, `user_id` ) VALUES (NULL, '$comment', CURRENT_TIMESTAMP, '$user_id' )";

      if ($conn->query($writeAcomment)) {
        // INSERT INTO success
        header("Location: ../board.php");
      } else {
          echo " Error: {$conn->error} :
                    sql: {$sql}  ";
      }
      ?>
  