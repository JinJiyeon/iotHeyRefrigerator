import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// 지연 : font, color 통일하기 위함. primary는 회색, secondary는 노란색입니다.
// 기본 폰트는 주아체, h4(설명)은 온글숲으로 했습니다. 이거는 나중에 바꿔도 됨!
const theme = createMuiTheme({
  typography: {
    fontFamily: "fontPrimary",
    h4: {
      fontFamily: "fontSecondary"
    },

  },
  pass: {
    fontFamily: "Monaco"
  },
  palette: {
    primary: {
      main: '#ffb74d',
    },
    secondary: {
      main: '#808080'
    },
  },
});

ReactDOM.render(
  
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
