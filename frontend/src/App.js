import React, {useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CommonContext } from './context/CommonContext';

// import Auth from './pages/Auth/';
import Home from './pages/Home/';
import MyPage from './pages/MyPage/';
import Foods from './pages/Foods/';
// import Recipes from './pages/Recipes/';
import NotFound from './pages/NotFound/';

const App = () => {
  const [homeCard, setHomeCard] = useState("https://as1.ftcdn.net/v2/jpg/01/66/42/76/1000_F_166427637_p7cgjDJ4nSI8OMSmMOy6o2P1an4NETOu.jpg");

  // Foods
  const [infoDialogOpen, setInfoDetailDialogOpen] = useState(false);
  const [userDialogOpen, setUserDetailDialogOpen] = useState(false);
  
  const [openForm, setOpenForm] = useState(false);
  const [foodItem, setFoodItem] = useState(['재료이름']);
  const [newFoodItem, setNewFoodItem] = useState();
  const [expItem, setExpItem] = useState(['7']);
  const [newExpItem, setNewExpItem] = useState();

  function createData(id, date, name) {
    return { id, date, name };
  }
  const [rows, setRows] = useState([
    createData(3,4,'hi'),
    {id:1, date:7, name:'Dummy2'},
    {id:0, date:-1, name:'Dummy1'},
    {id:2, date:10, name:'Dummy3'},
  ]);
  return (
    <CommonContext.Provider
      value={{
        homeCard,
        setHomeCard,

        // Foods
        infoDialogOpen,
        setInfoDetailDialogOpen,
        userDialogOpen,
        setUserDetailDialogOpen,
        openForm,
        setOpenForm,
        foodItem,
        setFoodItem,
        newFoodItem,
        setNewFoodItem,
        expItem,
        setExpItem,
        newExpItem,
        setNewExpItem,

        rows,
        setRows,
      }}
    >
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/Auth" component={Auth} /> */}
            <Route exact path="/Home" component={Home} />
            <Route exact path="/MyPage" component={MyPage} />
            <Route exact path="/Foods" component={Foods} />
            {/* <Route exact path="/Recipes" component={Recipes} /> */}
            <Route exact path="/NotFound" component={NotFound} />
            {/* route외의 주소는 NotFound로 빠지도록 */}
            {/* <Redirect to="/NotFound" /> */}
          </Switch>
        </BrowserRouter>
    </CommonContext.Provider>
  );
};

export default App;