import React, {useState}  from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper  from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeCard from '../../components/Home';
import Cookies from 'js-cookie';
import { palette } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: '80%',
  },
}));

export default function Home() {  

  const classes = useStyles();

   // // 로그인 상태에 따라 MyPage, 로그인 로그아웃 보여주기
  let history = useHistory();

    const onClickBtn = () => {
      history.push('/MyPage');
  };

  return (    

    <React.Fragment>
      <CssBaseline />
      {/* Nav-Bar */}
      {/* 지연 : appbar (navbar) 투명하게 만듦. */}
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar className={classes.toolbar}>
          <Paper>
            {Cookies.get('user_id') ?
              <div>
                <Button onClick={onClickBtn} variant="contained" color="warning.main">
                  MyPage
                </Button>
                <Button onClick={()=>{
                  Cookies.remove('user_id')
                  Cookies.remove('refreshToken')
                  Cookies.remove('accessToken')
                  history.push('/SignIn')
                }}
                  variant="contained" color="warning.main"
                >
                  SignOut
                </Button>                                        
              </div>
            :
              <Button onClick={()=>{
                history.push('/SignIn')
              }}
                variant="contained" color="warning.main"
              >
                SignIn
              </Button>
            }
          </Paper>        
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.NavContent}>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="warning.main">
              7링 바이브 Logo
            </Typography>                   
          </Container>
        </div>
        <HomeCard />
      </main>      
    </React.Fragment>    
  );
}
