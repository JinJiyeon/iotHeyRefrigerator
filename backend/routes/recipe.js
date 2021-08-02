// 레시피
const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// // 배포할 때 여기나 dotenv 수정해주기!
// router.use((req, res, next) => {
//     global.django_origin = 'http://localhost:8000'
//     if (process.env.DJANGO_ORIGIN) {
//         global.django_origin = process.env.DJANGO_ORIGIN
//         console.log('django_origin을 글로벌변수로 지정했습니다')
//     }
//     next()
// })


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

    info_promise.then((rows) => {
        recipe.info = rows;
        return ingredient_promise;
    }).then((rows) => {
        recipe.ingredients = rows;
        return step_promise;
    }).then((rows) => {
        recipe.steps = rows;
        res.send(recipe);
    }).catch((err)=>{
        next(err);
    })
})


// 추천로직
router.get('/recom/retaining', (req, res, next) => {
    const url = django_origin + '/recipe/recom/retaining/'
    axios.get(url)
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
router.get('/recom/expire', (req, res, next) => {
    const url = django_origin + '/recipe/recom/expire/'
    axios.get(url)
    .then(response => { 
        console.log(response.data.similar_recipe_id)
        return response.data.similar_recipe_id
    })
    .then(response => {
        db.query(`SELECT * FROM recipe_infos WHERE recipe_info_id IN (${response[0]}, ${response[1]}, ${response[2]})`, (err, rows, fields) => {
            if (err) next (err)
            res.send(rows)
        })
    })
    .catch(error => { next(error) })  
})







//404 middleware


module.exports = router;