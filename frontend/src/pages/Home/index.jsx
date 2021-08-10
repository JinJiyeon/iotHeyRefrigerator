import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

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

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12x',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(10, 0, 10),
    margin: {
      margin: theme.spacing(5),
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  search: {
    width: '80%',
    height: '80%',
  },
  sort: {
    width: '10%',
    height: '80%',
  },
}));

const cards = [1, 2, 3, 4, 5, 6];

export default function Recipe_Search() {
  const classes = useStyles();
  
  const [name, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm" align="center">
            <FormControl className={classes.search} >
              <InputLabel htmlFor="demo-customized-textbox">검색</InputLabel>
              <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
            <FormControl className={classes.sort}>
              <InputLabel id="demo-customized-select-label">분류</InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={name}
                onChange={handleChange}
                input={<BootstrapInput />}
              > 
                <MenuItem value={10}>재료명</MenuItem>
                <MenuItem value={20}>음식이름</MenuItem>
              </Select>
            </FormControl>    
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      Recipe Name 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
        <Copyright />
    </React.Fragment>
  );
}


// import React, {useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import HomeCard from '../../components/Home';
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Divider,
// } from '@material-ui/core';
// import { CommonContext } from '../../context/CommonContext';

// // 간단한 카드 스타일링
// const imgStyle = {
//   height: 0,
//   paddingTop: '56.25%', // 16:9
//   margin: 20,
// };
// const cardStyle = {
//   margin: 50,
// };

// // 로그인 상태에 따라 MyPage, 로그인 로그아웃 보여주기
// const MyPageBtn = () => {
//   let history = useHistory();

//   const onClickBtn = () => {
//     history.push('/MyPage');
//   };


//   return (
//     <div>
//       <Button onClick={onClickBtn}>
//         MyPage
//       </Button>
//       <Button>
//         LogOut
//       </Button>
//     </div>
//   );
// };

// const Home = () => {

//   const [visible, setVisible] = useState('로그인안했음');
//   const visibleHandler = () => {
//     setVisible('로그인했음');
//   };
//   const invisibleHandler = () => {
//     setVisible('로그인안했음');
//   };

//   return (
//     <div>
//       <p>로그인에 따른
//         <Button onClick={visibleHandler}>
//           visible
//         </Button>
//         <Button onClick={invisibleHandler}>
//           invisible
//         </Button>
//       </p>
//       <Divider />
//       {visible === '로그인했음' && <MyPageBtn /> }
//       {visible === '로그인안했음' && <Button>LogIn</Button>}

//       <h1>7링바이브</h1>
//     <HomeCard />
//     </div>
//   );
// };

// export default Home;