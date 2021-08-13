import React, {useContext} from 'react';
import {
  makeStyles,
  Grid,
} from '@material-ui/core';
import RecipeTimer from '../Timer';
import LikeButton from '../Like';
import { CommonContext } from '../../../context/CommonContext';



const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    width: 300,
    height: 300,
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

const RecipeBar = () => {
  const { recipeId } = useContext(CommonContext);
  const classes = useStyles();
  
  return (
    <Grid item xs={12} md={6}>
      <span><img className={classes.sidebarAboutBox} style={{ display: '' }} src={recipeId.recipe_info_image} alt='' xsDown /></span>      
      <LikeButton />
      <div><RecipeTimer /></div>
    </Grid>
  );
}


export default RecipeBar;