<?
// 執行五個 SQL Query，分別把每一個產品的剩餘數量都扣一，接著新增一筆訂單紀錄。
try {
    $conn->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
    $conn->beginTransaction();
    
    if (!stockDecrease($itemA, 1) || !stockDecrease($itemB, 1) ||
        !stockDecrease($itemC, 1) || !stockDecrease($itemD, 1) ||
        !stockDecrease($itemE, 1) || !newOrder($current_user) ) {
        throw new Exception($conn->error);
    }
    
    $conn->commit();
    echo "all transaction succeeded.";

} catch (Exception $e) {
    $conn->rollback();

    var_dump("Error: $e :  all transaction failed.");
}

?>