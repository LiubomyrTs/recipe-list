import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

import SearchBar from "./SearchBar";

const APIkey = process.env.REACT_APP_API_KEY;

class RecipesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: null,
      query: '',
      sortType: 't',
      error: false,
      loading: true,
      errorMessage: ''
    }

    this.changeQueryHandler = this.changeQueryHandler.bind(this);
    this.changeSortTypeHandler = this.changeSortTypeHandler.bind(this);
  }

  componentDidMount() {
    this.loadRecipies();
  }

  loadRecipies(event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.state.loading) {
      this.setState({loading: true});
    }
    axios.get('https://www.food2fork.com/api/search?key=' + APIkey + '&q=' + this.state.query + '&sort=' + this.state.sortType)
    .then(response => {
      // Reached API Call limit
      if (response.data.error === "limit") {
        this.setState({error: true, errorMessage: 'API Call limit reached', loading: false})
      }
      else {
        this.setState({recipes: response.data.recipes, loading: false, error: false});
        console.log(response)
      }
    })
    .catch(error => this.setState({error: true, errorMessage: 'Something went wrong'}))
  }

  changeQueryHandler = (event) => {
    this.setState({query: event.target.value})
  }

  changeSortTypeHandler = (event) => {
    this.setState({sortType: event.target.value})
  }

  render() {
    let loadedRecipes = [];
    if (this.state.recipes) {
      loadedRecipes = this.state.recipes.map(recipe => {
        return (
          <div className="w-25 my-3" key={recipe.recipe_id}>
            <div className="card mx-3 h-100">
              <div style={{backgroundImage:"url(" + recipe.image_url + ")"}} className="card-img"></div>
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.publisher}</p>
                <p className="card-text">
                  <span className="badge badge-info">{parseInt(recipe.social_rank)}</span>
                </p>
              </div>
              <div className="card-footer">
                <Link className="btn btn-primary" to={"/" + recipe.recipe_id}>More</Link>
              </div>
            </div>
          </div>
        )
      })
    }

    if (this.state.loading) {
      loadedRecipes = <div className="d-flex w-100 justify-content-center"><ClipLoader size={300} loading={this.state.loading}/></div>;
    }

    return (
      <div>
        <SearchBar
          changeQuery={(event) => this.changeQueryHandler(event)}
          changeSortType={(event) => this.changeSortTypeHandler(event)}
          loadRecipies={(event) => this.loadRecipies(event)}
        />
        <div className="d-flex flex-wrap">
          {this.state.error ? <h1>{this.state.errorMessage}</h1> : loadedRecipes}
        </div>
      </div>
    )
  }
}

export default RecipesList;
