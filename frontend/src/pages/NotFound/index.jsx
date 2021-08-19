import React from 'react';
import {
  Grid,
  Box,
  CardMedia,
  Typography,
  Link,
} from '@material-ui/core'
const NotFound = () => {
  return (
    <Grid container justify="center">
      <Grid item>
        <Typography variant='h3'>
        <br/><br/>안돼!
        </Typography>
      </Grid>
      <Grid item>
          <CardMedia style={{height:600, width:600}} image="https://img.icons8.com/metro/452/under-construction.png" title="삽질! 삽질!" />
            <Typography variant='h2' color='primary'>알고 계시나요?</Typography>
            <br/>
            <Typography variant='h5'>당신의 호기심이 누군가를 해치고 있습니다!!!</Typography>
          <Box bgcolor='text.disabled'>
            <Link href='/home'>...누르지 않으면 당신의 컴퓨터는 디도스 공격을 받게 됩니다.</Link>
          </Box>
      </Grid>
      <Grid item>
        <Typography variant='h3'>
        <br/><br/><br/><br/><br/><br/>멈춰!
        </Typography>
        <Typography><br/><br/>Plz, Stop debugging!</Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;