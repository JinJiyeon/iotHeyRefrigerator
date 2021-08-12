// 레시피 이름만 맞는 이름이 뜨도록 연결요망 사진은 지금처럼 해도 될듯?

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(13),
      paddingRight: 0,
    },
  },
}));

const MyPageBack = () => {
  const classes = useStyles();
  // const { post } = props;

  return (
    <Paper className={classes.mainFeaturedPost}>
      <img style={{ display: 'none' }} src="https://source.unsplash.com/random" alt='' />
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}> 
            <Typography component="h1" variant="h3" color="inherit"
              gutterBottom
            >
              레시피 이름
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MyPageBack;