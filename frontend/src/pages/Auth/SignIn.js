import React,{useState} from 'react';
import { useHistory } from 'react-router';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import Cookies from 'js-cookie';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        7링 바이브 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',  
    // 크기 조정 해줘야 함.
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory();

  const classes = useStyles();
  // axios 로그인 테슽
  // const userRequest = axios.post('/auth/login')
  //   .then(res => {res.data})
  //   .catch(err=> {console.log(err)})
  const [user_id, setUser_id] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate
            onSubmit={(e) => {
              e.preventDefault();
              let body = {
                user_id: user_id,
                password: password,
              }
              console.log(body)
              console.log(Cookies.get('user_id'),'Cookies')
              axios.post('/auth/login', body)
                .then(res => {
                  console.log(res, 'res')
                  axios.get('/iot/led')
                    .then(iot=>{
                      console.log(iot, 'iot')
                    })
                    .catch(iotErr=>{
                      console.log(iotErr.response, 'iot')
                    })
                  history.push('/')
                })
                .catch(err => {
                  if (err.response.data == 'login failed') {
                    alert('아이디나 비밀번호를 확인해주세요.')
                    // 아이디 없을 때,
                    // 아이디나 비밀번호가 틀렸을 때,
                  } else {
                    alert('알 수 없는 오류로 다시 시도해주세요.')
                  }
                  console.log(err.response.data)
                })
            }}
          >
            <TextField
              onChange={(e)=>{setUser_id(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ID"
              label="ID"
              name="ID"
              autoComplete="ID"
              autoFocus
            />
            <TextField
              onChange={(e)=>{setPassword(e.currentTarget.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container xs={12}>
              <Grid item xs={9}>                 
                <Link href="/signup" variant="Signup">     {/* Sign up 으로 보내주는거 추가 */}
                  {"회원이 아니신가요?"}
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link href="/home" variant="Signup">
                  {"Home으로"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}