import React from 'react';
import { 
  Typography,
} from '@material-ui/core';
const Copyright=()=>{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}      
        7링 바이브      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer = () => {
  return (
    <div>
      <h2>하이</h2>
      <Copyright />
    </div>
  );
};

export default Footer;