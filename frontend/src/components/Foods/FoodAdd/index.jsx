import React, {useContext} from 'react';
import { CommonContext } from '../../../context/CommonContext';
import {
  TextField,
  Button,
  Typography,
  Container,
  DialogTitle,
} from '@material-ui/core';
import axios from 'axios';

const FoodAdd = () => {
  const {openFoodAddForm, setopenFoodAddForm} = useContext(CommonContext);
  const {newFood, setNewFood, newExp, setNewExp} = useContext(CommonContext);
  const {setOpenFoodAdd} = useContext(CommonContext);

  // 기존 Food, newFood Add
  // 날짜 추가

  // Dialog 닫기
  const onClose = () => {
    setopenFoodAddForm(false);
  };
  // 폼 인풋 마진 스타일
  const form = {
    margin: 10,
  };

  // addFood
  const addFood = (e) => {
    e.preventDefault();
    setopenFoodAddForm(false);
    setOpenFoodAdd(false);
    let body = {
      ingredient_name : newFood,
      expiration_date : newExp,
    }
    axios.post('user/myingredients/add', body)
      .then(res=>{
        console.log(res.data, 'FoodAdd-res');
      })
      .catch(err=>{
        console.log(err.response,'FoodAdd-err')
      })
  }
  return (
    <Container open={openFoodAddForm} onClose={ onClose } style={{height:'100vh', margin: '0px 0px -23px 0px', padding:70, marginLeft:'15%'}}>
      <DialogTitle>
        Add Food
      </DialogTitle>
        <form action="" onSubmit={addFood} style={{display:'flex', justifyContent:'center'}}>
            <TextField 
              onChange={ e => {setNewFood(e.target.value)}}
              style={form}
              id="outlined-basic"
              label="name"
              variant="outlined"
            >          
            </TextField>
            <TextField 
              style={form}
              onChange={e => {setNewExp(e.target.value)}}
              id="outlined-basic"
              type="date"
              // label="exp"
              variant="outlined"
            >          
            </TextField>
            <Button type='submit' variant="outlined">
              <Typography variant="h5">
                등록
              </Typography>
            </Button>
            <Button onClick={()=>{setOpenFoodAdd(false);}} variant="outlined">
              <Typography variant="h5">
                취소
              </Typography>
            </Button>
        </form>      
    </Container>
  );
};

export default FoodAdd;