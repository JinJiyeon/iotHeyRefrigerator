const express = require('express');
const cors = require('cors');
const axios = require('axios');
const db = require('../lib/db');
const router = express.Router();

router.use(cors({
  origin: true,
  credentials: true
}))
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// 기본
router.get('/', (req, res) => {
  res.send('node > test')
})

// node가 django에게
router.get('/myingredient', (req, res) => {
  res.send({'id':1, 'name':'팽이버섯베이컨말이'})
  console.log('myingredient를 django에게 보냅니다')
});

// django가 node에게
const django_origin = 'http://localhost:8000'
router.get('/django_to_node_3', (req, res, next) => {
  const url = django_origin + '/django_to_node/'
  axios.get(url)
  .then(response => { res.send({'data':response.data}) })
  .catch(error => { next(error) })
})



// nodeDB에서 재료를 뽑으면 어떤 꼴인가
router.get('/json_from_node/:recipe_id', (req,res,next) => {
  db.query(`SELECT ingredient_name FROM ingredients_and_recipe_infos WHERE recipe_info_id=${req.params.recipe_id}`, (err, rows, fields) => {
    if (err) next (err)
    console.log(rows)
    res.send(rows)
  })
})

// DB에서 추출한 json을 Django로 보낸다
router.get('/nodedb_to_django/:recipe_id', (req,res,next) => {
  db.query(`SELECT ingredient_name FROM ingredients_and_recipe_infos WHERE recipe_info_id=${req.params.recipe_id}`, (err, rows, fields) => {
    if (err) next (err)
    console.log(rows)
    res.send(rows)
  })
})




module.exports = router;