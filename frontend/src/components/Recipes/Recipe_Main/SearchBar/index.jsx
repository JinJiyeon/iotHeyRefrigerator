import React, {useState, useContext, useEffect} from 'react';
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
  rgbToHex,
} from '@material-ui/core';
import axios from 'axios';
import {CommonContext} from '../../../../context/CommonContext'
import { useHistory } from 'react-router';

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
    
    padding: '10px 26px 10px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'fontPrimary',
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
    padding: theme.spacing(3, 0, 3),
    margin: {
      margin: theme.spacing(5),
    },
  },
  search: {
    width: '100%',
    height: '80%',
  },
  sort: {
    width: '100%',
    height: '80%',
  },
  searchLabel: {
    margin: '0px 0px 0px 2px',
    fontSize:"24px"
  }

}));


const SearchBar = () => {

  let history = useHistory();

  const {setSearchCard} = useContext(CommonContext)
  const classes = useStyles();
  const [sort, setSort] = useState('');
  const [searchWord, setSearchWord] = useState([]);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  // SearchPage 접속시 검색결과가 없다는 문구
  useEffect(()=>{
    setSearchCard(0);
  }, []);

  // 레시피검색 API
  const recipeSearchApi =()=>{
    console.log(searchWord, 'api-console')
    axios.post(`recipe/search/title/${searchWord}`, searchWord)
      .then(res=>{
        console.log(res.data, 'search-res')
        // 검색결과가 없을 때 문구 처리
        if (res.data.length){
          setSearchCard(res.data);
        } else {
          setSearchCard(0);
        }
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
        // 검색결과가 없을때 문구 처리
        if (res.data.length){
          setSearchCard(res.data);
        } else {
          setSearchCard(0);
        }
      })
      .catch(err=>{
        console.log(err.response, 'search-err')
        setSearchCard(0)
      })
  };

  return (
    <Box bgcolor="secondary">
      <div className={classes.heroContent}>
          <Container maxWidth="md" align="center"  >
            <div style={{ width: '100%'}}>
              <Box display="flex" justifyContent="center" >
                <Box  m={1} bgcolor="" width="60%">
                  <form onSubmit={(e)=>{
                      e.preventDefault();
                      if (sort ===20 ){
                        recipeSearchApi();
                        console.log(sort);
                      } else {
                        ingredientSearchApi();
                        console.log(sort);
                      }
                      history.push('/search') 
                    }}>
                      <FormControl className={classes.search}>
                          <InputLabel htmlFor="demo-customized-textbox" className={classes.searchLabel}>검색</InputLabel>
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
                </Box>
                <Box  m={1} bgcolor="" width="20%"> 
                  <FormControl className={classes.sort}>
                    <InputLabel id="demo-customized-select-label" className={classes.searchLabel}>분류</InputLabel>
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
                </Box>
              </Box>
            </div>
          </Container>
      </div>
    </Box>
  );
};

export default SearchBar;