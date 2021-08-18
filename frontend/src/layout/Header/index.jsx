import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Toolbar,
  Paper,
  Grid,
  AppBar,
  Button,
  useScrollTrigger,
  Slide,
} from '@material-ui/core';
import PropTypes from 'prop-types'
import Cookies from 'js-cookie';
import { CommonContext } from '../../context/CommonContext';
import SearchIcon from '@material-ui/icons/Search';


const HideOnScroll=(props)=>{
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Header = props => {
  let history = useHistory();

  return (
    <HideOnScroll {...props}>
    <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none', marginTop:10}}>
    {/* <AppBar position="relative" color="secondary"> */}
      <Grid container justify="space-around" alignItems="center">
        <Grid item style={{marginRight:200}}>
          {/* <Paper> */}
            <Button
              size="small"
              onClick={()=>{
                history.push('/home');
              }}
              >
              <img src="https://img.icons8.com/material-outlined/24/000000/home--v2.png"/>
            </Button>
          {/* </Paper> */}
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
  </HideOnScroll>
  );
};

export default Header;
