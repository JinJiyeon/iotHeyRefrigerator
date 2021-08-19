// eslint-disable-next-line
import React, {useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';
import { CommonContext } from './context/CommonContext';

import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Home from './pages/Home';
import MyPage from './pages/MyPage/';
import Foods from './pages/Foods/';
import Recipe_Main from './pages/Recipes/Recipe_Main';
import Recipe_Detail from './pages/Recipes/Recipe_Detail';
import NotFound from './pages/NotFound/';
import Recipe_Search from './pages/Recipes/Recipe_Search'
import RestrictedRoute from './utils/RestrictedRoute';

const App = () => {
  // Foods
  const [infoDialogOpen, setInfoDetailDialogOpen] = useState(false);
  const [openFoodAddForm, setopenFoodAddForm] = useState(false);
  const [exp, setExp] = useState();
  const [newFood, setNewFood] = useState([]);
  const [newExp, setNewExp] = useState([]);

  // Recipe
  const [cards, setCards] = useState([]);
  const [searchCard, setSearchCard] = useState([]);
  const [recomMenu, setRecomMenu] = useState('레시피 추천');
  // main
  const [recipeId, setRecipeId] = useState([]);
  // detail
  const [recipe, setRecipe] = useState([]);
  // mypage foods
  const [ingredients, setIngredients] = useState([]);
  const [openFoodAdd, setOpenFoodAdd] = useState(false);
  return (
    <CommonContext.Provider
      value={{
        // Foods
        infoDialogOpen,
        setInfoDetailDialogOpen,
        openFoodAddForm,
        setopenFoodAddForm,
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
        searchCard,
        setSearchCard,
        recipeId,
        setRecipeId,
        recipe,
        setRecipe,
        recomMenu,
        setRecomMenu,
        // mypage
        ingredients,
        setIngredients,
        openFoodAdd,
        setOpenFoodAdd,
      }}
    >
      <BrowserRouter>
        <div>
          <Switch >
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/foods" component={Foods} />
            <Route exact path="/recipes" component={Recipe_Main} />
            <Route exact path="/recipes/:recipeId" component={Recipe_Detail} />
            <Route exact path="/search" component={Recipe_Search} />
            <Route exact path="/notfound" component={NotFound} />
            {/* <Route exact path="/mypage" component={MyPage} /> */}
            <RestrictedRoute restricted={true} path="/mypage" component={MyPage} exact/>
            
            {/* route외의 주소는 NotFound로 빠지도록 */}
            <Redirect to="/notfound" />
          </Switch>
          </div>
        </BrowserRouter>
    </CommonContext.Provider>
    
  );
};

export default App;