import React from 'react';
import {Grid} from '@material-ui/core';
import RecipeCard from '../../components/Recipes/Recipe_Detail/MyCard';
import RecipeBottom from '../../components/Recipes/Recipe_Detail/MyBottom';

const Recipe = () => {
  
  return (
    <div>
      <main>
        <Grid container spaicng={8} style={{paddingLeft:150}}>
          <RecipeCard />     
          <RecipeBottom />     
        </Grid>
        
      </main>
    </div>
  );
};

export default Recipe;