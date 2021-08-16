import React, {useState, useEffect, useContext} from 'react';
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
import FoodAdd from '../../Foods/FoodAdd';

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
  const {ingredients, setIngredients, setOpenFoodAdd} = useContext(CommonContext);
  const [editBtn, setEditBtn] = useState('편집');
  // const [openFoodAdd, setOpenFoodAdd] = useState(false);


  useEffect(()=>{
    axios.get('/user/myingredients')
    .then(res=>{
      // console.log(res.data,'res')
      setIngredients(res.data);
      // const date = res.data[0].expiration_date;
      // console.log(date,'date')
    })
  },[])

  // delFood 구현중
  const delIngredient=()=>{
    axios.post('/user/myingredients/delete')
      .then(res=>{
        console.log(res.data,'delFood-res')
      })
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
                <Button onClick={()=>{setOpenFoodAdd(true)}}>
                  {editBtn}
                </Button>
                {ingredients.map((ingredient)=>(
                  <Paper>
                    <Typography>
                      {ingredient.ingredient_name} | 
                      {ingredient.expiration_date} | 
                      <Button onClick={delIngredient(ingredient.ingredient_name, ingredient.expiration_date)}>삭제</Button>
                    </Typography>
                  </Paper>
                ))}
                <Button onClick={()=>{setEditBtn('편집')}}>
                  완료
                </Button>
              </div>
            :
              <div>
                <Button onClick={()=>{setEditBtn('추가')}}>
                  {editBtn}
                </Button>
                {ingredients.map((ingredient)=>(
                  <Paper>
                    <Typography>
                      {ingredient.ingredient_name} |
                      {ingredient.expiration_date}
                    </Typography>
                  </Paper>
                ))}
              </div>
            }
          </Paper>
        {/* </ToolBar> */}
      </AppBar>
    </Grid>
  );
}

export default MyBar;