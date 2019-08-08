import React, {Component} from 'react';
import axios from 'axios';

import './App.css';

import Card from './components/Card';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: null,
      ids: [],
      APIkey: '6c95000d9bc67b8ff8fe7d6c72448efb',
      query: ''
    }
  }
  // https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=chicken%20breast&page=2
  componentDidMount() {
    axios.get('https://www.food2fork.com/api/search?key=' + this.state.APIkey + '').then(response => {
      this.setState({recipes: response.data.recipes})
    })

  }
  loadRecipies(event) {
    event.preventDefault();
    // axios.get('https://www.food2fork.com/api/search?key=' + this.state.APIkey + '&q=' + this.state.query + '&count=8')
    axios.get('https://www.food2fork.com/api/search?key=' + this.state.APIkey + '&q=' + this.state.query).then(response => {
      this.setState({recipes: response.data.recipes});
      console.log(response)
    }).catch(error => console.error(error))
    // console.log(this.state.query);
  }
  render() {
    return (<div className="container">
    <header className="my-3">
      <form>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <div class="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fa fa-search"></i>
                  </div>
                </div>
                <input
                  className="form-control"
                  type="text" value={this.state.query}
                  onChange={(event) => this.setState({query: event.target.value})}
                  placeholder="Search By Ingredients or Name"
                />
              </div>
            </div>
            <div className="col-auto">
              <div class="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    Sort By
                  </div>
                </div>
                <select className="custom-select">
                  <option selected value="1">Top-rated</option>
                  <option value="1">Trending</option>
                </select>
              </div>
            </div>
            <div className="col-auto">
              <button
                onClick={(event) => this.loadRecipies(event)}
                type="submit"
                className="btn btn-primary">Seach</button>
            </div>
          </div>
        </form>
      </header>
      <div className="d-flex flex-wrap">
        {
          (this.state.recipes != null)
            ? this.state.recipes.map(recipe => <Card recipe={recipe}/>)
            : <p>Nothing found</p>
        }
      </div>
    </div>)
  }

}

export default App;
