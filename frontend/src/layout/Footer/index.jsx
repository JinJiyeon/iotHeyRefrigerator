import React from 'react';
import { 
  Typography,
} from '@material-ui/core';
const Copyright=()=>{
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{height:'23px'}}>
      {'Copyright © '}      
        7링 바이브      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer = () => {
  return (
    <div style={{backgroundColor: 'rgb(254,254,254)', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div>
      <Copyright />
      </div>
    </div>
  );
};

export default Footer;