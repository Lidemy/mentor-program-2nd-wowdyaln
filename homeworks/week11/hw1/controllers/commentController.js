const User = require('../models').User
const Comment = require('../models').Comment
const SubComment =require('../models/').SubComment

async function pagesCount(){
    
    return await Comment.count()
    .then(counts => {
        // how many pages ?
        return Math.ceil(counts / 10);
        // let pages_count = Math.ceil(counts / 10);

        // 設定目前頁數

    })
}



exports.showPage = async (req, res, next)=> {
    // 設定目前頁數
    let currentPage = req.params.page || 1
    // let currentPage = req.query.page || 1

    // how many pages ?
    let pages = await pagesCount()
    console.log( `pages total: ${pages}` );
    
    let from = (currentPage-1) * 10

    
    let comments = await Comment.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: from,
        limit: 10,
        include: [
            { model: User },
            { model: SubComment }
        ]
    })
    .then(comments => {
        let cardList = []

        comments.forEach(c => {
            let card = {
                id: c.id,
                content: c.content,
                createdAt: c.dataValues.createdAt,
                author: 
                    { id, username, nickname } = c.User.get({
                        plain: true
                    })
                    // id: c.User.dataValues.id,
                    // username: c.User.dataValues.username,
                    // nickname: c.User.dataValues.nickname,
                ,
                subComments: []
            }
            c.SubComments.forEach( sbc => {
                // todo: user_id 改用 nickname 表示
                let sub = {
                            user_id,
                            commentId,
                            content ,
                            createdAt } = sbc.get({
                                                plain: true
                                            })
                    // user_nk: sbc.User,
                    // user_id:    sbc.dataValues.user_id,
                    // commentId: sbc.dataValues.comment_id,
                    // content:   sbc.dataValues.content,
                    // createdAt: sbc.dataValues.createdAt,
                
                card.subComments.push( sub )
               
            })
            cardList.push(card)

        })
        return cardList
    })
    
    console.log(`currentPage: ${currentPage}`);


    
    // res.send( {cardList: comments} )

    res.render('index', { 
                        cardList: comments,
                        currentPage: currentPage,
                        pages: pages
                     })

    // next()
}


exports.findallsubc = (req, res ,nex)=> {
    Comment.findAll({
        order: [
            // ['updatedAt', 'DESC']
        ],
        limit: 2,
        // Notice `include` takes an ARRAY
        include: [
            { model: User },
            { model: SubComment }
        ]
    })
    .then(comments => {
        comments.forEach( sbc => {
            console.log(sbc.id);
            console.log(sbc.content);
            console.log(`Author : ${sbc.User.dataValues.username}`);

            sbc.SubComments.forEach( subc => {
                console.log(`
                {
                    sub_id: ${subc.dataValues.id}
                    content: ${subc.dataValues.content}
                    user: ${subc.dataValues.user_id}
                }
                
                `);
                
            })
            // console.log(sbc.dataValues.User.dataValues);
        })
    })
        
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

