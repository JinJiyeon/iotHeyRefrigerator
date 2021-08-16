import React, {useState, useContext, useEffect, useRef,} from 'react';
import { useHistory } from 'react-router';
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import axios from 'axios';
import { CommonContext } from '../../../../context/CommonContext';
import Cookies from 'js-cookie';


const useStyles = makeStyles((theme) => ({
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
  root: {
    display: 'flex',
    float: "right"
  },
}));

const RecipeCard = () => {
  const { cards, setCards, recipeId, setRecipeId } = useContext(CommonContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  // 메뉴 이름
  const [recomMenu, setRecomMenu] = useState('기본 추천');
  let history = useHistory();
  // 페이지가 렌더링됐을때 마운트시킬 레시피
  useEffect(() => {
    setRecomMenu('기본 추천')
    // setCards([{title:'hi', recipe_info_image:'https://source.unsplash.com/random' },{title:'hi', recipe_info_image:'https://source.unsplash.com/random' },{title:'hi', recipe_info_image:'https://source.unsplash.com/random' }])
    axios.get('/recipe/recom/main')
    .then(res => {
      setCards(res.data)
      console.log(res.data, 'useEffectcards')
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  // 추천 좋아요 menu
  const likeApi = () => {
    axios.get('/recipe/recom/important')
    .then(res => {
        console.log(res.data, 'recipe data')
        setCards(res.data)
        console.log(cards, 'like cards')
      })
      .catch(err => {
        console.log(err)
      })
    };
  
  // 추천 유통기한 menu
  const expApi = () => {
    setCards([{title:'hi', recipe_info_image:'https://source.unsplash.com/random' },{title:'hi', recipe_info_image:'https://source.unsplash.com/random' },{title:'hi', recipe_info_image:'https://source.unsplash.com/random' }])
    // 추천 메뉴가 똑같아서 임시적으로 랜덤이미지를 보여줍니다
    // axios.get('/recipe/recom/expired')
    // .then(res => {
    //     console.log(res.data)
    //     setCards(res.data)
    //     console.log(cards, 'exp cards')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    // if (anchorRef.current && anchorRef.current.contains(e.target)) {
    //   return;
    // }
    setOpen(false);
  };

  function handleListKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <Box bgcolor="warning.light" p={2}>
      <Container maxWidth="lg">
      <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
        오늘의 추천 레시피
      </Typography>
      <div className={classes.root}>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'me  nu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}    
            align = "right"          
            >
            {recomMenu}
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={() => {
                        if (Cookies.get('user_id')) {
                          setOpen(false);
                          likeApi();
                          setRecomMenu('좋아요 추천');
                        } else {
                          alert('로그인 유저만 이용가능한 서비스입니다.')
                        }
                      }}>
                        좋아요 우선 추천
                      </MenuItem>
                      <MenuItem onClick={() => {
                        setOpen(false);
                        expApi();
                        setRecomMenu('유통기한 추천');
                      }}>
                        유통기한 우선 추천
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      </Container>
    <Container className={classes.cardGrid} maxWidth="md">
      { 
        cards &&
          <Grid container spacing={4}>
            {cards.map((card) => (
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
          </Grid>
      }
  </Container>
  </Box>
  );
};

export default RecipeCard;