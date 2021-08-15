import React, {useContext} from 'react';
import {Grid} from '@material-ui/core';
import RecipeBack from '../../components/Recipes/Recipe_Detail/MyBack';
import RecipeCard from '../../components/Recipes/Recipe_Detail/MyCard';
import RecipeBar from '../../components/Recipes/Recipe_Detail/MySide';
import { CommonContext } from '../../context/CommonContext';
const Recipe = () => {

  const { recipeId } = useContext(CommonContext);
  return (
    <div>
      <main>
        <RecipeBack />
        <Grid container spaicng={5}>
          <RecipeCard />
          <RecipeBar />
        </Grid>
      </main>
    </div>
  );
};

export default Recipe;