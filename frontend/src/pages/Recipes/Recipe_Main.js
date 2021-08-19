import React, {useState, useEffect, useRef, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// 추가
import SearchBar from '../../components/Recipes/Recipe_Main/SearchBar';
import RecipeCard from '../../components/Recipes/Recipe_Main/RecipeCard';
import RecipeTimer from '../../components/Recipes/Recipe_Detail/Timer';
import { palette } from '@material-ui/system';
import { makeStyles} from '@material-ui/core';
import Layout from '../../layout'
const useStyles = makeStyles((theme) => ({
  testbg: {
    backgroundColor: theme.palette.primary.main
  },
  testbg2: {
    backgroundColor: 'red'
  },
  testbg3: {
    backgroundColor:'white'
  }
})
)
function Copyright() {
  return (
    
    <Typography variant="body2" color="textSecondary" align="center" style={{height:'23px'}} >
      {'Copyright © '}      
        7링 바이브      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    
    );
  }
  
  export default function Recipe_Main() {
    const classes = useStyles();
    
    return (
      <Layout style={{height:''}}>
      <React.Fragment>
        <CssBaseline />
        <main style={{minHeight:'100vh', margin:'0px 0px -23px 0px'}}  className={classes.testbg}>
          <div className={classes.testbg3}  >
            <SearchBar className={classes.testbg2} /> 
          </div>
          <div style={{minHeight:'100vh', margin:'0px 0px -23px 0px'}}>
            <RecipeCard/>
          </div>

          {/* <RecipeTimer /> */}
        </main>
          {/* <div className={classes.testbg3}>
            <Copyright />
          </div> */}
      </React.Fragment>
    </Layout>
  );
}