import React, { useContext, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LikeButton from '../Like';
import {
  Divider,
} from '@material-ui/core'
import { CommonContext } from '../../../../context/CommonContext';
import axios from 'axios';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    padding: 15,
    height: '100%'
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: '100%',
    height: '100%',
  },
  sidebarAboutBox: {    
    width: '100%',
    height: '100%',
  },
});

const MyPageCard = () => {
  const classes = useStyles();
  const {recipeId, recipe, setRecipe} = useContext(CommonContext);

  useEffect(() => {
    recipeApi();
  }, [])
  // 액시오스
  const recipeApi = () => {
    // console.log('here')
    console.log(recipeId.recipe_info_id)
    axios.get(`/recipe/${recipeId.recipe_info_id}`)
      .then(res => {
        console.log(res.data, 'axios');
        setRecipe(res.data, 'axios');
      })
      .catch(err => {
        console.log(err.response);
      })
  };

  return (
    <div>
    <Grid container spacing={5}>
      <Grid item lg={6}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
                <Divider />
                <span><img className={classes.sidebarAboutBox} style={{ display: '' }} src={recipeId.recipe_info_image} alt='' xsDown /></span>      
            </CardContent>
            <Typography component="h1" variant="h3" color="inherit"
                gutterBottom>
                {recipeId.title}
              </Typography>
              <LikeButton />
          </div>       
        </Card>    
      </Grid>

      <Grid item lg={6}>
      <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>            
                <Typography component="h2" variant="h3">
                  재료: 
                </Typography>
                {/* 재료가 값이 잇을때 보여주세요. 이걸안하면 map함수 자꾸 비어있다고 안돌아감 */}
                {
                  recipe.ingredients && 
                    <div>
                      {recipe.ingredients.inmyref &&
                      <div>
                        {recipe.ingredients.inmyref.map((data)=>(
                          <Typography key={data} component="h2" variant="h5" color='primary'>
                            {data.ingredient_name} | {data.ingredient_amount}
                          </Typography>
                        ))}
                      </div>
                      }
                      {recipe.ingredients.notinmyref.map((data)=>(
                        <Typography key={data} component="h2" variant="h5" color='secondary'>
                          {data.ingredient_name} | {data.ingredient_amount}
                        </Typography>
                      ))}
                    </div>
                }
              </CardContent>
          </div>
        </Card>      
      </Grid>            
          
      {/* <div><RecipeTimer /></div> */}
    </Grid>

    </div>
  );
}

export default MyPageCard;
