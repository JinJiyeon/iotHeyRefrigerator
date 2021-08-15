import React from 'react';
import { Divider, Grid, Avatar, Paper } from '@material-ui/core';
import MyPageBack from '../../components/MyPage/MyBack';
import MyPageCard from '../../components/MyPage/MyCard';
import MyBar from '../../components/MyPage/MySide';

const Mypage = () => {
  const imgSize = {
    margin : 5,
    height : 150,
    width : 150
  }
  return (
    <div>
      <main>
        <MyPageBack />
        <Grid container spaicng={5}>
          <MyPageCard />
          <MyBar />
        </Grid>
      </main>
    </div>
  );
};

export default Mypage;