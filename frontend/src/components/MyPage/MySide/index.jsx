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
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

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
    ingredientApi();
  },[])

  // 재료 DB GET
  const ingredientApi =()=>{
    axios.get('/user/myingredients')
    .then(res=>{
      console.log(res.data,'ingredi-get-res')
      // 재료 데이터 수정 yy.mm.dd.Txx:xx:xx -> yy.mm.dd
      for (let i=0; i<res.data.length; i++){
        res.data[i].expiration_date=res.data[i].expiration_date.substr(0, 10)
      }
      setIngredients(res.data);
      iotApi();
    })
  };

  // 재료 DB DEL
  const delIngredient=(params)=>{
    console.log(params, 'del-food-data')
    axios.post('/user/myingredients/delete',params)
      .then(res=>{
        console.log(res,'delFood-res')
        ingredientApi();
        iotApi();
      })
      .catch(err=>{
        console.log(err.response, 'delFood-err')
      })
  }

  // iot
  const iotApi =()=>{
    axios.get('/iot/led')
      .then(res=>{
        console.log(res, 'iot-res')
      })
  };
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
          
                      <Button onClick={()=>{delIngredient(ingredient)}}>
                        삭제
                      </Button>
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