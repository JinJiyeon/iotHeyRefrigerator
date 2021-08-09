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
      <h1>My Page</h1>
      {/* <Divider />

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Avatar style={imgSize} src="https://pbs.twimg.com/profile_images/3265280691/3851920b12828c1994992aa22d0b84fa_400x400.jpeg"/>
        </Grid>
        <Grid item xs={9}>
          <Paper>
           Profile Script
           <Divider />
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, quia perspiciatis necessitatibus culpa ratione dolore ex voluptate enim accusamus voluptas earum. Sint nihil earum officiis neque beatae officia, odit dolorum?
          </Paper>
        </Grid>
      </Grid>
      <Divider />
      <Grid>

        <Grid container spacing={5}>
          <Grid item>
              <h1>내 재료 목록</h1>
          </Grid>
        </Grid>
          <Grid item xs={3}>
            <Paper>감자전 </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>떡갈비 </Paper>
          </Grid>
        <Divider />

        <Grid container spacing={5}>
          <Grid item>
              <h1>레시피 목록</h1>
          </Grid>
        </Grid>
          <Grid item xs={3}>
            <Paper>제육볶음 </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>꿔바로우 </Paper>
          </Grid>
      </Grid>
      <br />
      <Divider />
      <br /> */}
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