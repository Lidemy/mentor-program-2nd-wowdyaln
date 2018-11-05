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

exports.showPage = async (req, res, next)=> {
    // 設定目前頁數
    let currentPage = req.params.page || 1
    // let currentPage = req.query.page || 1

    let limit = 10
    // how many pages ?
    let pages = await pagesCount(limit)
    console.log( `pages total: ${pages}` );
    let from = (currentPage-1) * limit

    
    let comments = await Comment.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: from,
        limit: limit,
        include: [
            { model: User },
            { model: SubComment, include: [ {model: User} ]}
        ]
    })
    .then(comments => {
        let cardList = []

        comments.forEach( c => {
            let card = {
                id: c.id,
                content: c.content,
                createdAt: c.dataValues.createdAt,
                author: 
                    { id, username, nickname } = c.User.get({ plain: true}),
                subComments: []
            }

            c.SubComments.forEach( sbc => {
                let sub = { 
                            content ,
                            createdAt } = sbc.get({ plain: true })

                sub.sub_user = sbc.User.get({ plain: true }).username
                sub.sub_nk = sbc.User.get({ plain: true }).nickname

                card.subComments.push( sub )
            })

            cardList.push(card)
        })
        return cardList
    })
    
    res.render('index', { 
                        commentsObj: comments,
                        currentPage: currentPage,
                        pages: pages
                     })

    // next()
}

exports.create = (req, res) => {
    // todo: 驗證身份

    let { user_id, main_comment } = req.body
    console.log(user_id === "null");
    
    // if( false ){
    if( user_id !== "null" && main_comment ){

        User.findById(user_id)
            .then((u) => {
                u.createComment({
                    content: `${main_comment}`
                })
            })
            .then( ()=> {
                res.send('create comment success')    
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        console.log("something wrong ...");
    }

    console.log(req.body);
    
}

