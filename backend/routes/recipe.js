// 레시피
const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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

//404 middleware
router.use((req, res) => {
    res.send('no page');
})

module.exports = router;