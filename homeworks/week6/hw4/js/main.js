document.addEventListener("DOMContentLoaded", ()=> {

  let deleteDom = document.querySelectorAll('.delete')
  deleteDom.forEach(dom => {
    
    dom.addEventListener('click', (e) => { 
      console.log(e.target);
      let result = window.confirm("確定刪除留言?")
      if ( result ) {
        return
      } else {
        e.preventDefault()
        
      }
    })
  })


})
