

$(document).ready( ()=> {
  console.log('jquery done.!!');

  // * 新增主留言
  function createComment(e) {
    // 從前端拿到資料，傳到後端
    let new_comment = $(e.target).parent().prev().find('textarea').val()
    // 從前端拿到資料，傳到後端

    $.ajax({
      type: "POST",
      url: "/comments",
      data: {
        main_comment: new_comment
      },
      success: function (resp) {

        let {
          authorName,
          authorNk,
          content,
          id,
          createdAt
        } = resp
        console.log("update success!")

        //todo: UI 改變
        let newCommentDom = $(`
    <div class="shadow-lg p-1 m-1 bg-white rounded">
      <div class="card border-success mt-3">
        <div class="card-header">
          main comment ${id}.  Post at : ${createdAt}
        </div>

        <div class="d-flex justify-content-around">
          <div>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#editModal${id}">編輯主留言</button>

            <!-- Modal -->
            <div class="modal fade" id="editModal${id}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">編輯 主留言 （ ${id} ）</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>

                  <form>
                    <div class="modal-body">
                      <label for="main_comment" class="mb-0">主留言</label>
                      <textarea class='form-control' rows='2' name='main_comment' id='main_comment' required>${content}</textarea>
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary editComment" data-dismiss='modal' data-comment_id=${id}>送出</button>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#deleteModal${id}">刪除主留言</button>

            <!-- Modal -->
            <div class="modal fade" id="deleteModal${id}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel"
              aria-hidden="true" style="display: none;">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">確定刪除 主留言？ （ ${id} ）</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form'>

                    <div class="modal-body">
                      <p>${content}</p>
                      <span aria-hidden="true">子留言也會一併刪除。刪除之後無法復原，確定嗎？</span>
                      </div>
                      <div class="modal-footer">
                        <button type='submit' class='btn btn-danger deleteComment' data-dismiss='modal' data-comment_id=${id}>確定</button>
                        <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="card-body">
          <h4 class=card-title>${authorName}  ( ${authorNk} )  ：</h4>
          <h5>${content}</h5>
        </div>

        <!-- write a sub comment here -->
        <div class="accordion mt-2" id="accordion${id}">
          <div class="card">
              <div class="card-header" id="heading${id}">
                  <h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}"><i class="far fa-comments">   在此回覆</i></button></h5>
              </div>
              <div class="collapse hide" id="collapse${id}" aria-labelledby="heading${id}" data-parent="#accordion${id}">
                  <div class="card-body">
                      <p class="m-2">( ${authorName} ) 我想在主留言（ ${id} ）之下，回應 ...</p>
                      <form>
                          <div class="modal-body">
                            <label class="mb-0" for="main_comment">子留言</label>
                            <textarea class="form-control" rows="5" name="sub_comment" required="true"></textarea>
                          </div>
                          <div class="modal-footer">
                            <button class="btn btn-primary" id="submitSubComment" type="submit" data-comment_id=${id}>送出</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
      `)

        $('.shadow-lg').first().before(newCommentDom) // todo: 版面怪怪XD
        newCommentDom.hide().fadeIn(2000)

        $('#createComment textarea').val("")

        // notify the operation is successful
        $('.message-box').append(
          `
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong> 新增主留言成功！ </strong>
          </div>
        `).hide().fadeIn(1000)

        $('html, body').animate({
          scrollTop: 0
        }, 300);
      },


      error: function (xhr, status, error) {

        $('.message-box').append(`
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong> 新增主留言 失敗 ! </strong>
          </div>`)
                  .hide().fadeIn(1000)
      }
    }) // end of $.ajax
    console.log("edit request has sent!");
  }

  // * 新增子留言
  function createSubComment(e, new_subComment, comment_id){
    
    $.ajax({
      type: "POST",
      url: `/comments/${comment_id}`,
      data: {
        new_subComment
      },

      success: function (resp) {
       
       let { authorName, authorNk, content, createdAt } = resp

        let base = $(e.target).closest('.card.border-primary.m-3').find('.card-body').first()
        //todo: UI 改變
        let subDom = $(`
                  <div class="row justify-content-center">
                    <div class="card border-warning col-10 m-1">
                        <div class="card-body">
                            <h5 class="card-title">${authorName} （ ${authorNk} ）：</h5>
                            <p class="card-text">reply at: ${createdAt}</p>
                            <p class="card-text"> ${content} </p>
                        </div>
                    </div>
                </div>
      `)
        base.after(subDom)

        $('html, body').animate({
          scrollTop: $(base[0]).offset().top - 130
        }, 800);

        subDom.hide().fadeIn(2000)

        console.log("update success!")

        // notify the operation is successful
        $('.message-box').append(
          `
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong> 新增子留言成功！ </strong>
          </div>
        `).hide().fadeIn(1000)
      },
    })
  }

  // * 編輯主留言
  function editComment(e){
    console.log(e.target.dataset.comment_id);

    // 從前端拿到資料，傳到後端
    let comment_id = e.target.dataset.comment_id
    let new_comment = $(e.target).parent().prev().children(':last-child').val()

    let panel = $(e.target).closest('.card.border-primary.m-3').find('.card-body').find('h5')
    console.log(panel);
    // 從前端拿到資料，傳到後端

    console.log("edit request send!");
    $.ajax({
      type: "PUT",
      url: `/comments/${comment_id}`,
      data: {
        new_comment
      },
      success: function () {
        console.log("update success!")

        // UI 改變
        panel.text(new_comment).hide().fadeIn(3000)
        // notify the operation is successful
        $('.message-box').append(
          `<div class="alert alert-dismissible alert-success">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong> 編輯主留言（ no. ${comment_id} ）成功！ </strong>
            </div>`)
          .hide().fadeIn(1000)
      },
      error: function (error) {
        // notify the operation is failed
        $('.message-box').append(`
            <div class="alert alert-dismissible alert-danger">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong> 更新主留言（ no. ${comment_id} ）失敗 ! </strong>
            </div>`)
          .hide().fadeIn(1000)

        console.log('back-end broken ... ...');
        console.log(error);

      }
    })
  }

  // * 刪除主留言跟子留言
  function deleteComment(e){

    let comment_id = e.target.dataset.comment_id

    console.log(comment_id);
    // 從前端拿到資料，傳到後端
    let deleteDom = $(e.target).closest('.shadow-lg.p-1.m-1.bg-white.rounded')
    // let deleteDom = $(e.target).closest('.card.border-success.mt-3')
    // 從前端拿到資料，傳到後端

    $.ajax({
      type: "DELETE",
      url: `/comments/${comment_id}`,
      success: function () {
        console.log("delete success!!");

        $('.message-box').append(
          `
          <div class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong> 成功刪除主留言 （ no. ${comment_id} ） ! </strong> 子留言也都沒了...
          </div>
          `
        ).hide().fadeIn(1000)
        deleteDom.fadeOut(2000)
        // deleteDom.remove()
      },

      error: function (error) {
        console.log(error);
        $('.message-box').append(`
            <div class="alert alert-dismissible alert-danger">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong> 刪除作業（ no. ${comment_id} ）失敗 ! 請再嘗試。</strong>
            </div>`)
          .hide().fadeIn(1000)
      }
    })
  }


  // * event delegation ...
  $('.container').click((e) => { 
    // create a new comment
    if (e.target.id === "submitComment") {
      let textarea = $(e.target).parent().prev().find('textarea')

      if (textarea.val() === "") {
        textarea.after
        alert("請輸入主留言。")
      } else {

        createComment(e)
        console.log("sent a request of creating new main comment !");
      }
    }

    // create a sub comment
    if (e.target.id === "submitSubComment") {
      let textarea = $(e.target).parent().prev().find('textarea')
      console.log("submit subComment !!!");

      if (textarea.val() === "") {
        textarea.after
        alert("請輸入子留言。")
      } else {
        e.preventDefault()
        let new_subComment = textarea.val()
        let comment_id = e.target.dataset.comment_id

        createSubComment(e, new_subComment, comment_id)

        textarea.val("")
        console.log("sent a request of creating new sub comment !");
      }
    }
    
    // edit comment
    if (e.target.className === "btn btn-primary editComment"){
      editComment(e)
      console.log("sent a request of editing comment !");
    }
    
    // delete comment
    if (e.target.className === "btn btn-danger deleteComment"){
      deleteComment(e)
      console.log("sent a request of deleting comment !");
    }
  })

  // 確定 username 可以使用 // todo:
})