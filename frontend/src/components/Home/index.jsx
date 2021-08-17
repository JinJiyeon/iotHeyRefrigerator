import React from 'react';
import {useHistory} from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';


// 간단한 카드 스타일링
const imgStyle = {
  height: 0,
  paddingTop: '56.25%', // 16:9
  margin: 20,
};

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  // card: {
  //   height: '170%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   width: '80%',
  // },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: '170%'
  },
  // cardContent: {
  //   flexGrow: 1,
  // },
}));


const HomeCard = () => {

  const dummy = [
    { id:1, title:'🥗 레시피 🥘', path:'/Recipes'},
    { id:2, title:'🥦 재료 🥩', path:'/Foods'},
  ];
  const history = useHistory();
  const classes = useStyles();

// list item recipe
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={6}>
        {dummy.map((dummy, index) => (
        <Grid item xs={6} key={index}>
          <Card 
            className={classes.card}
            onClick = {() => {
              history.push(`${dummy.path}`)
            }}
          >
            <CardContent className={classes.cardContent}>
              <Typography variant="h2" component="h2" align="center" color="warning">
                {dummy.title}
              </Typography>                    
            </CardContent>
          </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeCard;