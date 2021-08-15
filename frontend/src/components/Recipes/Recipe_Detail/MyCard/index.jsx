// 음식 재료 표시, 유무에 따른 색상 변화, 단계 표시 
// 이미지 레시피 사진으로, 좋아요 버튼 연결

import React, { useContext, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import {
  Divider,
} from '@material-ui/core'
import { CommonContext } from '../../../../context/CommonContext';
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
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    recipeApi();
  }, [])
  // 액시오스
  const recipeApi = () => {
    // console.log('here')
    console.log(recipeId.recipe_info_id)
    axios.get(`/recipe/${recipeId.recipe_info_id}`)
      .then(res => {
        console.log(res.data, 'axios');
        setRecipe(res.data, 'axios');
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  return (
    <Grid item xs={12} md={6}>
        <Grid>
        <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
                <Typography component="h2" variant="h3">
                  재료: 
                </Typography>
                {/* 재료가 값이 잇을때 보여주세요. 이걸안하면 map함수 자꾸 비어있다고 안돌아감 */}
                {
                  recipe.ingredients && 
                    <div>
                      {recipe.ingredients.map((data)=>(
                          <Typography key={data} component="h2" variant="h5">
                            {data.ingredient_name}
                          </Typography>
                        ))}
                    </div>
                }
                <Divider />
                <Typography variant="h3" paragraph>
                  단계: 
                </Typography>
                {
                  recipe.steps && 
                    <div>
                      {recipe.steps.map((data)=>(
                          <Typography key={data} component="h2" variant="h5">
                            {data.step_order} | {data.step_comment}
                          </Typography>
                        ))}
                    </div>
                }
            </CardContent>
          </div>
        </Card>
        </CardActionArea>
        </Grid>
    </Grid>
  );
}

export default MyPageCard;
