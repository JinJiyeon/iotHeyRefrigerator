import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from '../../components/Recipes/Recipe_Main/SearchBar';
import RecipeCard from '../../components/Recipes/Recipe_Main/RecipeCard';
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
        </main>
      </React.Fragment>
    </Layout>
  );
}