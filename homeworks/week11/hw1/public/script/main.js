$(document).ready( ()=> {
  console.log('jquery done.!!');


  function createComment(e) {
    // 從前端拿到資料，傳到後端
    let user_id = $(e.target).prev().val()
    let new_comment = $(e.target).parent().prev().children(':last-child').val()

    let panel = $(e.target).closest('.card.border-success.mt-3')

    console.log(user_id, new_comment);
    // 從前端拿到資料，傳到後端
    console.log("edit request send!");

    $.ajax({
      type: "POST",
      url: "/createComment",
      data: {
        user_id: user_id,
        main_comment: new_comment
      },
      success: function () {
        console.log("update success!")

        //todo: UI 改變
        // panel.children(':nth-child(2)').children(':nth-child(2)').text(new_comment).hide().fadeIn(3000)

        // notify the operation is successful
        $('#main-comment-box').append(
          `
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong> （ User. ${user_id} ）新增主留言成功！ </strong>
          </div>
        `
        ).hide().fadeIn(1000)
      },
      error: function (xhr, status, error) {

        let errorMsg = JSON.parse(xhr.responseText)

        $('#main-comment-box').append(
          `
           <div class="alert alert-dismissible alert-secondary">
           <button type="button" class="close" data-dismiss="alert">&times;</button>
           <strong> 廚房著火了 ! Error：(${xhr.status})   ${errorMsg} .</strong>
           </div>
           
           `
        ).hide().fadeIn(1000)
      }
    })
  }

  // edit main comment with Ajax.
  // $('button.btn.btn-primary').click((e) => { editComment(e) })
  $('#submitComment').click((e) => { 
    console.log("OK click");
    createComment(e)
   })
  
})