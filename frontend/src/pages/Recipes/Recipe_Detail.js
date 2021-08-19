import React from 'react';
import { useHistory } from 'react-router';
import {
  Grid,
  Button,
} from '@material-ui/core';
import RecipeCard from '../../components/Recipes/Recipe_Detail/MyCard';
import RecipeBottom from '../../components/Recipes/Recipe_Detail/MyBottom';
import RecipeTimer from '../../components/Recipes/Recipe_Detail/Timer'

const backBtn ={
  position:"fixed",
  marginTop:"25%",
}

const Recipe = () => {
  let history = useHistory();
  return (
    <div>
      <main>
        <Button
          style={backBtn} 
          onClick={()=>{history.goBack()}}
        >
          <img width="70px" src="https://image.flaticon.com/icons/png/512/93/93634.png" />
        </Button>

          <RecipeCard />     
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <RecipeBottom />
            </Grid>
            <Grid item xs={3}>
              <RecipeTimer />
            </Grid>
          </Grid>

      </main>
    </div>
  );
};

export default Recipe;