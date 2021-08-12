// 음식 재료 표시, 유무에 따른 색상 변화, 단계 표시 
// 이미지 레시피 사진으로, 좋아요 버튼 연결

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    padding: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 300,
    height: 300,
  },
});
const cards = [1]

const MyPageCard = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      {cards.map((recipe) => (
        <Grid key={recipe}>
        <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                재료: 
              </Typography>
              <Typography variant="subtitle1" paragraph>
                단계: 
              </Typography>
            </CardContent>
          </div>
        </Card>
        </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}

export default MyPageCard;
