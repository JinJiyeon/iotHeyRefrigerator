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

} from '@material-ui/core';

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
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <div>
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
                value={sort}
                onChange={handleChange}
                input={<BootstrapInput />}
              > 
                <MenuItem value={10}>재료명</MenuItem>
                <MenuItem value={20}>음식이름</MenuItem>
              </Select>
            </FormControl>    
          </Container>
        </div>
    </div>
  );
};

export default SearchBar;