import React, {useContext} from 'react';
import {Grid} from '@material-ui/core';
import RecipeBack from '../../components/Recipe/MyBack';
import RecipeCard from '../../components/Recipe/MyCard';
import RecipeBar from '../../components/Recipe/MySide';
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