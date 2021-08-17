import React, { useContext, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Container,
  CardMedia
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
    <Box bgcolor="warning.light" p={3}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
        {
          recipe.steps && 
            <div>
              {recipe.steps.map((data)=>(
                <Card>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography key={data} variant="h5">
                        {data.step_order} | {data.step_comment}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <CardMedia 
                        className={classes.cardMedia}
                        image={data.image_source}
                      >
                      </CardMedia>
                      
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </div>
        }
        </div>
      </Card>
    </Box>

  );
}

export default MyPageBottom;
