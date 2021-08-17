import React, { useContext, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import {
  Divider,
} from '@material-ui/core'
import { CommonContext } from '../../../../context/CommonContext';
import axios from 'axios';

const useStyles = makeStyles({
  // card: {
  //   display: 'flex',
  //   padding: 15,
  // },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 300,
    height: 300,
  },
  sidebarAboutBox: {    
    width: 300,
    height: 300,
  },
});

const MyPageBottom = () => {
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
    <Grid item>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent p={2}>
            {
              recipe.steps && 
                <Box>
                  {recipe.steps.map((data)=>(
                    <Grid container>
                      
                      <Grid item xs={9}>
                        <Typography key={data} variant="h5" algin="left">
                          {data.step_order} | {data.step_comment}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} p={2}>
                        <img src={data.image_source} alt="" />
                      </Grid>
                    </Grid>
                  ))}
                </Box>
            }
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

export default MyPageBottom;
