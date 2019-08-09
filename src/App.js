import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import CardList from './components/CardList';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={CardList} />
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
