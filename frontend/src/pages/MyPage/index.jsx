import React, {useContext} from 'react';
import { Divider, Grid, Avatar, Paper } from '@material-ui/core';
import MyPageBack from '../../components/MyPage/MyBack';
import MyPageCard from '../../components/MyPage/MyCard';
import MyBar from '../../components/MyPage/MySide';
import FoodAdd from '../../components/Foods/FoodAdd';
import { CommonContext } from '../../context/CommonContext';

const Mypage = () => {
  const {openFoodAdd, setOpenFoodAdd} = useContext(CommonContext);
  const imgSize = {
    margin : 5,
    height : 150,
    width : 150
  }
  return (
    <div>
      <main>
        { 
        openFoodAdd
        ?
        <FoodAdd />
        :
        <div>
        <MyPageBack />
        <Grid container spaicng={5}>
          <MyPageCard />
          <MyBar />
        </Grid>
        </div>
        }
      </main>
    </div>
  );
};

export default Mypage;