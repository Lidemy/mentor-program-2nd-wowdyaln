<?
  require_once './db/conn.php';
  require_once './db/autoLogin.php';
  require_once './db/findUser.php';

  // 預防 XSS 腳本寫入攻擊
  $username = htmlspecialchars($_POST['username'], ENT_QUOTES);
  $nickname = htmlspecialchars($_POST['nickname'], ENT_QUOTES);

  // password 要經過 hash function，存 hash 進資料庫。
  $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $signup_stmt = $conn->prepare("INSERT INTO `users` (`id`, `username`,nickname, `password`) VALUES (NULL, ?, ?, ?) ");

  try {
    $signup_stmt->execute(array($username, $nickname, $hash));
    // 自動登入
    autoLogin($conn, $username, $_POST['password']);
    
    echo "
        <div class='alert alert-success text-center' role=alert>
          <strong>{$username}  你好!</strong> New user created successfully.
        </div>

        <a class='btn btn-primary btn-block' href=./boots_layout.php role=button>前往留言板 </a>
    ";
    } catch (Exception $e) {
        // echo $e->getMessage();
        echo " something wrong... or the username is not avalible, choose another, plz. ";
    }

?>