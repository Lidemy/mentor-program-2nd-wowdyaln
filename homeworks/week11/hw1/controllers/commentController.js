const User = require('../models').User
const Comment = require('../models').Comment
const SubComment =require('../models/').SubComment

async function pagesCount(limit){
    return await Comment.count()
                        .then(counts => {
                            // how many pages ?
                            return Math.ceil(counts / limit);
                        })
}

// Read
exports.showPage = async (req, res, next)=> {
	let currentUser = req.session.username
	let currentUserNk = req.session.nickname
	// 設定目前頁數
	let currentPage = req.query.page ? req.query.page : 1
	// 每頁文章數量
	let limit = 10
	// how many pages ?
	let pages = await pagesCount(limit)
	console.log( `pages total: ${pages}` );
	let from = (currentPage-1) * limit
	
	let comments = await Comment.findAll(
		{ order: [ ['updatedAt', 'DESC'] ],
			offset: from,
			limit: limit,
			include: [ { model: User },
								 { model: SubComment, include: [ {model: User} ]}  ]
		})
		.then( comments => {
			
			let cardList = []

			comments.forEach( c => {
				let card = {  id: c.id,
											content: c.content,
											createdAt: c.dataValues.createdAt,
											author: 
															{ id, username, nickname } = c.User.get({ plain: true}),
											subComments: []   
										}

			c.SubComments.forEach( sbc => {
				let sub = { content,
										createdAt } = sbc.get({ plain: true })

				sub.sub_user = sbc.User.get({ plain: true }).username
				sub.sub_nk = sbc.User.get({ plain: true }).nickname
				sub.sub_userId = sbc.User.get({ plain: true }).id

				card.subComments.push( sub )
			})

				cardList.push(card)
		})
		return cardList
	})
	
	res.render('index', { currentUser,
												currentUserNk,
												commentsObj: comments,
												currentPage: currentPage,
												pages } )
}

// Create
exports.createMainComment = (req, res) => {
	console.log(req.body, req.session.username, req.session.nickname, req.session.user_id);

	if (req.session.user_id){

		User.findByPk(req.session.user_id)
				.then( (u) => {
					u.createComment({
							content: req.body.main_comment
					})
					.then( (newC)=> {
						let newcInfo = newC.get({ plain: true })
						let { content, id, createdAt } = newcInfo
						// console.log(newcInfo);
						res.json({ authorName: u.username,
												authorNk: u.nickname,
												content,
												id,
												createdAt })
						console.log('create comment success');
					})
				})
				.catch( err => {
					console.log(err)
					res.status(500).send('back-end broken ... ...');
				})
	} else {
		res.redirect('/comments')
	}
}

exports.createSubComment = (req, res)=> {
    console.log(req.params, req.body.sub_comment, req.session.username, req.session.nickname, req.session.user_id);

    if (req.session.user_id) {  // 有登入，就可留言

			Comment.findByPk(req.params.comment_id)
							.then((c) => {
									c.createSubComment({
											content: req.body.new_subComment,
											user_id: req.session.user_id
									}).then((subc) => {
											let { createdAt, content } = subc.get({ plain: true })

											res.json({
													authorName: req.session.username,
													authorNk: req.session.nickname,
													content,
													createdAt,
											})

											console.log('create sub-comment success');
											res.send('update success!')
									})
									.catch(err => {
											console.log(err)
											res.status(500).send('back-end broken ... ...');
									})
							})
    } else {
			res.redirect('/comments')
    }
    
}


// Update
exports.update = (req, res, next)=>{

    console.log(req.body);
    console.log(`current user_id: ${req.session.user_id}`);
    console.log(`current user: ${req.session.username}`);
    console.log(`current user_nk: ${req.session.nickname}`);
    let { new_comment} = req.body
    
    Comment.findByPk(req.params.comment_id, { include: ['User'] })
    .then(c => {
        let { username, nickname, id } = c.User.get({ plain: true })
        console.log(`user: ${username}, ${nickname}, ${id}`)
        
                // user_id 必須跟 req.session.id 相同才能 update
                if (id === req.session.user_id){
										c.update( { content: new_comment } )
											.then( ()=>{
												res.send('update success!')
											})
											.catch((err) => {
												console.log(err);
												res.status(500).send("update failed ... ...")
											})

                } else {
                    res.redirect('/comments')
                }
            })
}


// Delete
exports.delete = (req, res, next)=>{

    Comment.findByPk(req.params.comment_id, { include: [{ model: User }] })
    .then(c => {
            let authorId = c.User.get({ plain: true }).id
            
            // user_id 必須跟 req.session.id 相同才能 delete
            if (authorId === req.session.user_id){
                c.destroy().then(() => {            // 下面的子留言也會一併刪除。在 model 的 onDelete 有做設定了
                    res.send("good, delete OK")
                })
                .catch( (err)=> {
                    console.log(err);
                    res.status(500).send("delete failed ... ...")
                })
            } else {
                res.redirect('/comments')
            }
        })
}
