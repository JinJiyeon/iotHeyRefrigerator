import React from 'react';
import {useHistory} from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';

// 간단한 카드 스타일링
const imgStyle = {
  height: 0,
  paddingTop: '56.25%', // 16:9
  margin: 20,
};
const cardStyle = {
  margin: 50,
};

const HomeCard = () => {

  const dummy = [
    { id:1, title:'레시피', path:'/Recipes', img:"https://image.flaticon.com/icons/png/512/291/291990.png"},
    { id:2, title:'재료', path:'/Foods', img:"https://as1.ftcdn.net/v2/jpg/01/66/42/76/1000_F_166427637_p7cgjDJ4nSI8OMSmMOy6o2P1an4NETOu.jpg"},
  ];
  const history = useHistory();
// list item recipe
  return (
    <Grid container spacing={5}>
      {dummy.map((dummy, index) => (
      <Grid item xs={6} key={index}>
        <Card style={cardStyle}
          onClick = {() => {
            history.push(`${dummy.path}`)
          }}
        >
          <CardMedia
            style = {imgStyle}
            image={dummy.img}
            title={dummy.title}
          />
          <CardContent>
            {dummy.title}
          </CardContent>
        </Card>
        </Grid>
      ))}
   </Grid>
  );
};

export default HomeCard;