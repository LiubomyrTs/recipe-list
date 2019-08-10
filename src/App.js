import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import RecipesList from './components/RecipesList';
import FullRecipe from './components/FullRecipe';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={RecipesList} />
          <Route path="/:id" exact component={FullRecipe} />
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
