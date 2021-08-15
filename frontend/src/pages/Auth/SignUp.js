import React, {useState} from 'react';
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

export default function SignUp() {
  let history = useHistory();

  const classes = useStyles();

  const [user_id, setUser_id] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')

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
            Sign Up
          </Typography>
          <form className={classes.form} noValidate
            onSubmit={e =>{
              e.preventDefault();
              let body = {
                user_id: user_id,
                password: password,
                password2: password2,
                email: email,
              }
              console.log(body, 'body')
              axios.post('/auth/signup', body)
                .then(res => {
                  console.log(res)
                  // accessToken, 로그인 저장 후 메인페이지로 이동
                  localStorage.setItem('jwt', Cookies.get('accessToken'))
                  history.push('/')
                })
                .catch(err => {
                  alert(err.response.data)
                  console.log(err.response.data)
                })
            }}  
          >
            <TextField
              onChange={(e)=>{setEmail(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email를 입력해주세요"
              label="email"
              type="email"
              id="email"
              autoComplete="email"
            />
            <TextField
              onChange={(e)=>{setUser_id(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ID"
              label="ID"
              name="ID를 입력해주세요"
              autoComplete="ID"
              autoFocus
            />
            <TextField
              onChange={(e)=>{setPassword(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password1"
              label="password를 입력해주세요"
              type="password"
              id="password1"
              autoComplete="password1"
            />
            <TextField
              onChange={(e)=>{setPassword2(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="동일한 password를 다시 입력해주세요"
              type="password"
              id="password2"
              autoComplete="password2"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              확인
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );}