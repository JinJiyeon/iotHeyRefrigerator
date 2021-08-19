import React from 'react';
import Footer from './Footer';
import Header from './Header'

const Layout = (props) => {

  const {children} = props;

  return (
    <div style={{height:'100vh'}} >
      <Header />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;