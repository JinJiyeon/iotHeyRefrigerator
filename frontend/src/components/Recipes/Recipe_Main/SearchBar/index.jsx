import React, {useState} from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  withStyles,
  InputBase,
  Box,
  TextField,
  Button,
} from '@material-ui/core';
import axios from 'axios';


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
  heroContent: {    
    padding: theme.spacing(10, 0, 10),
    margin: {
      margin: theme.spacing(5),
    },
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


const SearchBar = () => {
  const classes = useStyles();
  const [sort, setSort] = useState('');
  const [searchWord, setSearchWord] = useState([]);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  
  // 레시피검색 API
  const recipeSearchApi =()=>{
    console.log(searchWord, 'api-console')
    axios.post(`recipe/search/title/${searchWord}`, searchWord)
      .then(res=>{
        console.log(res, 'search-res')
      })
      .catch(err=>{
        console.log(err.response, 'search-err')
      })
  };
  
  // 재료검색 API
  const ingredientSearchApi =()=>{
    axios.post(`recipe/search/ingredient/${searchWord}`, searchWord)
      .then(res=>{
        console.log(res, 'search-res')
      })
      .catch(err=>{
        console.log(err.response, 'search-err')
      })
  };

  return (
    <Box bgcolor="secondary">
      <div className={classes.heroContent}>
          <Container maxWidth="sm" align="center">
            <form onSubmit={(e)=>{
              e.preventDefault();
              if (sort ===20 ){
                recipeSearchApi();
                console.log(sort);
              } else {
                ingredientSearchApi();
                console.log(sort);
              }
              
            }}>
              <FormControl className={classes.search}>
                  <InputLabel htmlFor="demo-customized-textbox">검색</InputLabel>
                  {/* <TextField> */}
                    <BootstrapInput 
                      id="demo-customized-textbox"
                      onChange={(e)=>{
                        setSearchWord(e.target.value);
                        // console.log(e.target.value);
                      }}
                    />
                  {/* </TextField> */}
              </FormControl>
            </form>
            <FormControl className={classes.sort}>
              <InputLabel id="demo-customized-select-label">분류</InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={sort}
                onChange={handleChange}
                input={<BootstrapInput />}
                defaultValue={{label:'재료명', value:10}}
              > 
              <MenuItem value={10}>재료명</MenuItem>
              <MenuItem value={20}>음식이름</MenuItem>
              </Select>
            </FormControl>    
          </Container>
        </div>
    </Box>
  );
};

export default SearchBar;