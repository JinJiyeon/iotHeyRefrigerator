import React, {useState, useEffect, useContext} from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  makeStyles,
  Grid,
  Paper,
  Typography,
  AppBar,
} from '@material-ui/core';
import { CommonContext } from '../../../context/CommonContext';
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
  const {ingredients, setIngredients} = useContext(CommonContext);
  const [editBtn, setEditBtn] = useState('편집');
  useEffect(()=>{
    axios.get('/user/myingredients')
    .then(res=>{
      // console.log(res.data,'res')
      setIngredients(res.data);
      // const date = res.data[0].expiration_date;
      // console.log(date,'date')
    })
  },[])
  const ingredientsEditBtn =()=>{
    setEditBtn('추가')
  };

  // test버튼
  const test = () => {
    axios.get('/user/myingredients')
    .then(res=>{
      console.log(res.data,'res')
      setIngredients(res.data);
      // const date = res.data[0].expiration_date;
      // console.log(date,'date')
    })
    console.log('hi')
  }
  return (
    
    <Grid item xs={12} md={4}>
      <AppBar position='sticky' className={classes.toolbar}>
        {/* <ToolBar position='sticky' className={classes.toolbar}> */}
          <Paper elevation={0} className={classes.sidebarAboutBox}>
            <Typography variant="h6" gutterBottom>
              보유중인 재료
            </Typography>
            {editBtn === '추가' ?
              <div>
                <Button onClick={ingredientsEditBtn}>
                  {editBtn}
                </Button>
                {ingredients.map((ingredient)=>(
                  <Typography>
                    {ingredient.ingredient_name} | {ingredient.expiration_date} | 삭제
                  </Typography>
                ))}
                <Button onClick={()=>{setEditBtn('편집')}}>
                  완료
                </Button>
              </div>
            :
              <div>
                <Button onClick={ingredientsEditBtn}>
                  {editBtn}
                </Button>
                {ingredients.map((ingredient)=>(
                  <Typography>
                    {ingredient.ingredient_name} | {ingredient.expiration_date}
                  </Typography>
                ))}
              </div>
            }
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