import React from 'react';
import Footer from './Footer';
import Header from './Header'
import {
  Container,
} from '@material-ui/core';

const Layout = (props) => {

  const {children} = props;

  return (
    <div>
      <Header />
      <Container>
        <div>{children}</div>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;