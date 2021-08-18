import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Toolbar,
  Paper,
  Grid,
  Typography,
  AppBar,
  Button,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import SearchIcon from '@material-ui/icons/Search';
// import Wrapper from './styles';

const Header = props => {
  let history = useHistory();

  return (
    <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none', marginTop:10}}>
    {/* <AppBar position="relative" color="secondary"> */}
      <Grid container justify="space-around" alignItems="center">
        <Grid item style={{marginRight:200}}>
          <Paper>
            <Button
              onClick={()=>{
                history.push('/home');
              }}
              >
              Home
            </Button>
          </Paper>
        </Grid>
        <Grid item>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button>
                <SearchIcon 
                  onClick={()=>{
                    history.push('/search')
                  }}
                />
              </Button>
            </Grid>
            <Grid item>
              <Paper>
                {Cookies.get('user_id') ?
                  <div>
                    {/* <Button onClick={onClickBtn} variant="contained" color="primary">
                      MyPage
                    </Button> */}
                    <Button onClick={()=>{
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
              </Paper>        
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
