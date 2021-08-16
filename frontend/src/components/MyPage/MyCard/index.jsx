import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
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
    width: 160,
  },
});
const cards = [1,2,3,4,5,6,7,8,9]

const MyPageCard = () => {
  const classes = useStyles();
  // mypage liked recipe info
  const [mylikes, setMylikes] = useState([]);

  // each liked recipe detail info
  // const [likedRecipe, setLikedRecipe] = useState([]);

  // mypage데이터 마운트
  useEffect(()=>{
    axios.get('/user/mypage')
    .then(res=>{
      console.log(res.data.likes);
      setMylikes(res.data.likes);
    })
    // .then(()=>{
    //   recipeApi();
    //   console.log(likedRecipe,'axios-liked')
    // })
    .catch(err=>{
      console.log(err.response);
    })
  }, [])

  // const recipeApi = () => {
  //   // console.log('here')
  //   console.log(mypage,'mypage')
  //   for (let i=0; i<mypage.length; i++) {
  //     axios.get(`/recipe/${mypage[i].recipe_info_id}`)
  //     .then(res => {
  //       console.log(res.data, 'axios');
  //       console.log(likedRecipe,'likedRecipe')
  //       setLikedRecipe([...likedRecipe, res.data]);
  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //     })
  //   }
  // };
  return (
      // <button onClick={()=>{console.log(mylikes)}}>콘솔</button>
    <Grid item xs={12} md={6}>
      {mylikes.map((like) => (
        <Grid key={like}>
        <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {like.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                필요한 재료
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {like.ingredients.map((ingredients)=>(
                  <span>
                    {ingredients.ingredient_name} ,
                  </span>
                      ))}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                레시피로 이동
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia}
            image={like.img}
            title={like.title}
            />
          </Hidden>
        </Card>
        </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}

export default MyPageCard;
