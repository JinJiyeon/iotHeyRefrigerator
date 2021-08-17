import React from 'react';
import {
  Grid,
  Container
} from '@material-ui/core';
import RecipeCard from '../../components/Recipes/Recipe_Detail/MyCard';
import RecipeBottom from '../../components/Recipes/Recipe_Detail/MyBottom';
import RecipeTimer from '../../components/Recipes/Recipe_Detail/Timer'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fixed: {
    position: 'fixed', 
    bottom: 50, 
    right: 50,
  }
});


const Recipe = () => {
  const classes = useStyles();
  
  return (
    <div>
      <main>
        <Container>
          <RecipeCard />     
          <RecipeBottom />
        </Container>
        <RecipeTimer className={classes.fixed} />
      </main>
    </div>
  );
};

export default Recipe;