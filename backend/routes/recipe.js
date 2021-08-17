// 레시피
const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const axios = require('axios');
const util = require('../utils/util')
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.use(cors({
    origin: process.env.DJANGO_ORIGIN,
    credentials: true
  }))  
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 레시피 랜덤 3개 추천
router.get('/recom/main', (req, res) => {
    const getRecipeRandom = function () {
        return new Promise((resolve, reject) => {
            db.query(`select * from recipe_infos order by rand() limit 3`, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }

    getRecipeRandom()
        .then((rows) => {
            console.log(rows[0].recipe_count);
            res.send(rows);
        })
        .catch((err) => {
            res.status(500).send('server error');
        })
})

// 추천로직
router.get('/recom/important', util.isLogin, (req, res, next) => {

    const url = process.env.DJANGO_ORIGIN + '/recipe/recom/important/'
    
    axios.get(url, {
        headers: {
            Cookie: `accessToken=${req.cookies.accessToken}`
            },
        withCredentials: true     
    })
    .then(response => { 
        return response.data.similar_recipe_id
    })
    .then(response => {
        console.log('important 추천 결과', response)
        if (response.length === 0) {res.send([])} 
        
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
        return response.data.similar_recipe_id
    })
    .then(response => {
        console.log('expired 추천 결과', response)
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
    let limit = 12; // limit 값 논의 필요

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
    let limit = 12; // limit 값 논의 필요

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
router.get('/:recipe_id', async (req, res) => {
    const recipe_id = req.params.recipe_id;
    const accessToken = req.cookies.accessToken;
    let user_id = null;
    let LoginCheck = null;

    // accessToken이 있는 경우
    if (accessToken) {
        LoginCheck = new Promise((resolve, reject) => {
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        resolve(null);
                    }
                    else {
                        resolve(decoded.user_id);
                    }
                })
        })

        // 로그인 한 경우 user_id에 로그인 유저 아이디가 저장됩니다.
        // 로그인 하지 않은 경우 user_id에 null이 저장됩니다.
        user_id = await LoginCheck;
    }

    let recipe = {
        info: null,
        steps: null,
        ingredients: {
            inmyref: null,
            notinmyref: null
        },
        isLiked: null
    };

    // 레시피 기본 정보 promise
    let info_promise = new Promise((resolve, reject) => {
        db.query(`select title, view, recipe_info_image from recipe_infos where recipe_info_id=${recipe_id}`, (err, rows) => {
            if (err) {
                console.log(err);
                // reject(err);
            }
            resolve(rows);
        })
    })

    let inmyref = null;
    let notinmyref = null;
    if (user_id) {
        inmyref = new Promise((resolve, reject)=>{
            db.query(`select users_and_ingredients.ingredient_name as ingredient_name, ingredients_and_recipe_infos.ingredient_amount as ingredient_amount
                    from users_and_ingredients inner join ingredients_and_recipe_infos
                    on users_and_ingredients.ingredient_name = ingredients_and_recipe_infos.ingredient_name
                    where recipe_info_id = ${recipe_id} and user_id = '${user_id}'`, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })

        notinmyref = new Promise((resolve, reject) => {
            db.query(`select ingredient_name, ingredient_amount
                from ingredients_and_recipe_infos
                where ingredient_name not in (
                select users_and_ingredients.ingredient_name
                from users_and_ingredients inner join ingredients_and_recipe_infos
                on users_and_ingredients.ingredient_name = ingredients_and_recipe_infos.ingredient_name
                where recipe_info_id = ${recipe_id}
                and user_id = '${user_id}')
                and recipe_info_id = ${recipe_id};`, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    } else {
        notinmyref = new Promise((resolve, reject) => {
            db.query(`select ingredient_name, ingredient_amount, source_flag from ingredients_and_recipe_infos where recipe_info_id=${recipe_id}`, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    let step_promise = new Promise((resolve, reject)=> {
        db.query(`select step_order, step_comment, image_source from recipe_steps where recipe_info_id=${recipe_id} order by step_order`, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        })
    })
    
    let is_user_like = function () {
        return new Promise((resolve, reject) => {
            db.query('select count(*) as isLiked from likes where user_id=? and recipe_info_id=?', [user_id, recipe_id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }

    if (user_id) {
        recipe.ingredients.inmyref = await inmyref;
        recipe.ingredients.notinmyref = await notinmyref;
    } else {
        console.log(user_id);
        recipe.ingredients.notinmyref = '';
        console.log('notinmyref',notinmyref);
        recipe.ingredients.notinmyref = await notinmyref;
    }

    info_promise
        .then((rows) => {
            recipe.info = rows;
            return step_promise;
        })
        .then(async (rows) => {
            recipe.steps = rows;

            if (user_id) {
                const rows = await is_user_like();
                const isLiked = rows[0].isLiked;
                recipe.isLiked = isLiked;
            } else {
                recipe.isLiked = 0;
            }
            res.send(recipe);
        })
        .catch((err) => {
            next(err);
        })
})

router.get('/inmybag/:recipe_id', util.isLogin, (req, res) => {
    const user_id = req.user_id;
    const recipe_id = req.params.recipe_id;

    const inmyref = new Promise((resolve, reject) => {
        db.query(`select users_and_ingredients.ingredient_name as ingredient_name, ingredients_and_recipe_infos.ingredient_amount as ingredient_amount
                    from users_and_ingredients inner join ingredients_and_recipe_infos
                    on users_and_ingredients.ingredient_name = ingredients_and_recipe_infos.ingredient_name
                    where recipe_info_id = ${recipe_id} and user_id = '${user_id}'`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
            })
    })

    const notinmyref = new Promise((resolve, reject) => {
        db.query(`select ingredient_name, ingredient_amount
        from ingredients_and_recipe_infos
        where ingredient_name not in (
            select users_and_ingredients.ingredient_name
            from users_and_ingredients inner join ingredients_and_recipe_infos
            on users_and_ingredients.ingredient_name = ingredients_and_recipe_infos.ingredient_name
            where recipe_info_id = ${recipe_id} and user_id = '${user_id}')
        and recipe_info_id = ${recipe_id};`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })

    let ingredients = {};
    inmyref
        .then((rows) => {
            ingredients.inmyref = rows;
            return notinmybag;
        })
        .then((rows) => {
            ingredients.notinmyref = rows;
            res.send(ingredients);
        })
        .catch((err) => {
            res.status(500).send('server error');
        })
})

//404 middleware


module.exports = router;