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
  const {openForm, setOpenForm} = useContext(CommonContext);
  // 기존 Food, newFood Add
  const {foodItem, setFoodItem} = useContext(CommonContext);
  const {newFoodItem, setNewFoodItem} = useContext(CommonContext);
  // 날짜 추가
  const {expItem, setExpItem} = useContext(CommonContext);
  const {newExpItem, setNewExpItem} = useContext(CommonContext);

  // Dialog 닫기
  const onClose = () => {
    setOpenForm(false);
  };
  // 폼 인풋 마진 스타일
  const form = {
    margin: 10,
  };

  const changeInputName = e => {
    setNewFoodItem(e.target.value);
  }
  const changeInputExp = e => {
    setNewExpItem(e.target.value);
  }
  // addFood
  const addFood = () => {
    // foodItem 배열을 뜯고 newFood를 추가
    setFoodItem([...foodItem, newFoodItem]);
    setExpItem([...expItem, newExpItem]);
    // 클릭과 동시에 Dialog가 닫히도록
    setOpenForm(false);
  }
  return (
    <Dialog open={openForm} onClose={ onClose }>
      <DialogTitle>
        Add Food
      </DialogTitle>
      <form action="">
        <TextField 
          onChange={changeInputName}
          style={form}
          id="outlined-basic"
          label="name"
          variant="outlined"
        >          
        </TextField>
        <TextField 
          style={form}
          onChange={changeInputExp}
          id="outlined-basic"
          label="exp"
          variant="outlined"
          // **기본값을 5로 주고, onChange가 아니더라도 ExpItem이 입력이 되도록
          // defaultValue="5"
        >          
        </TextField>
      <Button onClick={addFood}>
        등록
      </Button>
      </form>
    </Dialog>
  );
};

export default FoodAdd;