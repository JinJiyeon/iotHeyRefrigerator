import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

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

export default function MyPageCard() {
  const classes = useStyles();
  // const { post } = props;
  return (
    <Grid item xs={12} md={6}>
      {cards.map((recipe) => (
        <Grid key={recipe}>
        <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                레시피
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                날짜_20.08.08
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum sit, provident reprehenderit eum amet possimus dolores, autem adipisci deleniti, ab repellendus omnis impedit ipsum nam illo iusto. Expedita, debitis unde.
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia}
            image='https://source.unsplash.com/random'
            title='random'
            />
          </Hidden>
        </Card>
        </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}
