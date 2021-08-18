import React from 'react';
import {
  Grid,
  Container
} from '@material-ui/core';
import RecipeCard from '../../components/Recipes/Recipe_Detail/MyCard';
import RecipeBottom from '../../components/Recipes/Recipe_Detail/MyBottom';
import RecipeTimer from '../../components/Recipes/Recipe_Detail/Timer'



const Recipe = () => {
  
  return (
    <div>
      <main>
        <Container>
          <RecipeCard />     
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <RecipeBottom />
            </Grid>
            <Grid item xs={3}>
              <RecipeTimer />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Recipe;