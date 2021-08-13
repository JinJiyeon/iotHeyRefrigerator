// eslint-disable-next-line
import React, {useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CommonContext } from './context/CommonContext';

import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Home from './pages/Home/';
import MyPage from './pages/MyPage/';
import Foods from './pages/Foods/';
import Recipe_Main from './pages/Recipes/Recipe_Main';
import Recipe_Detail from './pages/Recipe/Recipe_Detail';
import NotFound from './pages/NotFound/';

const App = () => {
  const [user, setUser] = useState(
    {
      user_id: '',
      user_pwd: '',
      status: '',
      token: '',
    },
    'user',
  );
  // Foods
  const [infoDialogOpen, setInfoDetailDialogOpen] = useState(false);
  const [openFoodAddForm, setopenFoodAddForm] = useState(false);
  const [exp, setExp] = useState();
  const [newFood, setNewFood] = useState([]);
  const [newExp, setNewExp] = useState([]);


  const [rows, setRows] = useState([
    {id:1, date:7, name:'오이'},
    {id:0, date:-1, name:'당근'},
    {id:2, date:10, name:'수박'},
  ]);
  // Recipe
  const [cards, setCards] = useState([]);
  const [recipeId, setRecipeId] = useState([]);
  return (
    <CommonContext.Provider
      value={{
        user,
        setUser,
        // Foods
        infoDialogOpen,
        setInfoDetailDialogOpen,
        openFoodAddForm,
        setopenFoodAddForm,
        rows,
        setRows,
        exp,
        setExp,
        // FoodAdd
        newFood,
        setNewFood,
        newExp,
        setNewExp,
        // Recipe
        cards,
        setCards,
        recipeId,
        setRecipeId,
      }}
    >
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/MyPage" component={MyPage} />
            <Route exact path="/Foods" component={Foods} />
            <Route exact path="/Recipes" component={Recipe_Main} />
            <Route exact path="/Recipes/:recipeId" component={Recipe_Detail} />
            <Route exact path="/NotFound" component={NotFound} />
            {/* route외의 주소는 NotFound로 빠지도록 */}
            {/* <Redirect to="/NotFound" /> */}
          </Switch>
        </BrowserRouter>
    </CommonContext.Provider>
  );
};

export default App;