// 레시피
const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const axios = require('axios');
const util = require('../utils/util')
const cors = require('cors');

router.use(cors({
    origin: process.env.DJANGO_ORIGIN,
    credentials: true
  }))  
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// 추천로직
router.get('/recom/important', util.isLogin, (req, res, next) => {

    const url = process.env.DJANGO_ORIGIN + '/recipe/recom/important'
    
    axios.get(url+`/user_id?=${req.user_id}`)
    .then(response => { 
        return response.data.similar_recipe_id
    })
    .then(response => { 
        db.query(`SELECT * FROM recipe_infos WHERE recipe_info_id IN (${response[0]}, ${response[1]}, ${response[2]})`, (err, rows, fields) => {
            if (err) next (err)
            res.send(rows)
        })
    })
    .catch(error => { next(error) })
});

// 추천로직
router.get('/recom/expired', util.isLogin, (req, res, next) => {
    const url = process.env.DJANGO_ORIGIN + '/recipe/recom/expired/'
    axios.get(url, {
        headers: {
            // Cookie: `from_node=from_node`,
            Cookie: `accessToken=${req.cookies.accessToken}`
            },
        withCredentials: true 
    })
    .then(response => { 
        console.log(response.data.similar_recipe_id)
        return response.data.similar_recipe_id
    })
    .then(response => {
        if (response.length === 0) {res.send([])} 
        
        db.query(`SELECT * FROM recipe_infos WHERE recipe_info_id IN (${response[0]}, ${response[1]}, ${response[2]})`, (err, rows, fields) => {
            if (err) next (err)
            
            res.send(rows)
        })
    })
    .catch(error => { next(error) })  
})


// title search
router.post('/search/title/:searchWord', (req, res, next) => {
    let searchWord = req.params.searchWord;
    let limit = 3; // limit 값 논의 필요

    let beforeId = req.body.before_recipe_info_id;
    let beforeView = req.body.before_view;

    let title_promise;
    //첫번째 요청
    if (beforeId===undefined || beforeView===undefined) {
        title_promise = new Promise((resolve, reject) => {
            db.query(`select * 
                from recipe_infos
                where title like '%${searchWord}%'
                order by view desc, recipe_info_id desc
                limit ${limit}`, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(rows);
            })
        })
    }
    //추가 요청
    else {
        title_promise = new Promise((resolve, reject) => {
            db.query(`select * from
                (select *
                from recipe_infos
                where where title like '%${searchWord}%'
                    and
                    (
                        (view = ${beforeView} and recipe_info_id<${beforeId})
                        or
                        (view < ${beforeView})
                    )
                ) tmp
                order by view desc, recipe_info_id desc
                limit ${limit};
                `, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }

    title_promise
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) => {
            next(err);
        })
})

// ingredient search
router.post('/search/ingredient/:searchWord', (req, res, next) => {
    let searchWord = req.params.searchWord;
    let limit = 3; // limit 값 논의 필요

    let beforeId = req.body.before_recipe_info_id;
    let beforeView = req.body.before_view;


    let ingredient_promise;
    //첫 번째 요청
    if (beforeId === undefined || beforeView === undefined) {
        ingredient_promise = new Promise((resolve, reject) => {
            db.query(`
                select *
                from recipe_infos
                where recipe_info_id in
                    (select recipe_info_id
                    from ingredients_and_recipe_infos
                    where ingredient_name like '%${searchWord}%'
                    group by recipe_info_id)
                order by view desc, recipe_info_id desc
                limit ${limit}`, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(rows);
            })
        })
    }
    //추가 요청
    else {
        ingredient_promise = new Promise((resolve, reject) => {
            db.query(
                `
                select *
                from recipe_infos
                where recipe_info_id in
                (
                    select recipe_info_id
                    from ingredients_and_recipe_infos
                    where ingredient_name like '%${searchWord}%'
                    group by recipe_info_id
                )
                and ((view=${beforeView} and recipe_info_id != ${beforeId}) or (view<${beforeView}))
                order by view desc, recipe_info_id desc
                limit ${limit}
                `
                , (err, rows) => {
                if (err) reject(err)
                resolve(rows);
            })
        })
    }

    ingredient_promise
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) => {
            next(err);
        })
    
})

// 라우터
router.get('/:recipeId', (req, res) => {
    const recipe_id = req.params.recipeId;

    let recipe = {};
    let info_promise = new Promise((resolve, reject) => {
        db.query(`select title, view, recipe_info_image from recipe_infos where recipe_info_id=${recipe_id}`, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        })
    })

    let ingredient_promise = new Promise((resolve, reject) => {
        db.query(`select ingredient_name, ingredient_amount, source_flag from ingredients_and_recipe_infos where recipe_info_id=${recipe_id}`, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        })
    })

    let step_promise = new Promise((resolve, reject)=> {
        db.query(`select step_order, step_comment, image_source from recipe_steps where recipe_info_id=${recipe_id} order by step_order`, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        })
    })

    const accessToken = req.cookies.accessToken;
    const user_id = util.accessUserId(accessToken);
    
    let is_user_like = new Promise((resolve, reject) => {
        db.query('select count(*) as isLiked from likes where user_id=? and recipe_info_id=?', [user_id, recipe_id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })

    info_promise.then((rows) => {
        recipe.info = rows;
        return ingredient_promise;
    }).then((rows) => {
        recipe.ingredients = rows;
        return step_promise;
    }).then(async (rows) => {
        recipe.steps = rows;

        if (user_id) {
            const rows = await is_user_like;
            const isLiked = rows[0].isLiked;
            recipe.isLiked = isLiked;
        }
        
        res.send(recipe);
    }).catch((err)=>{
        next(err);
    })
})


//404 middleware


module.exports = router;