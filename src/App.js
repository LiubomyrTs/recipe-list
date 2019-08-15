import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';

import RecipesList from './components/RecipesList';
import FullRecipe from './components/FullRecipe';

const App = function() {

  return (
     <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={RecipesList}/>
          <Route path="/:id" exact component={FullRecipe}/>
        </div>
      </BrowserRouter>
  )

}

export default App;
