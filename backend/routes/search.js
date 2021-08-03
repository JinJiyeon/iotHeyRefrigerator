const express = require('express');
const path = require('path');
const router = express.Router();

const db = require('../lib/db');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// title search
router.post('/title/:searchWord', (req, res, next) => {
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
                where match(title) against('${searchWord}*' in boolean mode)
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
                where match(title) against ('${searchWord}*' in boolean mode)
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
router.post('/ingredient/:searchWord', (req, res, next) => {
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
                    where match(ingredient_name) against('${searchWord}*' in boolean mode)
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
                    where match(ingredient_name) against('${searchWord}*' in boolean mode)
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

module.exports = router;