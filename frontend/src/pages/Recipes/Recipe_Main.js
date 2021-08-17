import React, {useState, useEffect, useRef, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// 추가
import SearchBar from '../../components/Recipes/Recipe_Main/SearchBar';
import RecipeCard from '../../components/Recipes/Recipe_Main/RecipeCard';
import RecipeTimer from '../../components/Recipes/Recipe_Detail/Timer';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}      
        7링 바이브      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Recipe_Main() {
 
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <SearchBar /> 
        <RecipeCard />
        {/* <RecipeTimer /> */}
      </main>
        <Copyright />
    </React.Fragment>
  );
}