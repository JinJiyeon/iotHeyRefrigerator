import React, {useState}  from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box
} from '@material-ui/core/';
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
  // NavContent: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(8, 0, 6),
  // },
  toolbar: {
    paddingLeft: '80%',
  },
  // cardGrid: {
  //   paddingTop: theme.spacing(8),
  //   paddingBottom: theme.spacing(8),
  // },
  // card: {
  //   height: '170%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   width: '80%',
  // },
  // cardMedia: {
  //   paddingTop: '56.25%', // 16:9
  //   height: '170%'
  // },
  // cardContent: {
  //   flexGrow: 1,
  // },
}));

const cards = [1, 2];

export default function Home() {  

  const classes = useStyles();

  const [visible, setVisible] = useState('로그인안했음');

  const visibleHandler = () => {
    setVisible('로그인했음');
  };
  const invisibleHandler = () => {
    setVisible('로그인안했음');
  };

   // // 로그인 상태에 따라 MyPage, 로그인 로그아웃 보여주기
  let history = useHistory();

    const onClickBtn = () => {
      history.push('/MyPage');
  };

  return (    

    // <Button onClick={visibleHandler}> 
    // {/* 로그인 했을 시 Mypage로 보임 */}
    //   visible
    // </Button>
    // {/* 비로그인시 보이지 않음 */}
    // <Button onClick={invisibleHandler}>
    //   invisible
    // </Button>  
  
    <React.Fragment>
      <CssBaseline />
      {/* Nav-Bar */}
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none'}}>
      {/* <AppBar position="relative" color="secondary"> */}
        <Toolbar className={classes.toolbar}>
          <Paper>
            {Cookies.get('user_id') ?
              <div>
                <Button onClick={onClickBtn} variant="contained" color="primary">
                  MyPage
                </Button>
                <Button onClick={()=>{
                  // state상태로 담아서 렌더링 바로 되도록? 해주면 더 좋을듯
                  Cookies.remove('user_id')
                  Cookies.remove('refreshToken')
                  Cookies.remove('accessToken')
                  history.push('/SignIn')
                }}
                  variant="contained" color="primary"
                >
                  SignOut
                </Button>                                        
              </div>
            :
              <Button onClick={()=>{
                history.push('/SignIn')
              }}
                variant="contained" color="primary"
              >
                SignIn
              </Button>
            }
          {/* {visible === '로그인했음' && <Home /> }
          {visible === '로그인안했음' && <Button>LogIn</Button>}   */}
          </Paper>        
        </Toolbar>
      </AppBar>
      <Box bgcolor="warning.light" p={3}>
        <div className={classes.NavContent}>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="secondary">
              냉장고를 부탁해
            </Typography>                   
          </Container>
        </div>
        {/* <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={6}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2" align="center">
                      기능명
                    </Typography>                    
                  </CardContent>                  
                </Card>                
              </Grid>
            ))}
          </Grid>          
        </Container> */}
        <HomeCard />
      </Box>      
    </React.Fragment>    
  );
}
