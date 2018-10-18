<?
require './conn.php';

$getUserId = "SELECT id FROM users ";
$userIds = [];

if ($conn->query($getUserId) ){
  $temp = $conn->query($getUserId);

  if( $temp->num_rows > 0){
    while ($row = $temp->fetch_assoc()){
      $id = $row['id'];
      array_push($userIds, $id);
    }
  }
}
// var_dump($userIds);

$comments = [
  "人類要黴菌只是為了它的酵素。黴菌可能需要空氣，但是酵素不需要。"
,"師傅很可能一大早4點半就起床，去漁市場討價還價只為買最好的魚，結果看到客人把魚沾上大量山葵，甚至連魚的滋味都沒品嚐到。"
,"大家會把醃薑片當開胃菜大吃特吃。但醃薑片的作用是在品嚐不同種類的魚時潔淨味覺。若沒在每種魚之間吃一片醃薑片，就好像混合了五種葡萄酒，還想從中嚐出 夏多內白酒（Chardonnay）"
,"古時候，日本人與壽司最有關連的部分，就是用一條鮪魚肉乾裹住橡實。"
,"內陸人民用大量的鹽巴把整條魚包起來，包括內臟。內臟含有消化酵素，這些酵素連同魚肉裡的其他酵素，把魚的蛋白質分解成胺基酸，鹽則防止有害的細菌生長。結果產生了醃魚醬，這是魚露的起源。"
,"但是大量的鹽巴很難取得。這項技術也分化了魚身，產生黏滑、惡臭的糊狀物。現在日本還可以吃到這樣的食物，叫做『鹽辛』，第一次吃的人通常都會想吐。雖然如此，醃魚醬卻出乎意料的舉世聞名，廣受歡迎。還有一種很相似的產品叫做『魚露』，是羅馬帝國時代最受歡迎的調味料之一。"
,"媚公河沿岸內陸種米的農夫發現第二種讓魚長久可食的保存方式。這種方法讓魚完整保存，而且沒這麼臭。首先他們取出內臟，清理魚身。接著，他們用煮熟的飯把魚包起來，封在罐子裡。把飯先煮熟是為了讓飯腐爛。罐中的黴菌很快就消化掉飯中的碳水化合物，將其分解為糖，就跟製作味噌的方式一樣。然後酵母會吃掉糖，產生酒精。酒精保護剩餘的糖不受罐內空氣中的細菌感染。"
,"很多討厭的細菌（會使食物腐敗）都需要氧氣，值得注意的例外是肉毒桿菌。許多益菌不需要氧氣，它們很可能一開始是在成堆腐壞的植物裡形成。罐中的飯裡，這些比較好的菌消化掉糖。它們把乳酸和醋酸當做廢棄物散發出來。此時，飯已經嚴重發酸。一篇12世紀的日本資料描述這種情況『像酒鬼的嘔吐物』"
,"當內陸農民想要吃魚時候，他們就打開罐子，把聞起來像嘔吐物的米飯清除丟掉。這魚嚐起來很美味，現在我們會覺得，這有點像口味強烈熟成起司，還附帶奶油和醋的滋味。"
,"壽司的原始形式傳到中國，然後到了日本。顯然日本人認為這是到特別的佳餚。到西元718年，一份日本政府文件說人民可以用壽司來付稅。"
,"沒有人可以確定日文音的『sushi』這個詞從何而來。有個表示醃魚的中文字，發音是『其』──〉鮨，在日本，這個音可能會變成『細』（shee），作為第二個音節發音。第一音節則可能來自日文表示 酸 的音(suppai)，日文發音 sushi 就表示『酸醃魚』"
,"在日本，大家稱這種原始形式的壽司為『熟壽司』。"
,"當日本開始接受壽司時，壽司卻從中國消失了。這很可能是因為成吉思汗和蒙古人征服中國，比起魚類，他們比較喜歡吃紅肉。但現在泰國還吃的到原始形式的壽司。（所以最開始是發源於泰國）"
,"在日本也還吃的到（熟壽司）。日本人用淡水魚製作原始形式的壽司，尤其是用意一種跟金魚相關的鯉魚品種『鯽魚』。至今日本古代首都京都附近的琵琶胡四周，餐廳菜單上都還有鮒壽司（鯽魚壽司）。"
,"琵琶湖是日本最大湖泊，離京都較近，離海遠一點，在歷史上很可能提供了穩定的漁獲量。能夠掌控定期送魚這種奢侈享受的人，大概都是貴族，他們漸漸越來越快在發酵過程中開始吃熟壽司。他們不需要擔心長期保存魚的問題。"
,"到了15世紀左右，這些人吃熟壽司的時間，提早到醃漬過程的初期，這時魚肉內部往往還蠻新鮮的。他們發現，雖然飯本身已經發酵，但仍然可以吃，而且早點吃還十分美味呢。這種食物的風味很獨特：辣且微酸的飯，還有嚐起來比較新鮮的魚。"
,"到了1600年，大家都稱這種稍微發酵的飯魚混合物為『陳年發酵的醃魚』或『發酵途中的醃魚』。要做出這種食物，魚、飯 要熟成一個月或更短，有時短到幾天就可以了。"
,"原始形式的壽司以前是當做小菜，現在已經變成一道魚肉搭配酸飯的完整菜色。這種壽司是奢侈品而非必需品。壽司製作者開始使用新食材來款待貴族客人，包括海魚。"
,"大約1600年左右，發生了戲劇性的新發展。製造清酒的人想出讓米酒糟粕熟成的方法，他們加入新菌，進一步發酵以產生醋酸。美味的米醋就此誕生。除了醋酸外，米醋還包含70幾種其他風味要素──乳酸、有機酸、糖、鮨。在17世紀後半葉幕府時代，一位將軍的醫生嘗試把醋加進壽司飯。它發現壽司飯獨特的酸味不再需要發酵就能產生。做壽司的人較把這種方便的新液體灑進飯裡就好了，不需把魚裹進飯中，放到細菌產生乳酸為止。有了醋酸，他們立刻就達到類似的味道。"
,"醋中的酸能殺死細菌，因此有助於避免飯一開始就發酵。壽司中的飯原本的目的與此完全相反。這種新鮮而非醃漬的新壽司逐漸普及。大家稱之為箱壽司（早壽司、快壽司）"
,"洛杉磯有位叫做 新山勝夫 的壽司師傅，他對於自己在日本當學徒的頭2年記憶，只有嚴寒的水和凍僵的手。"
,"日本當地的宗教 神道教，相信萬物皆有靈魂。"
,"米尤其神聖，因為這是日本的主食。壽司師傅稱米為『舍利子』。根據日本鄉野傳說，每一粒米裡面有7個靈魂。"
,"拓美這兩批壽司飯總重約9公斤，他此時肩負大約350萬個微小神明的命運。"
,"蓬萊米比較短而黏，壽司米屬於這種。"
];

for ($i=0; $i < 20; $i++){
  $user_id = $userIds[ mt_rand(0, count($userIds)-1 )];
  $content = $comments[ mt_rand(0, count($comments)-1 )];

  $writeComment = "INSERT INTO `comments` (`id`, `content`, `created_at`, `user_id`) VALUES (NULL, '$content', CURRENT_TIMESTAMP, '$user_id' )";
  if ($conn->query($writeComment)) {
    echo "good! <br>";
  } else {
      echo " Error: {$conn->error} :
                      sql: {$writeComment}  ";
  }
}


?>