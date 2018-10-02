- 資料庫名稱：comments （主留言）

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 主鍵     |
| content   | text | 留言內容  |
| user_id   | integer | 留言人  |
| created_at   | timestamp | 留言建立時刻  |

- 資料庫名稱：sub_comments （子留言）

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 主鍵     |
| comment_id | integer | 屬於的主留言  |
| sub_content   | text | 子留言內容  |
| user_id   | integer | 子留言人  |
| created_at   | timestamp | 子留言建立時刻  |

- 資料庫名稱：users ( 使用者 )

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 主鍵     |
| username   | varchar(32) | 使用者ID，不能重複  |
| nickname   | text | 使用者暱稱  |
| password   | varchar(128) | 使用者登入密碼  |
