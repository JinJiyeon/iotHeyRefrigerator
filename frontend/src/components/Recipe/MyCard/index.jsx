// 음식 재료 표시, 유무에 따른 색상 변화, 단계 표시 
// 이미지 레시피 사진으로, 좋아요 버튼 연결

import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import { CommonContext } from '../../../context/CommonContext';
import axios from 'axios';

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

const MyPageCard = () => {
  const classes = useStyles();
  const {recipeId} = useContext(CommonContext);
  const [recipe, setRecipe] = useState();
  // 액시오스
  const recipeApi = () => {
    console.log('here')
    console.log(recipeId.recipe_info_id)
    axios.get(`/recipe/${recipeId.recipe_info_id}`)
      .then(res => {
        console.log(res.data, 'axios');
        // setRecipe(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Grid item xs={12} md={6}>
        <Grid>
        <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <button onClick={recipeApi}>axios</button>
              <Typography component="h2" variant="h5">
                재료: {recipe}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                단계: 
              </Typography>
            </CardContent>
          </div>
        </Card>
        </CardActionArea>
        </Grid>
    </Grid>
  );
}

export default MyPageCard;
