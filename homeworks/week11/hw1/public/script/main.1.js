$(document).ready( ()=> {
  console.log('jquery done.!!');

  // handler
  function deleteComment(e) {

    // 從前端拿到資料，傳到後端
    let deleteId = $(e.target).prev().val()
    let deleteDom = $(e.target).closest('.card.border-success.mt-3')
    // 從前端拿到資料，傳到後端

    $.ajax({
      type: "POST",
      url: "./action/delete_comment.php",
      data: {
        comment_id: deleteId
      },
      success: function () {
        console.log("delete success!!");

        $('#main-comment-box').append(
          `
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong> 成功刪除主留言 （ no. ${deleteId} ） ! </strong> 子留言也都沒了...
          </div>
          `
        ).hide().fadeIn(1000)
      },
      error: function(xhr, status, error) {
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
    deleteDom.fadeOut(2000)
  }

  function editComment(e){
    // 從前端拿到資料，傳到後端
    let comment_id = $(e.target).prev().val()
    let new_comment = $(e.target).parent().prev().children(':last-child').val()
    let panel = $(e.target).closest('.card.border-success.mt-3')
    // 從前端拿到資料，傳到後端
    console.log("edit request send!");

   $.ajax({
     type: "POST",
     url: "./action/edit_comment.php",
     data: {
       comment_id: comment_id,
       main_comment: new_comment
     },
     success: function() {
       console.log("update success!")

      // UI 改變
      panel.children(':nth-child(2)').children(':nth-child(2)').text(new_comment).hide().fadeIn(3000)

      // notify the operation is successful
       $('#main-comment-box').append(
         `
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong> 編輯主留言（ no. ${comment_id} ）成功！ </strong>
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
  $('button.btn.btn-primary').click( (e)=> { editComment(e) })
  // delete main comment with Ajax.
  $('button.btn.btn-danger').click((e) => { deleteComment(e) })

  //！！！！！！！ create main comment. with Ajax. ！！！！！
  $('#comment_ajax').submit( (e)=> {
    e.preventDefault()
    console.log('submit evnet !');
    let mainCommentDom = $('.sticky-top')

    // 從前端拿到資料，傳到後端
    let authorId =  parseInt ( $('#comment_ajax > input[type="hidden"]').val() )
    let comment = $('#main_comment').val()
    // 從前端拿到資料，傳到後端

    // 要到後端拿到 剛生出來 main comment 的 id , created_at / 還有作者的 nickname
    let last_id = undefined
    let nickname = undefined
    let created_at = undefined

    $.ajax({
      type: "POST",
      url: "./action/create_comment.php",
      data: {
        user_id: authorId,
        main_comment: comment
      },
      success: function (resp) {
        let res = JSON.parse(resp)
        last_id = res.last_id
        nickname = res.nickname
        created_at = res.created_at
    
    let newCommentDom = 
    $(`
      <div class="card border-success mt-3">
        <div class="card-header">
          main comment ${last_id}。Post at : ${created_at}
        </div>
        <div class="card-body">
          <h4 class=card-title>暱稱：${nickname}</h4>
          <h5>${comment}</h5>
        </div>

        <div class="d-flex justify-content-around">
          <div>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#editModal${last_id}">編輯主留言</button>


            <!-- Modal -->
            <div class="modal fade" id="editModal${last_id}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">編輯 主留言</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                                              <!-- <form action="./action/edit_comment.php" method="post"> -->

                  <form>
                  
                    <div class="modal-body">
                      <label for="main_comment" class="mb-0">主留言</label>
                      <textarea class=form-control rows=2 name=main_comment id=main_comment required>${comment}</textarea>
                    </div>
                    <div class="modal-footer">
                      <input type=hidden name=comment_id value=${last_id}>
                      <button type="submit" class="btn btn-primary" data-dismiss='modal'>送出</button>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#deleteModal${last_id}">刪除主留言</button>


            <!-- Modal -->
            <div class="modal fade" id="deleteModal${last_id}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel"
              aria-hidden="true" style="display: none;">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">確定刪除 主留言？</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form>
                          <!-- <form action=./action/delete_comment.php method=post> -->

                    <div class="modal-body">
                      <p>${comment}</p>
                      <span aria-hidden="true">子留言也會一併刪除。刪除之後無法復原，確定嗎？</span>
                      </div>
                      <div class="modal-footer">
                        <input type=hidden name=comment_id value=${last_id}>
                        <button type=submit class='btn btn-danger' data-dismiss='modal'>確定</button>
                        <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- write a sub comment here -->
        <div class="row justify-content-center">
          <div class="card bg-light col-10 mb-3">
            <form action="./action/create_sub_comment.php" method="post">
              <fieldset>
                <h4 class="text-center font-weight-light mt-3 mb-0">子留言</h4>
                <div class="form-group">
                  <label for="sub_comment" class="mb-0">reply</label>
                  <textarea class="form-control" rows="5" cols="30" name="sub_comment" id="sub_comment" required=""></textarea>
                </div>

                <div class="form-group">
                  <input type=hidden name=comment_id value=${last_id}>
                  <input type=hidden name=user_id value=${authorId}>
                  <button type="submit" class="btn btn-primary">送出</button>
                </div>

              </fieldset>
            </form>
          </div>
        </div>
      </div>
      `)

          mainCommentDom.after(newCommentDom)
          newCommentDom.hide().fadeIn(2000)
          // https://stackoverflow.com/questions/8408826/bind-event-only-once
          $('button.btn.btn-danger').off('click').click( (e) => { deleteComment(e) })
          $('button.btn.btn-primary').off('click').click( (e) => { editComment(e) })
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
    })    // $.ajax

    $('html, body').animate({
      scrollTop: 0
    }, 300);

    $('#main_comment').val("")
  })

})