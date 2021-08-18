import React from 'react';
import Footer from './Footer';
import Header from './Header'
import {
  Container,
} from '@material-ui/core';

const Layout = (props) => {

  const {children} = props;

  return (
    <div style={{height:'100vh'}} >
      <Header />
      {/* <Container> */}
        {children}
      {/* </Container> */}
      <Footer />
    </div>
  );
};

export default Layout;