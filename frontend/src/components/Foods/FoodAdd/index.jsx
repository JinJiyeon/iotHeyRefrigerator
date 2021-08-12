import React, {useContext} from 'react';
import { CommonContext } from '../../../context/CommonContext';
import {
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField, CssBaseline,
  Button,
  Avatar,
  Typography,
  Container,
  makeStyles,
  Divider,
  Dialog,
  DialogTitle,
} from '@material-ui/core';

const FoodAdd = () => {
  const {openFoodAddForm, setopenFoodAddForm, rows, setRows} = useContext(CommonContext);
  const {newFood, setNewFood, newExp, setNewExp} = useContext(CommonContext);
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

  // createData_Dummy
  const createData = (id, name, date) => {
    return { id, name, date };
  }
  // addFood
  const addFood = (e) => {
    e.preventDefault();
    rows.push(createData(rows.length, newFood, newExp))
    console.log(rows, 'addFood')
    setopenFoodAddForm(false);
  }
  return (
    <Dialog open={openFoodAddForm} onClose={ onClose }>
      <DialogTitle>
        Add Food
      </DialogTitle>
      <form action="" onSubmit={addFood}>
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
          label="exp"
          variant="outlined"
          // **기본값을 5로 주고, onChange가 아니더라도 ExpItem이 입력이 되도록
          // defaultValue="5"
        >          
        </TextField>
        <Button type='submit'>
          등록
        </Button>
      </form>
    </Dialog>
  );
};

export default FoodAdd;