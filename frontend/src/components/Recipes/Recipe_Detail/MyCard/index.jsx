import React from 'react';
import { useContext, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  Box,
  CardContent,
  CardMedia,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { CommonContext } from '../../../../context/CommonContext';
import LikeButton from '../Like';
import axios from 'axios';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    padding: 15,
    height: '100%',
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
    <Box bgcolor="warning.light" p={3}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card className={classes.card} p={5}>
            <CardMedia 
              className={classes.cardMedia}
              image={recipeId.recipe_info_image}
            >
            </CardMedia>
          </Card>    
        </Grid>

        <Grid item xs={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <Grid container>
                <Grid item xs={9}>
                  <Typography variant="h3" component="h2" gutterBottom>
                    {recipeId.title}
                  </Typography>  
                </Grid>
                <Grid item xs={3}>
                  <LikeButton />
                </Grid>
              </Grid>

              
              <CardContent>            
                {/* 재료가 값이 잇을때 보여주세요. 이걸안하면 map함수 자꾸 비어있다고 안돌아감 */}
                {
                  recipe.ingredients && 
                    <div>
                      {recipe.ingredients.inmyref &&
                      <div>
                        <Typography variant="h4" component="h2" align="left">
                        <img src="https://image.flaticon.com/icons/png/512/2307/2307719.png" height="32px" />
                         갖고 있어요
                        </Typography>
                        {recipe.ingredients.inmyref.map((data)=>(
                          <Typography key={data} variant="h5" display="inline" color="primary">
                            {data.ingredient_name}({data.ingredient_amount}),
                          </Typography>
                        ))}
                      </div>
                      }
                    <Typography variant="h4" component="h2" align="left">
                      <img src="https://image.flaticon.com/icons/png/512/2307/2307709.png" height="32px" />
                         부족해요 
                      </Typography>
                      {recipe.ingredients.notinmyref.map((data)=>(
                        <Typography key={data} variant="h5" algin="left" display="inline">
                          {data.ingredient_name}({data.ingredient_amount}), 
                        </Typography>
                      ))}
                    </div>
                }
                </CardContent>
            </div>
          </Card>      
        </Grid>            
      </Grid>
    </Box>
  );
}

export default MyPageCard;
