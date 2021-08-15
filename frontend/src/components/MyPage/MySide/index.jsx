import React, {useEffect} from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  makeStyles,
  Grid,
  Paper,
  Typography,
  AppBar,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'white',
  },
}));

const MyBar = () => {
  const classes = useStyles();
  
  // useEffect(()=>{
  //   axios.get('/recipe/420777')
  //     .then(res=>{
  //       console.log(res,'res')
  //     })
  //   console.log('useEffect')
  // },[])


  const test = () => {
    axios.get('/user/myingredients')
    .then(res=>{
      console.log(res.data,'res')
      const date = res.data[0].expiration_date;
      console.log(date,'date')
    })
    console.log('hi')
  }
  return (
    
    <Grid item xs={12} md={4}>
      <AppBar position='sticky' className={classes.toolbar}>
        {/* <ToolBar position='sticky' className={classes.toolbar}> */}
          <Paper elevation={0} className={classes.sidebarAboutBox}>
            <Typography variant="h6" gutterBottom>
              재료 Sticky Box
            </Typography>
            <Typography>감자</Typography>
            <Button onClick={test}> 
              Axios테스트용
            </Button>
          </Paper>
        {/* </ToolBar> */}
      </AppBar>
    </Grid>
  );
}

export default MyBar;