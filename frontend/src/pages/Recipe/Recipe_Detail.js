import React from 'react';
import {Grid} from '@material-ui/core';
import RecipeBack from '../../components/Recipe/MyBack';
import RecipeCard from '../../components/Recipe/MyCard';
import RecipeBar from '../../components/Recipe/MySide';

const Recipe = () => {

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