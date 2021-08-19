import React, {useState, useContext} from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  withStyles,
  Container,
  InputBase,
} from '@material-ui/core';
import SearchBar from '../../components/Recipes/Recipe_Main/SearchBar';
import { CommonContext } from '../../context/CommonContext';
import { useHistory } from 'react-router-dom';
import Layout from '../../layout';

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
  testbg: {
    backgroundColor: theme.palette.primary.main,
  },
  testbg2: {
    backgroundColor: 'white',
  },
}));


export default function Recipe_Search() {
  let history = useHistory();
  const classes = useStyles();
  
  const {searchCard, setRecipeId} = useContext(CommonContext);

  // const [name, setAge] = React.useState('');
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <Layout>
      <main className={classes.testbg} style={{minHeight:'100vh',  margin:'0px 0px -23px 0px'}}>
        <div >
          <div  className={classes.testbg2}>
            <SearchBar/>
          </div>
          <Box bgcolor="warning.light" p={2}>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {/* 검색결과가 0일때 문구 처리 */}
                {searchCard ? 
                <>
                  {searchCard.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}
                          onClick={()=>{
                            setRecipeId(card);
                            history.push(`/Recipes/${card.recipe_info_id}`);
                          }}
                          >
                          <CardMedia
                            className={classes.cardMedia}
                            image={card.recipe_info_image}
                            title={card.title}
                            />
                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h4" component="h2">
                              {card.title}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                    </>
                  :
                    <>
                      <div>
                      <Typography align="center" variant="h2" style={{marginTop: '20vh'}}>
                        검색 결과가 없습니다. <br/>
                        재료와 레시피를 선택 후 검색해주세요
                      </Typography>
                      </div>
                    </>
                }
                
              </Grid>
            </Container>
          </Box>
          
        </div>

      </main>
    </Layout>
  )
}