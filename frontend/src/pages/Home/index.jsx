import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core/';
import HomeCard from '../../components/Home';
import Layout from '../../layout';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: '90%',
  },
  text: {
    margin: '0px 0px 20px 0px',
    fontSize: "8.5rem",
    color: 'rgb(81,57,36)'
  }
}));

export default function Home() {  

  const classes = useStyles();

  return (    

    <React.Fragment>
      <Layout>
        <CssBaseline />  
        <Box bgcolor="warning.light" p={20}   style={{height:'100vh', margin: '0px 0px -23px 0px'}}  >
          <div className={classes.NavContent}>
            <Container maxWidth="">
              <Typography variant="h2" align="center" color="secondary" className={classes.text}>
                냉장고를 부탁해
              </Typography>                   
            </Container>
          </div>
          <HomeCard />
        </Box>      
      </Layout>
    </React.Fragment>    
  );
}
