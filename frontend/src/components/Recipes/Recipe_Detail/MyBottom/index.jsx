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
  card: {
    display: 'flex',
    padding: 15,
  },
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
    <Grid item xs={10} md={10}>
        <Grid>
        <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
                <Divider /><Typography variant="h3" paragraph>
                  단계: 
                </Typography>
                {
                  recipe.steps && 
                    <div>
                      {recipe.steps.map((data)=>(
                        <div>
                          <Typography key={data} component="h2" variant="h5">
                            {data.step_order} | {data.step_comment}
                          </Typography>
                          <img src={data.image_source} alt="" />
                        </div>
                        ))}
                    </div>
                }
            </CardContent>
          </div>
        </Card>
        </CardActionArea>
        </Grid>
    </Grid>
  );
}

export default MyPageBottom;
