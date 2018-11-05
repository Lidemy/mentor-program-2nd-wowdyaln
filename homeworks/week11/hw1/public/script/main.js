

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
        // let res = JSON.parse(resp)

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
        <div class="card-body">
          <h4 class=card-title>${authorName}  ( ${authorNk} )  ：</h4>
          <h5>${content}</h5>
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
                  <form action='/comments/${id}' method='delete'>

                    <div class="modal-body">
                      <p>${content}</p>
                      <span aria-hidden="true">子留言也會一併刪除。刪除之後無法復原，確定嗎？</span>
                      </div>
                      <div class="modal-footer">
                        <input type='hidden' name='comment_id' value=${id}>
                        <button type='submit' class='btn btn-danger' data-dismiss='modal'>確定</button>
                        <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

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
                      <form action="/comments/${id}" method="post">
                          <div class="modal-body">
                            <label class="mb-0" for="main_comment">子留言</label>
                            <textarea class="form-control" rows="5" name="sub_comment" required="true"></textarea>
                          </div>
                          <div class="modal-footer">
                            <button class="btn btn-primary" id="submitSubComment" type="submit">送出</button>
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

        let errorMsg = JSON.parse(xhr.responseText)

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

  // * 編輯主留言
  function editComment(e){
    console.log(e.target.dataset.comment_id);

    // 從前端拿到資料，傳到後端
    let comment_id = e.target.dataset.comment_id
    let new_comment = $(e.target).parent().prev().children(':last-child').val()

    let panel = $(e.target).closest('.card.border-primary.m-3')
    console.log(panel);
    // 從前端拿到資料，傳到後端

    console.log("edit request send!");
    $.ajax({
      type: "PUT",
      url: "/edit/comments",
      data: {
        comment_id,
        new_comment
      },
      success: function () {
        console.log("update success!")
        // console.log('back-end broken ... ...');

        // UI 改變
        panel.children(':nth-child(2)').children(':nth-child(2)').text(new_comment).hide().fadeIn(3000)
        // notify the operation is successful
        // $('#message-box').appendTo(
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

  // event delegation ...
  $('.container').click((e) => { 
      console.log('container clicked !');

      // edit comment
    if (e.target.className === "btn btn-primary editComment"){
      console.log("OK , that's call editComment function");
      editComment(e)
    }

    // create a new comment
    if (e.target.id === "submitComment"){

      let textarea = $(e.target).parent().prev().find('textarea')

      if (textarea.val() === "") {
        textarea.after
        alert("請輸入主留言。")
      } else {

        console.log("send a main comment !");
        createComment(e)
      }
    }


  })
  


})